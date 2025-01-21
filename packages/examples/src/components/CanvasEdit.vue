<template>
  <div ref="canvasEditRef" class="m-canvas-edit">
    <div
      v-for="item in itemList"
      class="canvas-item"
      :class="item.id === currentItem?.id ? 'selected' : ''"
      :key="item.id"
      :style="getStyle(item)"
      @mousedown.stop="(e: MouseEvent) => handleSelect(e, item)"
    >
      <div class="move-box" @mousedown="handleMouseDown"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RectType, AnyRecord } from '@/index.d';
import { useEditStore } from '@/store/modules/useEditStore';
import type { ItemType } from '@/store/modules/useEditStore.d';
import { getInt } from '@/utils';

const props = defineProps({
  scale: {
    type: Number,
    required: true
  },
  positionLineXList: {
    type: Array as PropType<number[]>,
    default: []
  },
  positionLineYList: {
    type: Array as PropType<number[]>,
    default: []
  }
});
const store = useEditStore();
const emit = defineEmits(['removeAdsorptionLine', 'addAdsorptionLine']);
const { positionLineXList, positionLineYList } = toRefs(props);
const itemList = store.getItemList;

function getStyle(item: ItemType) {
  return {
    width: item.width + 'px',
    height: item.height + 'px',
    backgroundColor: item.bgColor,
    transform: `translate(${item.x}px, ${item.y}px)`
  };
}
/**
 * 初始化canvasEdit的rect
 */
const canvasEditRef = ref(null);
const canvasEditRectInfo = reactive<RectType>({
  width: 0,
  height: 0,
  top: 0,
  left: 0
});
function updateRect() {
  setTimeout(() => {
    if (canvasEditRef.value) {
      let node = canvasEditRef.value as HTMLElement;
      const rect = node.getBoundingClientRect();
      canvasEditRectInfo.top = rect.top;
      canvasEditRectInfo.left = rect.left;
      canvasEditRectInfo.width = rect.width;
      canvasEditRectInfo.height = rect.height;
      store.setCanvasRect(canvasEditRectInfo);
    }
  }, 300);
}

/**
 * 选中元素
 */
const currentItem = ref<ItemType | null>();
function handleSelect(e: MouseEvent, item: ItemType) {
  currentItem.value = item;
  handleMouseDown(e);
}

const isMouseDown = ref<boolean>(false);
const cacheInfo = reactive<AnyRecord>({});
let currentNode: HTMLElement | null;

/**
 * 移动-鼠标按下
 */
function handleMouseDown(e: MouseEvent) {
  e.preventDefault();
  currentNode = e.target as HTMLElement;
  isMouseDown.value = true;
  cacheInfo.x = currentItem.value?.x;
  cacheInfo.y = currentItem.value?.y;
  cacheInfo.startX = e.pageX;
  cacheInfo.startY = e.pageY;
  const rect = currentNode.getBoundingClientRect();
  cacheInfo.width = rect.width;
  cacheInfo.height = rect.height;
  document.addEventListener('mousemove', mouseMoveEvent);
  document.addEventListener('keydown', handleKeyDown);
}
function mouseMoveEvent(e: MouseEvent) {
  if (!isMouseDown.value) return;
  e.preventDefault();
  const moveX = (e.pageX - cacheInfo.startX) / props.scale;
  const moveY = (e.pageY - cacheInfo.startY) / props.scale;
  if (currentItem.value) {
    currentItem.value.x = checkAdSorptionLine(cacheInfo.x + moveX, false);
    currentItem.value.y = checkAdSorptionLine(cacheInfo.y + moveY, true);
  }
}
document.addEventListener('mouseup', (e: MouseEvent) => {
  if (isMouseDown.value) {
    isMouseDown.value = false;
    document.removeEventListener('mousemove', mouseMoveEvent);
  }
  if (currentNode) {
    const x = e.pageX;
    const y = e.pageY;
    const rect = currentNode.getBoundingClientRect();
    if (
      rect.top <= y &&
      rect.left <= x &&
      rect.top + rect.height >= y &&
      rect.left + rect.width >= x
    ) {
      if (currentItem.value) {
        const _x = getInt(checkAdSorptionLine(currentItem.value.x, false));
        const _y = getInt(checkAdSorptionLine(currentItem.value.y, true));
        changeAdsorptionLine(_x, cacheInfo.x, currentItem.value.width, false);
        changeAdsorptionLine(_y, cacheInfo.y, currentItem.value.height, true);
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      currentNode = null;
      currentItem.value = null;
    }
  }
});
function changeAdsorptionLine(
  newVal: number,
  oldVal: number,
  size: number,
  isY: boolean
) {
  if (currentItem.value) {
    if (newVal !== oldVal) {
      currentItem.value[isY ? 'y' : 'x'] = newVal;
      const oldList = [oldVal, getInt(oldVal + size)];
      const newList = [newVal, getInt(newVal + size)];
      // 添加新的吸附线
      store.setItemAdsorption(newList, isY);
      // 删除旧吸附线，并检查是否需要父组件删除吸附线
      const removeList = store.removeItemAdsorption(oldList, isY);
      if (removeList.length > 0) {
        emit('removeAdsorptionLine', removeList, isY);
      }
      emit('addAdsorptionLine', newList, isY);
    }
  }
}
/**
 * 选中元素时的键盘事件
 * 上下左右移动，改变元素的位置
 */
const directionCodeList = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
function handleKeyDown(e: KeyboardEvent) {
  // 有选中
  if (currentNode && directionCodeList.includes(e.code)) {
    e.preventDefault();
    const { code } = e;
    const { x, y, width, height } = cacheInfo;
    let newVal = x,
      isY = false;
    switch (code) {
      case directionCodeList[0]:
        newVal = x + 1;
        break;
      case directionCodeList[1]:
        newVal = x - 1;
        break;
      case directionCodeList[2]:
        newVal = y - 1;
        isY = true;
        break;
      default:
        isY = true;
        newVal = y + 1;
    }

    changeAdsorptionLine(
      getInt(newVal),
      isY ? y : x,
      isY ? height : width,
      isY
    );
    cacheInfo[isY ? 'y' : 'x'] = newVal;
  }
}

/**
 * 检查是否需要吸附
 */
function checkAdSorptionLine(coordinate: number, isY: boolean) {
  const list = isY ? positionLineYList.value : positionLineXList.value;
  for (let i = 0; i < list.length; i++) {
    const value = list[i];
    if (Math.abs(value - coordinate) <= Math.max(4, 4 / props.scale)) {
      return value;
    }
  }
  return coordinate;
}
onMounted(() => {
  updateRect();
});
defineExpose({
  updateRect
});
</script>
<style lang="scss">
.m-canvas-edit {
  position: relative;
  width: 100%;
  height: 100%;
  .canvas-item {
    position: absolute;
    left: 0;
    right: 0;
    cursor: move;
    .move-box {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-sizing: border-box;
      border: 1px solid #4a4242;
    }
    &.selected {
      .move-box {
        display: block;
      }
    }
  }
}
</style>
