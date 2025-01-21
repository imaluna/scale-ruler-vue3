<template>
  <div ref="scrollBarRef" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed, toRefs, ref, onMounted } from 'vue';
import type { PropType } from 'vue';
import { bindMouseMove } from '@/utils/mouseEvent';

import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  ScrollBarInfo,
  TransformInfo,
  RequiredContainerInfo
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
  scrollBarInfo: {
    type: Object as PropType<ScrollBarInfo>,
    required: true
  },
  globalInfo: {
    type: Object as PropType<AnyRecord>,
    required: true
  },
  transformInfo: {
    type: Object as PropType<TransformInfo>,
    required: true
  }
});
const emit = defineEmits(['onMove']);
const { globalInfo, transformInfo } = toRefs(props);
const styles = computed((): AnyRecord => {
  const { opt, scrollBarInfo, isY } = props;
  const { scrollBarConfig } = opt;
  const res: AnyRecord = {
    position: 'absolute',
    borderRadius: '4px',
    backgroundColor: scrollBarConfig.bgColor,
    opacity: props.globalInfo[isY ? 'yOpacity' : 'xOpacity'] || 0,
    transition: 'opacity 300ms',
    cursor: 'pointer',
    zIndex: scrollBarConfig.zIndex,
    width: (isY ? scrollBarConfig.barSize : scrollBarInfo.width) + 'px',
    height: (isY ? scrollBarInfo.height : scrollBarConfig.barSize) + 'px'
  };
  if (isY) {
    res.top = scrollBarInfo.top + 'px';
    res.right = 0;
  } else {
    res.left = scrollBarInfo.left + 'px';
    res.bottom = 0;
  }
  return res;
});
const scrollBarRef = ref(null);
const currentPropInfo: AnyRecord = {};
function mousemoveEvent(e: MouseEvent) {
  e.preventDefault();
  if (!globalInfo.value.scrollBarMouseDown) return;
  let { translateX, translateY } =
    transformInfo.value as Required<TransformInfo>;
  const scrollBarInfo = props.scrollBarInfo as Required<ScrollBarInfo>;
  const { width, height } = props.containerInfo as RequiredContainerInfo;
  if (props.isY) {
    const move = e.pageY - currentPropInfo.startY;
    let barTop = currentPropInfo.top + move;
    barTop = Math.min(Math.max(0, barTop), height - scrollBarInfo.height);
    const top = (barTop * scrollBarInfo.totalHeight) / height;
    translateY = props.opt.containerYPadding - top;
    transformInfo.value.translateY = translateY;
  } else {
    const move = e.pageX - currentPropInfo.startX;
    let barLeft = currentPropInfo.left + move;
    barLeft = Math.min(Math.max(0, barLeft), width - scrollBarInfo.width);
    const left = (barLeft * scrollBarInfo.totalWidth) / width;
    translateX = props.opt.containerXPadding - left;
    transformInfo.value.translateX = translateX;
  }
  emit(
    'onMove',
    transformInfo.value.translateX,
    transformInfo.value.translateY
  );
}
function mousedownEvent(e: MouseEvent) {
  globalInfo.value.scrollBarMouseDown = true;
  currentPropInfo.startX = e.pageX;
  currentPropInfo.startY = e.pageY;
  currentPropInfo.left = props.scrollBarInfo.left;
  currentPropInfo.top = props.scrollBarInfo.top;
}
function mouseupEvent() {
  if (!globalInfo.value.scrollBarMouseDown) return;
  globalInfo.value.scrollBarMouseDown = false;
}
onMounted(() => {
  if (scrollBarRef.value) {
    const node = scrollBarRef.value as HTMLElement;
    const currentProp = props.isY ? 'yOpacity' : 'xOpacity';
    node.addEventListener('mouseenter', () => {
      globalInfo.value[currentProp] = props.opt.scrollBarConfig.opacity;
      globalInfo.value[props.isY ? 'xOpacity' : 'yOpacity'] = 0;
      globalInfo.value.scrollBarEnter = true;
    });
    node.addEventListener('mouseleave', () => {
      if (globalInfo.value.scrollBarMouseDown) return;
      globalInfo.value.scrollBarEnter = false;
      globalInfo.value[currentProp] = 0;
    });
    bindMouseMove(node, mousedownEvent, mousemoveEvent, mouseupEvent);
  }
});
</script>
