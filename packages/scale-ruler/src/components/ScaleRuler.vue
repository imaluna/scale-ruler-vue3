<template>
  <div ref="container" :style="containerStyles">
    <CanvasPanel :container-info="containerInfo" :opt="opt"
      ><slot></slot
    ></CanvasPanel>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  withDefaults,
  ref,
  onMounted,
  watch,
  reactive,
  computed
} from 'vue';
import type {
  ScaleRulerOption,
  ContainerInfo,
  RequiredScaleRulerOpt,
  AnyRecord
} from '../type';
import CanvasPanel from './CanvasPanel.vue';
import deepmerge from 'deepmerge';
import { defaultProps, defaultOpt } from '@/config';
const props = withDefaults(defineProps<ScaleRulerOption>(), defaultProps);
const opt = ref<RequiredScaleRulerOpt>(defaultOpt);

watch(
  () => props,
  () => {
    opt.value = deepmerge(opt.value, props) as RequiredScaleRulerOpt;
    console.log(opt.value);
  },
  {
    deep: true
  }
);
// 初始化container
const containerInfo = reactive<ContainerInfo>({});
const containerStyles = reactive<AnyRecord>({});
const container = ref(null);
function initContainer(): void {
  if (!container.value) return;
  const containerEl: HTMLElement = container.value;
  let width: number = 0,
    height: number = 0;
  const _opt = opt.value;
  if (_opt.containerAutoSize) {
    width = containerEl.offsetWidth;
    height = containerEl.offsetHeight;
    // 缓存原宽高
    containerInfo.originWidth = width;
    containerInfo.originHeight = height;
    // 自动监听containerEl宽高变化
    if (!containerInfo.hasAddResize) {
      onContainerResize(containerEl);
    }
  } else {
    if (!_opt.containerWidth || !_opt.containerHeight) {
      // todo
      throw Error('');
    }
    width = _opt.containerWidth;
    height = _opt.containerHeight;
    containerStyles.width = width;
    containerStyles.height = height;
  }
  const styles = getComputedStyle(containerEl);
  if (styles.boxSizing === 'border-box') {
    width -=
      parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth);
    height -=
      parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
  }
  containerInfo.width = width;
  containerInfo.height = height;
  if (styles.position === 'static') {
    containerStyles.position = 'relative';
  }
  containerStyles.overflow = 'hidden';
}
function onContainerResize(node: HTMLElement) {
  containerInfo.hasAddResize = true;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === node) {
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        if (
          width !== containerInfo.originWidth ||
          height !== containerInfo.originHeight
        ) {
          initContainer();
        }
      }
    }
  });
  resizeObserver.observe(node);
}
onMounted(() => {
  opt.value = deepmerge(defaultOpt, props) as RequiredScaleRulerOpt;
  initContainer();
});
</script>
