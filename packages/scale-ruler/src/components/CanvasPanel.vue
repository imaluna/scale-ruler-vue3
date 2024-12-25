<template>
  <div ref="canvasPanel" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { ContainerInfo, AnyRecord, RequiredScaleRulerOpt } from '../type';
const props = defineProps({
  containerInfo: {
    type: Object as PropType<ContainerInfo>
  },
  opt: Object as PropType<RequiredScaleRulerOpt>
});

const styles = computed((): AnyRecord => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: props.opt?.canvasWidth + 'px',
    height: props.opt?.canvasHeight + 'px',
    transition: 'transform 300ms',
    transformOrigin: '0 0'
  };
});



</script>
