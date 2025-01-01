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

export const useMovePositionLine = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: Ref<ContainerInfo>,
  adsorptionList: Ref<number[]>,
  transformInfo: Ref<TransformInfo>,
  isY: boolean,
  positionLineRef: Ref,
  lineInfo: Ref<AnyRecord>,
  removeCallback: (id: string | number) => void
) => {
  let isMouseDown = false;
  function toggleTip(show: boolean) {
    lineInfo.value.showTip = show;
  }
  function mouseMoveEvent(e: MouseEvent) {
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
      node.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault();
        isMouseDown = true;
        lineInfo.value.showTip = true;
        const start = isY ? e.pageY : e.pageX;
        lineInfo.value.start = start;
        lineInfo.value.startTranslate = lineInfo.value.translate;
        lineInfo.value.needAnimate = false;
        document.addEventListener('mousemove', mouseMoveEvent);
      });
      document.addEventListener('mouseup', () => {
        if (!isMouseDown) return;
        const { translate, id } = lineInfo.value;
        const { width, height } = containerInfo.value as RequiredContainerInfo;
        const { xRulerHeight, yRulerWidth } = opt.value.rulerConfig;
        if (
          translate <= (isY ? xRulerHeight : yRulerWidth) ||
          translate >= (isY ? height : width)
        ) {
          removeCallback(id);
        } else {
          toggleTip(false);
          lineInfo.value.needAnimate = true;
        }
        document.removeEventListener('mousemove', mouseMoveEvent);
      });
    }
  });
};
