import {
  type Ref,
  type ComputedRef,
  type Reactive,
  onMounted,
  reactive
} from 'vue';
import type {
  RequiredScaleRulerOpt,
  TransformInfo,
  ContainerInfo,
  AnyRecord,
  ScrollBarInfo,
  BoundaryInfo
} from '@/type';
import { useChangeLarge } from './useChangeLarge';
/**
 * 滚轮事件
 * 包含：1.双指缩放事件；2.移动事件
 */
export const useMouseWheel = (
  opt: Ref<RequiredScaleRulerOpt>,
  containerInfo: ComputedRef<ContainerInfo>,
  transformInfo: Reactive<TransformInfo>,
  boundaryInfo: ComputedRef<BoundaryInfo>,
  container: Ref,
  scrollBarInfo: ComputedRef<ScrollBarInfo>
) => {
  let wheelTimer: number | null = null;
  const scrollBarOpacity = reactive<AnyRecord>({
    xOpacity: 0,
    yOpacity: 0,
    isMouseDown: false,
    isMouseEnter: false
  });
  onMounted(() => {
    if (container.value) {
      container.value.addEventListener('wheel', (e: WheelEvent) => {
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          // 双指缩放事件
          const changeScale = (-1 * e.deltaY) / 100;
          const newScale = (transformInfo.scale as number) + changeScale;
          useChangeLarge(opt, containerInfo, transformInfo, newScale);
        } else {
          // 单指移动事件
          if (!scrollBarInfo.value.isLarge || scrollBarOpacity.isMouseDown)
            return;
          e.preventDefault();
          let { translateX, translateY } =
            transformInfo as Required<TransformInfo>;
          // 定时器
          if (wheelTimer) {
            clearTimeout(wheelTimer);
          }
          const moveX = -e.deltaX;
          const moveY = -e.deltaY;
          let scrollDirection = '';
          const { opacity = 0.4 } = opt.value.scrollBarConfig;
          const { isXLarge, isYLarge } = scrollBarInfo.value;
          const { maxTranslateX, minTranslateX, maxTranslateY, minTranslateY } =
            boundaryInfo.value as Required<BoundaryInfo>;
          if (isXLarge && Math.abs(moveX) > Math.abs(moveY)) {
            translateX += moveX;

            translateX = Math.max(
              Math.min(translateX, maxTranslateX),
              minTranslateX
            );
            // 展示
            scrollBarOpacity.xOpacity = opacity;
            scrollBarOpacity.yOpacity = 0;
            transformInfo.translateX = translateX;
            scrollDirection = 'x';
          }
          if (isYLarge && Math.abs(moveY) > Math.abs(moveX)) {
            scrollDirection = 'y';
            translateY += moveY;
            translateY = Math.max(
              Math.min(translateY, maxTranslateY),
              minTranslateY
            );
            // 展示
            scrollBarOpacity.yOpacity = opacity;
            scrollBarOpacity.xOpacity = 0;
            transformInfo.translateY = translateY;
          }
          // 不滚动后300ms隐藏滚动条
          if (scrollDirection) {
            wheelTimer = setTimeout(() => {
              if (scrollBarOpacity.isMouseEnter) return;
              scrollBarOpacity[
                scrollDirection === 'y' ? 'yOpacity' : 'xOpacity'
              ] = 0;
            }, 1000);
          }
        }
      });
    }
  });
  return { scrollBarOpacity };
};
