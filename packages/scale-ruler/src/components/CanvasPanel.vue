<template>
  <div ref="canvasPanel" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  CanvasInfo
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
  canvasInfo: {
    type: Object as PropType<CanvasInfo>,
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
    transition: 'transform 300ms',
    transformOrigin: '0 0',
    transform: `translate(${props.canvasInfo.translateX}px, ${
      props.canvasInfo.translateY
    }px) scale(${props.canvasInfo.scale})`,
    ...props.opt.canvasStyle
  };
});
</script>
