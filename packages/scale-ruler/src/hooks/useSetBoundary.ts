import { computed } from 'vue';
import type { ComputedRef, Reactive, Ref } from 'vue';
import type {
  ContainerInfo,
  RequiredScaleRulerOpt,
  RequiredContainerInfo,
  BoundaryInfo,
  TransformInfo
} from '@/type';

export function getBoundary(
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  scale: number
): BoundaryInfo {
  const _opt = opt.value;
  const { containerXPadding, containerYPadding, canvasWidth, canvasHeight } =
    _opt;
  const realWidth = canvasWidth * scale;
  const realHeight = canvasHeight * scale;
  const { width, height } = containerInfo.value as RequiredContainerInfo;
  const maxTranslateX = Math.max((width - realWidth) / 2, containerXPadding);
  const maxTranslateY = Math.max((height - realHeight) / 2, containerYPadding);
  const minTranslateX =
    realWidth + 2 * containerXPadding > width
      ? width - (realWidth + containerXPadding)
      : maxTranslateX;
  const minTranslateY =
    realHeight + 2 * containerYPadding > height
      ? height - (realHeight + containerYPadding)
      : maxTranslateY;
  const res = {
    maxTranslateX,
    maxTranslateY,
    minTranslateX,
    minTranslateY
  };
  return res;
}
/**
 * 设置translate边界
 */
export const useSetBoundary = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  transformInfo: Reactive<TransformInfo>
) => {
  const boundaryInfo = computed((): BoundaryInfo => {
    return getBoundary(opt, containerInfo, transformInfo.scale as number);
  });
  return { boundaryInfo };
};
