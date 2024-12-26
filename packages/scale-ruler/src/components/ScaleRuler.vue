<template>
  <div ref="container" :style="containerStyle">
    <template v-if="opt.useRuler">
      <Ruler
        :opt="opt"
        :container-info="containerInfo"
        :canvas-info="canvasInfo"
      />
      <Ruler
        is-y
        :opt="opt"
        :container-info="containerInfo"
        :canvas-info="canvasInfo"
      />
    </template>
    <CanvasPanel
      :container-info="containerInfo"
      :opt="opt"
      :canvas-info="canvasInfo"
    >
      <slot></slot>
    </CanvasPanel>
    <ScrollBar
      v-if="scrollBarInfo.isXLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
    />
    <ScrollBar
      v-if="scrollBarInfo.isYLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
      is-y
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, watch } from 'vue';
import type { ScaleRulerOption, RequiredScaleRulerOpt } from '../type';
import CanvasPanel from './CanvasPanel.vue';
import ScrollBar from './ScrollBar.vue';
import Ruler from './Ruler.vue';
import deepmerge from 'deepmerge';
import { defaultProps, defaultOpt } from '@/config';
import { useContainer } from '@/hooks/useContainer';
import { useTransform } from '@/hooks/useTransform';
import { useScrollBar } from '@/hooks/useScrollBar';
const props = withDefaults(defineProps<ScaleRulerOption>(), defaultProps);
const opt = ref<RequiredScaleRulerOpt>(
  deepmerge(defaultOpt, props) as RequiredScaleRulerOpt
);
const container = ref(null);
const { containerInfo, containerStyle } = useContainer(opt, container);
const canvasInfo = useTransform(opt, containerInfo);
const scrollBarInfo = useScrollBar(opt, containerInfo, canvasInfo);
watch(
  () => props,
  () => {
    opt.value = deepmerge(opt.value, props) as RequiredScaleRulerOpt;
  },
  {
    deep: true
  }
);
</script>
