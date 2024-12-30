<template>
  <div class="scale-ruler_position-line" :style="wrapStyle">
    <div class="scale-ruler_position-line_inner"></div>
    <div class="scale-ruler_position-line_tip"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
  isY: {
    type: Boolean,
    default: false
  },
  transformInfo: {
    type: Object as PropType<TransformInfo>,
    required: true
  },
  lineInfo: {
    type: Object as PropType<AnyRecord>,
    required: true
  }
});

const padding = computed((): number => props.opt.positionLineConfig.padding);
const lineSize = computed((): number => 2 * padding.value + 1);

const wrapStyle = computed((): AnyRecord => {
  const { width, height } = props.containerInfo;
  const { isY, lineInfo } = props;
  console.log(lineInfo, props, '-lineInfo-');
  const { translate } = lineInfo;
  const transform = isY
    ? `translate(0, ${translate}px)`
    : `translate(${translate}px, 0)`;
  return {
    width: (isY ? width : lineSize.value) + 'px',
    height: (isY ? lineSize.value : height) + 'px',
    cursor: isY ? 'row-resize' : 'col-resize',
    top: (isY ? 0 : -padding.value) + 'px',
    left: (isY ? -padding.value : 0) + 'px',
    transform
  };
});
</script>
<style lang="scss">
.scale-ruler_position-line {
  position: absolute;
}
</style>
