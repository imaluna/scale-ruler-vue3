import { computed, watch, reactive } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type {
  ContainerInfo,
  RequiredScaleRulerOpt,
  RequiredContainerInfo,
  TransformInfo
} from '@/type';

export const useTransform = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>
) => {
  const transformInfo = reactive<TransformInfo>({});
  watch(
    () => containerInfo.value,
    () => {
      const _opt = opt.value;
      let realWidth = 0;
      let realHeight = 0;
      let { scale } = _opt;

      const { autoCenter, autoScale } = _opt;
      const { width, height } = containerInfo.value as RequiredContainerInfo;
      if (autoScale) {
        const scaleX = (width - 2 * _opt.containerXPadding) / _opt.canvasWidth;
        const scaleY =
          (height - 2 * _opt.containerYPadding) / _opt.canvasHeight;
        scale = Math.min(scaleX, scaleY);
      }
      transformInfo.scale = scale;
      let translateX = 0;
      let translateY = 0;
      // 自动居中
      realWidth = _opt.canvasWidth * scale;
      realHeight = _opt.canvasHeight * scale;
      if (autoCenter) {
        translateX = Math.floor((width - realWidth) / 2);
        translateY = Math.floor((height - realHeight) / 2);
        transformInfo.translateX = translateX;
        transformInfo.translateY = translateY;
      }
    },
    {
      deep: true
    }
  );
  return { transformInfo };
};
