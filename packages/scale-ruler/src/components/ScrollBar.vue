<template>
  <div ref="scrollBarRef" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed, toRefs, ref, onMounted } from 'vue';
import type { PropType } from 'vue';
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
  scrollBarOpacity: {
    type: Object as PropType<AnyRecord>,
    required: true
  },
  transformInfo: {
    type: Object as PropType<TransformInfo>,
    required: true
  }
});
const { scrollBarOpacity, transformInfo } = toRefs(props);
const styles = computed((): AnyRecord => {
  const { opt, scrollBarInfo, isY } = props;
  const { scrollBarConfig } = opt;
  const res: AnyRecord = {
    position: 'absolute',
    borderRadius: '4px',
    backgroundColor: scrollBarConfig.bgColor,
    opacity: props.scrollBarOpacity[isY ? 'yOpacity' : 'xOpacity'] || 0,
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
const currentInfo: AnyRecord = {};
function mousemoveEvent(e: MouseEvent) {
  e.preventDefault();
  if (!scrollBarOpacity.value.isMouseDown) return;
  let { translateX, translateY } =
    transformInfo.value as Required<TransformInfo>;
  const scrollBarInfo = props.scrollBarInfo as Required<ScrollBarInfo>;
  const { width, height } = props.containerInfo as RequiredContainerInfo;
  if (props.isY) {
    const move = e.pageY - currentInfo.startY;
    let barTop = currentInfo.top + move;
    barTop = Math.min(Math.max(0, barTop), height - scrollBarInfo.height);
    const top = (barTop * scrollBarInfo.totalHeight) / height;
    translateY = props.opt.containerYPadding - top;
    transformInfo.value.translateY = translateY;
  } else {
    const move = e.pageX - currentInfo.startX;
    let barLeft = currentInfo.left + move;
    barLeft = Math.min(Math.max(0, barLeft), width - scrollBarInfo.width);
    const left = (barLeft * scrollBarInfo.totalWidth) / width;
    translateX = props.opt.containerXPadding - left;
    transformInfo.value.translateX = translateX;
  }
}
onMounted(() => {
  if (scrollBarRef.value) {
    const node = scrollBarRef.value as HTMLElement;
    const current = props.isY ? 'yOpacity' : 'xOpacity';
    node.addEventListener('mouseenter', () => {
      scrollBarOpacity.value[current] = props.opt.scrollBarConfig.opacity;
      scrollBarOpacity.value[props.isY ? 'xOpacity' : 'yOpacity'] = 0;
      scrollBarOpacity.value.isMouseEnter = true;
    });
    node.addEventListener('mouseleave', () => {
      scrollBarOpacity.value.isMouseEnter = false;
      scrollBarOpacity.value[current] = 0;
    });
    node.addEventListener('mousedown', (e) => {
      scrollBarOpacity.value.isMouseDown = true;
      currentInfo.startX = e.pageX;
      currentInfo.startY = e.pageY;
      currentInfo.left = props.scrollBarInfo.left;
      currentInfo.top = props.scrollBarInfo.top;

      document.addEventListener('mousemove', mousemoveEvent);
    });
    document.addEventListener('mouseup', () => {
      scrollBarOpacity.value.isMouseDown = false;
      document.removeEventListener('mousemove', mousemoveEvent);
    });
  }
});
</script>
