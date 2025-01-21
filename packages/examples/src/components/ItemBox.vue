<template>
  <div class="m-item-box">
    <p class="">选择拖拽</p>
    <ul class="item-box-list">
      <li v-for="item in componentList" :key="item.id">
        <div
          :style="{
            width: item.width + 'px',
            height: item.height + 'px',
            backgroundColor: item.bgColor
          }"
          @mousedown="(e: MouseEvent) => handleMouseDown(e, item)"
        ></div>
      </li>
    </ul>
    <div
      class="move-item"
      v-if="currentItem"
      :style="{
        width: currentItem.width + 'px',
        height: currentItem.height + 'px',
        backgroundColor: currentItem.bgColor,
        transform: `translate(${currentItem.x}px, ${currentItem.y}px)`
      }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { componentList } from '@/config';
import type { ComponentItem } from '@/config/index.d';
import type { ItemType } from '@/store/modules/useEditStore.d';
import { useEditStore } from '@/store/modules/useEditStore';
import type { RectType } from '@/index.d';
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
interface StartRectType {
  left: number;
  top: number;
  x: number;
  y: number;
}

const startRect = reactive<Partial<StartRectType>>({});
const store = useEditStore();
const canvasRect = computed(() => store.getCanvasReact);
const emit = defineEmits(['getContainer', 'addAdsorptionLine']);
const { positionLineXList, positionLineYList } = toRefs(props);
const currentItem = ref<ItemType | null>(null);

function handleMouseDown(e: MouseEvent, item: ComponentItem) {
  const node = e.target as HTMLElement;
  const rect = node.getBoundingClientRect();
  startRect.top = rect.top;
  startRect.left = rect.left;
  startRect.x = e.pageX;
  startRect.y = e.pageY;
  currentItem.value = {
    ...item,
    ...startRect,

    x: rect.left,
    y: rect.top,
    id: store.getId
  } as ItemType;
  document.addEventListener('mousemove', moveEvent);
}

function moveEvent(e: MouseEvent) {
  const moveX = e.pageX - (startRect.x as number);
  const moveY = e.pageY - (startRect.y as number);
  if (currentItem.value) {
    const coordinateX = checkAdSorptionLine(
      calCoordinate(currentItem.value.left + moveX, false),
      false
    );
    const coordinateY = checkAdSorptionLine(
      calCoordinate(currentItem.value.top + moveY, true),
      true
    );
    currentItem.value.x = calTranslate(coordinateX, false);
    currentItem.value.y = calTranslate(coordinateY, true);
  }
}
function calCoordinate(value: number, isY: boolean) {
  const rect = canvasRect.value as RectType;
  return (value - (isY ? rect.top : rect.left)) / props.scale;
}
function calTranslate(value: number, isY: boolean) {
  const rect = canvasRect.value as RectType;
  return value * props.scale + (isY ? rect.top : rect.left);
}
function checkAdSorptionLine(coordinate: number, isY: boolean): number {
  const list = isY ? positionLineYList.value : positionLineXList.value;
  for (let i = 0; i < list.length; i++) {
    const value = list[i];
    if (Math.abs(value - coordinate) <= Math.max(4, 4 / props.scale)) {
      return value;
    }
  }
  return coordinate;
}

document.addEventListener('mouseup', () => {
  if (currentItem.value) {
    const rect = canvasRect.value as RectType;
    // 在区域内，加入
    const { x, y, height, width } = currentItem.value;
    if (
      x + width > rect.left &&
      y + height > rect.top &&
      x <= rect.left + rect.width &&
      y <= rect.top + rect.height
    ) {
      const _x = getInt(
        checkAdSorptionLine(calCoordinate(currentItem.value.x, false), false)
      );
      const _y = getInt(
        checkAdSorptionLine(calCoordinate(currentItem.value.y, true), true)
      );
      currentItem.value.x = _x;
      currentItem.value.y = _y;
      const width = getInt(currentItem.value.width / props.scale);
      const height = getInt(currentItem.value.height / props.scale);
      currentItem.value.width = width;
      currentItem.value.height = height;

      store.addItem(currentItem.value);
      // 加入吸附线
      const xList = [_x, _x + width];
      const yList = [_y, _y + height];
      emit('addAdsorptionLine', xList, false);
      emit('addAdsorptionLine', yList, true);
      // 因为新增元素而新增的吸附线，随着元素的移动或删除而变化
      store.setItemAdsorption(xList, false);
      store.setItemAdsorption(yList, true);
    }

    currentItem.value = null;
  }
  document.removeEventListener('mousemove', moveEvent);
});
</script>
<style lang="scss">
.m-item-box {
  padding: 10px;
  p {
    padding: 0;
    font-size: 13px;
    margin-top: 20px;
  }
  .item-box-list {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    li {
      padding: 5px 0;
      margin: 0;
      list-style: none;
      div {
        font-size: 12px;
        text-align: center;
        line-height: 80px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  .move-item {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    cursor: pointer;
  }
}
</style>
