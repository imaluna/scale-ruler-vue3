import { computed } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type {
  AnyRecord,
  ContainerInfo,
  RequiredScaleRulerOpt,
  RequiredContainerInfo,
  CanvasInfo
} from '@/type';

function setBoundary(
  realWidth: number,
  realHeight: number,
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>
) {
  const _opt = opt.value;

  const { containerXPadding, containerYPadding } = _opt;
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
  return {
    maxTranslateX,
    maxTranslateY,
    minTranslateX,
    minTranslateY
  };
}

export const useTransform = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>
) => {
  return computed((): CanvasInfo => {
    const _opt = opt.value;
    const info: CanvasInfo = {};
    let { scale } = _opt;
    const { autoCenter, autoScale } = _opt;
    const { width, height } = containerInfo.value as RequiredContainerInfo;
    if (autoScale) {
      const scaleX = (width - 2 * _opt.containerXPadding) / _opt.canvasWidth;
      const scaleY = (height - 2 * _opt.containerYPadding) / _opt.canvasHeight;
      scale = Math.min(scaleX, scaleY);
    }
    info.scale = scale;
    let translateX = 0;
    let translateY = 0;
    // 自动居中
    const realWidth = _opt.canvasWidth * scale;
    const realHeight = _opt.canvasHeight * scale;
    if (autoCenter) {
      translateX = Math.floor((width - realWidth) / 2);
      translateY = Math.floor((height - realHeight) / 2);
      info.translateX = translateX;
      info.translateY = translateY;
    }
    const boundary: AnyRecord = setBoundary(
      realWidth,
      realHeight,
      opt,
      containerInfo
    );
    Object.assign(info, boundary);
    return info;
  });
};
