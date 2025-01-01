<template>
  <div
    ref="positionLineRef"
    class="scale-ruler_position-line"
    :style="wrapStyle"
  >
    <div class="scale-ruler_position-line_inner" :style="lineStyle"></div>
    <div class="scale-ruler_position-line_tip" :style="tipStyle" ref="tipRef">
      {{ (isY ? 'Y' : 'X') + ': ' + +lineInfo.coordinate.toFixed(2) + ' px' }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs, ref, onMounted } from 'vue';
import type { PropType } from 'vue';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  TransformInfo,
  RequiredContainerInfo
} from '@/type';
import { coordinateToTranslate } from '@/utils';

import { useMovePositionLine } from '@/hooks/useMovePositionLine';
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
  },
  adsorptionList: {
    type: Array as PropType<number[]>,
    required: true
  }
});
const { lineInfo, adsorptionList, transformInfo, opt, containerInfo } =
  toRefs(props);
const padding = computed((): number => opt.value.positionLineConfig.padding);
const lineSize = computed((): number => 2 * padding.value + 1);

const translate = computed((): number =>
  coordinateToTranslate(
    transformInfo.value,
    lineInfo.value.coordinate,
    props.isY
  )
);
const wrapStyle = computed((): AnyRecord => {
  const { width, height } = containerInfo.value;
  const { isY } = props;
  const transform = isY
    ? `translate(0, ${translate.value}px)`
    : `translate(${translate.value}px, 0)`;
  return {
    position: 'absolute',
    width: (isY ? width : lineSize.value) + 'px',
    height: (isY ? lineSize.value : height) + 'px',
    cursor: isY ? 'row-resize' : 'col-resize',
    top: (!isY ? 0 : -padding.value) + 'px',
    left: (!isY ? -padding.value : 0) + 'px',
    transform,
    zIndex: props.opt.positionLineConfig.zIndex,
    transition: lineInfo.value.needAnimate ? 'transform 300ms' : ''
  };
});

const lineStyle = computed((): AnyRecord => {
  const { isY } = props;
  return {
    position: 'absolute',
    width: isY ? '100%' : '1px',
    height: isY ? '1px' : '100%',
    backgroundColor: opt.value.positionLineConfig.lineColor,
    top: (isY ? padding.value : 0) + 'px',
    left: (!isY ? padding.value : 0) + 'px'
  };
});
const tipRect = ref<AnyRecord>({});
const tipStyle = computed((): AnyRecord => {
  const { isY } = props;
  const { width, height } = containerInfo.value as RequiredContainerInfo;
  const { tipWidth, tipHeight } = tipRect.value;
  let top, left;
  if (tipWidth && tipHeight) {
    left = !isY
      ? (translate.value + lineSize.value + tipWidth >= width
          ? -tipWidth
          : lineSize.value) + 'px'
      : '50%';
    top = isY
      ? (translate.value + lineSize.value + tipHeight >= height
          ? -tipHeight
          : lineSize.value) + 'px'
      : '50%';
  } else {
    left = isY ? '50%' : lineSize.value + 'px';
    top = !isY ? '50%' : lineSize.value + 'px';
  }
  const transform = isY ? 'translate(-50%, 0)' : 'translate(0, -50%)';
  return {
    position: 'absolute',
    padding: '5px',
    lineHeight: '18px',
    minWidth: '80px',
    backgroundColor: 'rgba(0,0,0,.8)',
    color: '#fff',
    fontSize: '12px',
    borderRadius: '4px',
    userSelect: 'none',
    textAlign: 'center',
    left,
    top,
    transform,
    visibility: lineInfo.value.showTip ? 'visible' : 'hidden'
  };
});
const positionLineRef = ref(null);
const emit = defineEmits(['remove-position-line']);
function remove(id: number | string) {
  emit('remove-position-line', id);
}
useMovePositionLine(
  opt,
  containerInfo,
  adsorptionList,
  transformInfo,
  props.isY,
  positionLineRef,
  lineInfo,
  remove
);
const tipRef = ref(null);
onMounted(() => {
  if (tipRef.value) {
    const tip = tipRef.value as HTMLElement;
    const offsetWidth = tip.offsetWidth;
    const offsetHeight = tip.offsetHeight;
    tipRect.value.tipWidth = offsetWidth;
    tipRect.value.tipHeight = offsetHeight;
  }
});
</script>
