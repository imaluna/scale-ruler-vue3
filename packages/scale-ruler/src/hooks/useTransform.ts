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
  containerInfo: ComputedRef<ContainerInfo>,
  onScale: (scale: number) => void,
  onMove: (translateX: number, translateY: number) => void
) => {
  const transformInfo = reactive<TransformInfo>({});
  watch(
    () => containerInfo.value,
    () => {
      const _opt = opt.value;
      let originX = transformInfo.translateX || 0;
      let originY = transformInfo.translateY || 0;
      let realWidth = 0;
      let realHeight = 0;
      let { scale } = _opt;

      const { autoCenter, autoScale } = _opt;
      const { width, height } = containerInfo.value as RequiredContainerInfo;
      if (autoScale) {
        const scaleX = (width - 2 * 80) / _opt.canvasWidth;
        const scaleY = (height - 2 * 80) / _opt.canvasHeight;
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
      if (_opt.scale !== scale) {
        onScale(scale);
      }
      if (originX !== translateX || originY || translateY) {
        onMove(translateX, translateY);
      }
    },
    {
      deep: true
    }
  );
  return { transformInfo };
};
