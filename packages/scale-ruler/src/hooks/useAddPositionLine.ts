import { reactive, onMounted } from 'vue';
import type {
  RequiredScaleRulerOpt,
  TransformInfo,
  AnyRecord,
  ContainerInfo,
  RequiredContainerInfo
} from '@/type';
import type { Reactive, Ref } from 'vue';
import { getOffset, translateToCoordinate, checkAdSorptionLine } from '@/utils';
import { bindMouseMove } from 'common';

export const useAddPositionLine = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: Ref<ContainerInfo>,
  adsorptionList: Reactive<number[]>,
  transformInfo: Ref<TransformInfo>,
  isY: boolean,
  rulerRef: Ref
) => {
  let id: number = 1;
  const positionLineMap = reactive<AnyRecord>([]);
  let currentId: number = -1;
  let isMouseDown = false;
  function mousemoveEvent(e: MouseEvent) {
    if (isMouseDown && currentId > -1) {
      e.preventDefault();
      const { xRulerHeight, yRulerWidth } = opt.value.rulerConfig;
      const info = positionLineMap[currentId];
      const move = (isY ? e.pageY : e.pageX) - info.start;
      const translate = info.startTranslate + move;
      const showTip = translate > (isY ? xRulerHeight : yRulerWidth);
      const coordinate = translateToCoordinate(
        transformInfo.value,
        translate,
        isY
      );
      const checkInfo = checkAdSorptionLine(
        adsorptionList,
        transformInfo.value,
        opt.value.positionLineConfig.adsorptionGap,
        translate,
        coordinate,
        isY
      );
      positionLineMap[currentId].showTip = showTip;
      positionLineMap[currentId].translate = checkInfo.translate;
      positionLineMap[currentId].coordinate = checkInfo.coordinate;
    }
  }

  function mouseupEvent() {
    if (!isMouseDown || currentId < 0) return;
    isMouseDown = false;
    const info = positionLineMap[currentId];
    const { width, height } = containerInfo.value as RequiredContainerInfo;
    const { xRulerHeight, yRulerWidth } = opt.value.rulerConfig;
    if (
      info.translate <= (isY ? xRulerHeight : yRulerWidth) ||
      info.translate >= (isY ? height : width)
    ) {
      delete positionLineMap[currentId];
    } else {
      const checkInfo = checkAdSorptionLine(
        adsorptionList,
        transformInfo.value,
        opt.value.positionLineConfig.adsorptionGap,
        info.translate,
        info.coordinate,
        isY
      );
      positionLineMap[currentId].showTip = false;
      positionLineMap[currentId].translate = checkInfo.translate;
      positionLineMap[currentId].coordinate = checkInfo.coordinate;
    }
    currentId = -1;
  }
  onMounted(() => {
    if (rulerRef.value) {
      const node = rulerRef.value as HTMLElement;
      function mousedownEvent(e: MouseEvent) {
        const rulerOffset = getOffset(node);
        const start = isY ? e.pageY : e.pageX;
        const translate = start - (isY ? rulerOffset.top : rulerOffset.left);
        const lineInfo: AnyRecord = {
          startTranslate: translate,
          translate,
          start,
          id,
          coordinate: translateToCoordinate(
            transformInfo.value,
            translate,
            isY
          ),
          showTip: false,
          show: true
        };
        currentId = id;
        positionLineMap[id++] = lineInfo;
        isMouseDown = true;
      }
      bindMouseMove(node, mousedownEvent, mousemoveEvent, mouseupEvent);
    }
  });
  return { positionLineMap };
};
