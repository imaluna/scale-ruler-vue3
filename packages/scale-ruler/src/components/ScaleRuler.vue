<template>
  <div ref="container" :style="containerStyle">
    <template v-if="opt.useRuler">
      <Ruler
        :opt="opt"
        :container-info="containerInfo"
        :canvas-info="canvasInfo"
        :transform-info="transformInfo"
      />
      <Ruler
        is-y
        :opt="opt"
        :container-info="containerInfo"
        :canvas-info="canvasInfo"
        :transform-info="transformInfo"
      />
    </template>
    <CanvasPanel
      :container-info="containerInfo"
      :opt="opt"
      :canvas-info="canvasInfo"
      :transform-info="transformInfo"
    >
      <slot></slot>
    </CanvasPanel>
    <ScrollBar
      v-if="scrollBarInfo.isXLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
      :global-info="globalInfo"
      :transform-info="transformInfo"
    />
    <ScrollBar
      v-if="scrollBarInfo.isYLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
      :global-info="globalInfo"
      :transform-info="transformInfo"
      is-y
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, watch, reactive, computed } from 'vue';
import type {
  ScaleRulerOption,
  RequiredScaleRulerOpt,
  TransformInfo,
  CanvasInfo,
  AnyRecord
} from '@/type';
import CanvasPanel from './CanvasPanel.vue';
import ScrollBar from './ScrollBar.vue';
import Ruler from './Ruler.vue';
import deepmerge from 'deepmerge';
import { defaultProps, defaultOpt } from '@/config';
import { useContainer } from '@/hooks/useContainer';
import { useTransform } from '@/hooks/useTransform';
import { useScrollBar } from '@/hooks/useScrollBar';
import { useKeyScale } from '@/hooks/useKeyScale';
import { useSetBoundary } from '@/hooks/useSetBoundary';
import { useMouseWheel } from '@/hooks/useMouseWheel';
const props = withDefaults(defineProps<ScaleRulerOption>(), defaultProps);
const opt = ref<RequiredScaleRulerOpt>(
  deepmerge(defaultOpt, props) as RequiredScaleRulerOpt
);
const container = ref(null);
const { containerInfo, containerStyle } = useContainer(opt, container);
/**
 * 动态移动
 */
const { transformInfo } = useTransform(opt, containerInfo);
const { boundaryInfo } = useSetBoundary(opt, containerInfo, transformInfo);
const canvasInfo = computed(
  (): CanvasInfo => Object.assign({}, transformInfo, boundaryInfo.value)
);
const { scrollBarInfo } = useScrollBar(opt, containerInfo, transformInfo);
/**
 * 保存初始的transformInfo，之后不再监听
 */
const originTransform = reactive<TransformInfo>({});
const watchTransform = watch(
  () => transformInfo.scale,
  (newVal) => {
    console.log(newVal, '--newVal-');
    if (newVal) {
      const insertObj = {
        scale: newVal,
        translateX: transformInfo.translateX,
        translateY: transformInfo.translateY
      };
      if (!originTransform.scale) {
        Object.assign(originTransform, insertObj);
      }
      watchTransform();
    }
  }
);

watch(
  () => props,
  () => {
    opt.value = deepmerge(opt.value, props) as RequiredScaleRulerOpt;
  },
  {
    deep: true
  }
);

// 代理键盘事件
useKeyScale(opt, containerInfo, transformInfo);
// 全局的一些缓存配置
const globalInfo = reactive<AnyRecord>({});
// 代理鼠标滚轮事件
useMouseWheel(
  opt,
  containerInfo,
  transformInfo,
  boundaryInfo,
  container,
  scrollBarInfo,
  globalInfo
);

// 还原
function reset() {
  Object.assign(transformInfo, originTransform);
}
// 删除所有定位线
function removeAllPositionLine() {}
// 切换标尺隐藏或显示
function toggleRuler() {}
defineExpose({ reset });
</script>
