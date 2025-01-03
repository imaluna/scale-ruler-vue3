<template>
  <canvas
    ref="rulerRef"
    :style="styles"
    :width="rulerInfo.width"
    :height="rulerInfo.height"
  ></canvas>
  <div
    v-if="props.opt.usePositionLine"
    :class="'position-line-' + (props.isY ? 'x' : 'y')"
  >
    <PositionLine
      v-for="id in Object.keys(positionLineMap)"
      :key="id"
      :opt="props.opt"
      :is-y="!props.isY"
      :transform-info="props.transformInfo"
      :container-info="props.containerInfo"
      :line-info="positionLineMap[id]"
      :adsorption-list="adsorptionList"
      @remove-position-line="handleRemove"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, toRefs } from 'vue';
import type { PropType } from 'vue';
import { usePaintRuler } from '../hooks/usePaintRuler';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  CanvasInfo,
  TransformInfo
} from '@/type';
import { useAdsorption } from '@/hooks/useAdsorption';
import { useAddPositionLine } from '@/hooks/useAddPositionLine';
import PositionLine from './PositionLine.vue';
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
  },
  transformInfo: {
    type: Object as PropType<TransformInfo>,
    required: true
  }
});
const { opt, transformInfo, containerInfo } = toRefs(props);
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
    usePaintRuler(props.opt, props.canvasInfo, props.isY, rulerRef);
  },
  {
    deep: true
  }
);
const { adsorptionList } = useAdsorption(props.opt, props.isY);
const { positionLineMap } = useAddPositionLine(
  opt,
  containerInfo,
  adsorptionList,
  transformInfo,
  !props.isY,
  rulerRef
);
function handleRemove(id: number | string) {
  delete positionLineMap[id];
}


</script>
