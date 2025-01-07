<template>
  <div ref="container" :style="containerStyle">
    <template v-if="opt.useRuler">
      <Ruler
        ref="xRuler"
        :opt="opt"
        :container-info="containerInfo"
        :transform-info="transformInfo"
      />
      <Ruler
        ref="yRuler"
        is-y
        :opt="opt"
        :container-info="containerInfo"
        :transform-info="transformInfo"
      />
    </template>
    <CanvasPanel
      :container-info="containerInfo"
      :opt="opt"
      :transform-info="transformInfo"
    >
      <slot></slot>
    </CanvasPanel>
    <ScrollBar
      v-if="scrollBarInfo.isXLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
      :global-info="globalInfo"
      :transform-info="transformInfo"
      @onMove="onMove"
    />
    <ScrollBar
      v-if="scrollBarInfo.isYLarge"
      :opt="opt"
      :container-info="containerInfo"
      :scroll-bar-info="scrollBarInfo"
      :global-info="globalInfo"
      :transform-info="transformInfo"
      @onMove="onMove"
      is-y
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, watch, reactive } from 'vue';
import type {
  ScaleRulerOption,
  RequiredScaleRulerOpt,
  TransformInfo,
  AnyRecord
} from '@/type';
import CanvasPanel from './CanvasPanel.vue';
import ScrollBar from './ScrollBar.vue';
import Ruler from './Ruler.vue';
import deepmerge from 'deepmerge';
import { defaultProps, defaultOpt } from '@/config';
import { useContainer } from '@/hooks/useContainer';
import { useTransform } from '@/hooks/useTransform';
import { useScrollBar } from '@/hooks/useScrollBar';
import { useKeyScale } from '@/hooks/useKeyScale';
import { useSetBoundary } from '@/hooks/useSetBoundary';
import { useMouseWheel } from '@/hooks/useMouseWheel';
import { useChangeScale } from '../hooks/useChangeScale';
const props = withDefaults(defineProps<ScaleRulerOption>(), defaultProps);
const opt = ref<RequiredScaleRulerOpt>(
  deepmerge(defaultOpt, props) as RequiredScaleRulerOpt
);
const emit = defineEmits(['update:scale', 'onScale', 'onMove']);

const container = ref(null);
const { containerInfo, containerStyle } = useContainer(opt, container);
/**
 * 动态移动
 */
const { transformInfo } = useTransform(opt, containerInfo);
const { boundaryInfo } = useSetBoundary(opt, containerInfo, transformInfo);
const { scrollBarInfo } = useScrollBar(opt, containerInfo, transformInfo);
/**
 * 保存初始的transformInfo，之后不再监听
 */
const originTransform = reactive<TransformInfo>({});
watch(
  () => transformInfo.scale,
  (newVal) => {
    if (newVal) {
      if (!originTransform.scale) {
        const insertObj = {
          scale: newVal,
          translateX: transformInfo.translateX,
          translateY: transformInfo.translateY
        };
        Object.assign(originTransform, insertObj);
      }
      emit('update:scale', newVal);
    }
  }
);

watch(
  () => props,
  () => {
    opt.value = deepmerge(opt.value, props) as RequiredScaleRulerOpt;
  },
  {
    deep: true
  }
);

function onScale(scale: number) {
  emit('onScale', scale);
}
function onMove(translateX: number, translateY: number) {
  emit('onMove', translateX, translateY);
}
// 改变尺寸
function changeScale(scale: number) {
  useChangeScale(opt, containerInfo, transformInfo, scale, onScale);
}
watch(
  () => opt.value.scale,
  (newVal) => {
    if (newVal !== transformInfo.scale) {
      changeScale(newVal);
    }
  }
);
// 代理键盘事件
useKeyScale(opt, containerInfo, transformInfo);
// 全局的一些缓存配置
const globalInfo = reactive<AnyRecord>({});
// 代理鼠标滚轮事件
useMouseWheel(
  opt,
  containerInfo,
  transformInfo,
  boundaryInfo,
  container,
  scrollBarInfo,
  globalInfo,
  onScale,
  onMove
);

// 还原
function reset() {
  Object.assign(transformInfo, originTransform);
}
const xRuler = ref(null);
const yRuler = ref(null);
// 删除所有定位线
function removeAllPositionLine() {
  if (opt.value.useRuler) {
    if (xRuler.value) {
      xRuler.value.removeAllPositionLine();
    }
    if (yRuler.value) {
      yRuler.value.removeAllPositionLine();
    }
  }
}
// 切换标尺隐藏或显示
function toggleRuler(show: boolean = true) {
  if (opt.value.useRuler) {
    if (xRuler.value) {
      xRuler.value.toggleRuler(show);
    }
    if (yRuler.value) {
      yRuler.value.toggleRuler(show);
    }
  }
}
// 切换显示/隐藏定位线
function togglePositionLine(show: boolean = true) {
  if (opt.value.useRuler) {
    if (xRuler.value) {
      xRuler.value.togglePositionLine(show);
    }
    if (yRuler.value) {
      yRuler.value.togglePositionLine(show);
    }
  }
}

/**
 * 增加定位线
 */
function modifyAdsorptionList(
  data: number | number[],
  isAdd: boolean = true,
  isY: boolean = false
) {
  if (opt.value.useRuler) {
    if (isY && xRuler.value) {
      xRuler.value.modifyAdsorptionList(data, isAdd);
    }
    if (!isY && yRuler.value) {
      yRuler.value.modifyAdsorptionList(data, isAdd);
    }
  }
}

defineExpose({
  reset,
  changeScale,
  removeAllPositionLine,
  showRuler() {
    toggleRuler();
  },
  hideRuler() {
    toggleRuler(false);
  },
  showAllPositionLine() {
    togglePositionLine();
  },
  hideAllPositionLine() {
    togglePositionLine(false);
  },
  addAdsorptionLine(data: number | number[], isY: boolean = false) {
    modifyAdsorptionList(data, true, isY);
  },
  removeAdsorptionLine(data: number | number[], isY: boolean = false) {
    modifyAdsorptionList(data, false, isY);
  }
});
</script>
