import type { Ref, ComputedRef, Reactive } from 'vue';
import type {
  RequiredScaleRulerOpt,
  TransformInfo,
  ContainerInfo,
  RequiredCanvasInfo,
  BoundaryInfo
} from '@/type';
import { getBoundary } from './useSetBoundary';
/**
 * 改变大小
 */
export const useChangeScale = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  transformInfo: Reactive<TransformInfo>,
  newScale: number
) => {
  const _opt = opt.value;
  let { translateX, translateY, scale } =
    transformInfo as Required<TransformInfo>;
  newScale = Math.min(Math.max(newScale, _opt.minScale), _opt.maxScale);
  const change = newScale - scale;
  const boundary = getBoundary(
    opt,
    containerInfo,
    newScale
  ) as Required<BoundaryInfo>;
  translateX -= (change * _opt.canvasWidth) / 2;
  translateY -= (change * _opt.canvasHeight) / 2;

  translateX = Math.max(
    Math.min(translateX, boundary.maxTranslateX),
    boundary.minTranslateX
  );
  translateY = Math.max(
    Math.min(translateY, boundary.maxTranslateY),
    boundary.minTranslateY
  );
  transformInfo.scale = newScale;
  transformInfo.translateX = translateX;
  transformInfo.translateY = translateY;
};
