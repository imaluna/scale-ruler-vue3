import { reactive, onMounted } from 'vue';
import type {
  RequiredScaleRulerOpt,
  TransformInfo,
  AnyRecord,
  ContainerInfo,
  RequiredContainerInfo
} from '@/type';
import type { Ref } from 'vue';
import {
  translateToCoordinate,
  checkAdSorptionLine,
  coordinateToTranslate,
  getRectInfo
} from '@/utils';
import { bindMouseMove } from '@/utils/mouseEvent';

export const usePositionLineEvent = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: Ref<ContainerInfo>,
  adsorptionList: Ref<number[]>,
  transformInfo: Ref<TransformInfo>,
  isY: boolean,
  positionLineRef: Ref,
  lineInfo: Ref<AnyRecord>,
  removeCallback: (id: string | number) => void,
  positionLineChange: () => void
) => {
  let isMouseDown = false;
  const removeIconInfo = reactive<AnyRecord>({});
  function toggleTip(show: boolean) {
    lineInfo.value.showTip = show;
  }
  function mousemoveEvent(e: MouseEvent) {
    if (!isMouseDown) return;
    const move = (isY ? e.pageY : e.pageX) - lineInfo.value.start;
    const translate = lineInfo.value.startTranslate + move;
    const coordinate = translateToCoordinate(
      transformInfo.value,
      translate,
      isY
    );
    const checkInfo = checkAdSorptionLine(
      adsorptionList.value,
      transformInfo.value,
      opt.value.positionLineConfig.adsorptionGap,
      translate,
      coordinate,
      isY
    );
    lineInfo.value.coordinate = checkInfo.coordinate;
    lineInfo.value.translate = checkInfo.translate;
  }
  function mousedownEvent(e: MouseEvent) {
    isMouseDown = true;
    lineInfo.value.showTip = true;
    const start = isY ? e.pageY : e.pageX;
    lineInfo.value.start = start;
    lineInfo.value.startTranslate = coordinateToTranslate(
      transformInfo.value,
      lineInfo.value.coordinate,
      isY
    );
  }
  function mouseupEvent() {
    if (!isMouseDown) return;
    isMouseDown = false;
    const { translate, id } = lineInfo.value;
    const { width, height } = containerInfo.value as RequiredContainerInfo;
    const { xRulerHeight, yRulerWidth } = opt.value.rulerConfig;
    if (
      translate <= (isY ? xRulerHeight : yRulerWidth) ||
      translate >= (isY ? height : width)
    ) {
      removeCallback(id);
    } else {
      const checkInfo = checkAdSorptionLine(
        adsorptionList.value,
        transformInfo.value,
        opt.value.positionLineConfig.adsorptionGap,
        translate,
        lineInfo.value.coordinate,
        isY
      );
      lineInfo.value.coordinate = checkInfo.coordinate;
      lineInfo.value.translate = checkInfo.translate;
      positionLineChange();
    }
  }
  function clickEvent() {
    removeIconInfo.show = false;
    document.removeEventListener('click', clickEvent);
  }
  onMounted(() => {
    if (positionLineRef.value) {
      const node = positionLineRef.value as HTMLElement;
      node.addEventListener('mouseenter', () => {
        toggleTip(true);
      });
      node.addEventListener('mouseleave', () => {
        if (!isMouseDown) {
          toggleTip(false);
        }
      });
      // 右键出现删除
      node.addEventListener('contextmenu', (e: MouseEvent) => {
        e.preventDefault();
        let left: number = e.pageX + 10;
        let top: number = e.pageY - (isY ? 20 : 10);
        removeIconInfo.top = top;
        removeIconInfo.left = left;
        removeIconInfo.show = true;
        document.addEventListener('click', clickEvent);
      });
      bindMouseMove(node, mousedownEvent, mousemoveEvent, mouseupEvent);
    }
  });
  return { removeIconInfo };
};
