import { computed } from 'vue';
import type { Ref, ComputedRef, Reactive } from 'vue';
import type {
  RequiredScaleRulerOpt,
  RequiredContainerInfo,
  ScrollBarInfo,
  ContainerInfo,
  TransformInfo
} from '@/type';
export const useScrollBar = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  transformInfo: Reactive<TransformInfo>
) => {
  const scrollBarInfo = computed((): ScrollBarInfo => {
    const _opt = opt.value;
    const { width, height } = containerInfo.value as RequiredContainerInfo;
    const { translateX, translateY, scale } =
      transformInfo as Required<TransformInfo>;
    const totalWidth = _opt.canvasWidth * scale + 2 * _opt.containerXPadding;
    const totalHeight = _opt.canvasHeight * scale + 2 * _opt.containerYPadding;
    const isXLarge = width < totalWidth;
    const isYLarge = height < totalHeight;
    const isLarge = isXLarge || isYLarge;
    const left = width * ((_opt.containerXPadding - translateX) / totalWidth);
    const top = height * ((_opt.containerYPadding - translateY) / totalHeight);
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
  return { scrollBarInfo };
};
