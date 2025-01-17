<template>
  <div ref="canvasPanel" :style="styles">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  TransformInfo
} from '@/type';
const props = defineProps({
  containerInfo: {
    type: Object as PropType<ContainerInfo>,
    required: true
  },
  opt: {
    type: Object as PropType<RequiredScaleRulerOpt>,
    required: true
  },
  transformInfo: {
    type: Object as PropType<TransformInfo>,
    required: true
  }
});
const styles = computed((): AnyRecord => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: props.opt?.canvasWidth + 'px',
    height: props.opt?.canvasHeight + 'px',
    transformOrigin: '0 0',
    transform: `translate(${props.transformInfo.translateX}px, ${
      props.transformInfo.translateY
    }px) scale(${props.transformInfo.scale})`,
    ...props.opt.canvasStyle
  };
});
</script>
