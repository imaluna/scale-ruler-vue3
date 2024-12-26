<template>
  <canvas
    ref="rulerRef"
    :style="styles"
    :width="rulerInfo.width"
    :height="rulerInfo.height"
  ></canvas>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { usePaintRuler } from '../hooks/usePaintRuler';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  CanvasInfo
} from '../type';

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
  },
  isY: {
    type: Boolean,
    default: false
  }
});
const rulerInfo = computed((): AnyRecord => {
  const { isY, containerInfo, opt } = props;
  return {
    width: isY ? opt.rulerConfig.yRulerWidth : (containerInfo.width as number),
    height: isY
      ? (containerInfo.height as number)
      : opt.rulerConfig.xRulerHeight
  };
});
const styles = computed((): AnyRecord => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: props.opt.rulerConfig.zIndex + (props.isY ? 0 : 1)
  };
});
const rulerRef = ref();
watch(
  [() => props.containerInfo, () => props.canvasInfo],
  () => {
    usePaintRuler(
      props.opt,
      props.canvasInfo,
      props.isY,
      rulerRef
    );
  },
  {
    deep: true
  }
);
</script>
