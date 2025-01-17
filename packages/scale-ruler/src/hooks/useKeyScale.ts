import type { Ref, ComputedRef, Reactive } from 'vue';
import type {
  RequiredScaleRulerOpt,
  TransformInfo,
  ContainerInfo
} from '@/type';
import { useChangeScale } from './useChangeScale';
/**
 * 快捷键放大事件
 */
export const useKeyScale = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  transformInfo: Reactive<TransformInfo>,
  onScale: (scale: number) => void,
  onMove: (translateX: number, translateY: number) => void
) => {
  // 代理键盘缩放
  if (opt.value.proxyScaleKey) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (opt.value.canScale) {
        const code = e.keyCode as number;
        if ((e.metaKey || e.ctrlKey) && (code === 187 || code === 189)) {
          e.preventDefault();
          const newScale =
            (transformInfo.scale as number) + (code === 187 ? 0.05 : -0.05);
          useChangeScale(opt, containerInfo, transformInfo, newScale, onScale, onMove);
        }
      }
    });
  }
};
