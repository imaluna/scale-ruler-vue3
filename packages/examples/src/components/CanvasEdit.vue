<template>
  <div ref="canvasEditRef" class="m-canvas-edit">
    <div
      v-for="item in itemList"
      class="canvas-item"
      :class="item.id === currentItem?.id ? 'selected' : ''"
      :key="item.id"
      :style="getStyle(item)"
      @mousedown.stop="(e: MouseEvent) => handleSelect(e, item)"
      @keydown.stop="handleKeyDown"
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
const emit = defineEmits([
  'getPositionLineList',
  'removeAdsorptionLine',
  'addAdsorptionLine'
]);
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
const rectInfo = reactive<RectType>({
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
      rectInfo.top = rect.top;
      rectInfo.left = rect.left;
      rectInfo.width = rect.width;
      rectInfo.height = rect.height;
      store.setCanvasRect(rectInfo);
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
  emit('getPositionLineList');
  document.addEventListener('mousemove', mouseMoveEvent);
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
          currentItem.value.x = _x;
          currentItem.value.y = _y;
          // 移除之前的吸附线
          const oldXList = [cacheInfo.x, cacheInfo.x + currentItem.value.width];
          const oldYList = [
            cacheInfo.y,
            cacheInfo.y + currentItem.value.height
          ];

          const xList = [_x, _x + currentItem.value.width];
          const yList = [_y, _y + currentItem.value.height];
          store.setItemAdsorption(xList, false);
          store.setItemAdsorption(yList, true);
          const removeXList = store.removeItemAdsorption(oldXList, false);
          const removeYList = store.removeItemAdsorption(oldYList, true);
          // 检查是否需要删除吸附线
          removeAdSorptionLine(removeXList, removeYList);
          // 新增吸附线
          emit('addAdsorptionLine', xList, false);
          emit('addAdsorptionLine', yList, true);
        }
      } else {
        currentNode = null;
        currentItem.value = null;
      }
    }
  }
});
/**
 * 键盘事件
 */
function handleKeyDown(e: KeyboardEvent) {
  console.log(e);
}
function removeAdSorptionLine(removeXList: number[], removeYList: number[]) {
  if (removeXList.length > 0) {
    emit('removeAdsorptionLine', removeXList, false);
  }
  if (removeYList.length > 0) {
    emit('removeAdsorptionLine', removeYList, true);
  }
}

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
