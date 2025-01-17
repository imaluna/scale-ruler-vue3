<template>
  <canvas
    v-show="showRuler"
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
  [() => props.containerInfo, () => props.transformInfo],
  () => {
    usePaintRuler(props.opt, props.transformInfo, props.isY, rulerRef);
  },
  {
    deep: true
  }
);
const emit = defineEmits(['update-adsorption-list']);
function updateList(value: number[]) {
  emit('update-adsorption-list', value, !props.isY);
}
const { adsorptionList, modifyAdsorptionList } = useAdsorption(
  opt,
  !props.isY,
  updateList
);
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

/**
 * 删除所有定位线
 */
function removeAllPositionLine() {
  Object.keys(positionLineMap).forEach((id) => {
    handleRemove(id);
  });
}

/**
 * 切换所有定位线显示/隐藏
 */
function togglePositionLine(show: boolean = true) {
  Object.keys(positionLineMap).forEach((id) => {
    positionLineMap[id].show = show;
  });
}
const showRuler = ref(true);
/**
 * 切换显示/隐藏标尺
 */
function toggleRuler(show: boolean = true) {
  showRuler.value = show;
  togglePositionLine(show);
}
function getPositionLineList(): number[] {
  return positionLineMap
    .filter((item: AnyRecord) => !!item)
    .map((item: AnyRecord) => item.coordinate as number)
    .sort((a: number, b: number) => a - b);
}
defineExpose({
  modifyAdsorptionList,
  removeAllPositionLine,
  togglePositionLine,
  toggleRuler,
  getPositionLineList
});
</script>
