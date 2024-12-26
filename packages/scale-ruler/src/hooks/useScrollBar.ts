import { computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type {
  RequiredScaleRulerOpt,
  RequiredContainerInfo,
  ScrollBarInfo,
  RequiredCanvasInfo,
  ContainerInfo,
  CanvasInfo
} from '@/type';
export const useScrollBar = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  canvasInfo: ComputedRef<CanvasInfo>
) => {
  const scrollBarInfo = computed((): ScrollBarInfo => {
    const _opt = opt.value;
    const { width, height } = containerInfo.value as RequiredContainerInfo;
    const { translateX, translateY, scale } =
      canvasInfo.value as RequiredCanvasInfo;
    const totalWidth = _opt.canvasWidth * scale + 2 * _opt.containerXPadding;
    const totalHeight = _opt.canvasHeight * scale + 2 * _opt.containerYPadding;
    const isXLarge = width < totalWidth;
    const isYLarge = height < totalHeight;
    const isLarge = isXLarge || isYLarge;
    const left = _opt.containerXPadding - translateX;
    const top = _opt.containerYPadding - translateY;
    const scrollWidth = (width / totalWidth) * width;
    const scrollHeight = (height / totalHeight) * height;
    return {
      totalHeight,
      totalWidth,
      left,
      top,
      width: scrollWidth,
      height: scrollHeight,
      isYLarge,
      isXLarge,
      isLarge
    };
  });
  return scrollBarInfo;
};
