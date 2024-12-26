<template>
  <div ref="scrollBar" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type {
  AnyRecord,
  RequiredScaleRulerOpt,
  ContainerInfo,
  ScrollBarInfo
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
  isY: {
    type: Boolean,
    default: false
  },
  scrollBarInfo: {
    type: Object as PropType<ScrollBarInfo>,
    required: true
  }
});
const styles = computed((): AnyRecord => {
  const { opt, scrollBarInfo, isY } = props;
  const { scrollBarConfig } = opt;
  const res: AnyRecord = {
    position: 'absolute',
    borderRadius: '4px',
    backgroundColor: scrollBarConfig.bgColor,
    opacity: 0.4,
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
</script>
