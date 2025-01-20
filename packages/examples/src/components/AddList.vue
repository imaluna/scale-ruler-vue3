<template>
  <div>
    <el-button @click="add">子组件增加</el-button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array as PropType<number[]>,
    required: true
  }
});
function sortByAsc(arr: number[]) {
  return arr.sort((a, b) => a - b);
}

const newList = reactive<number[]>(props.list);
watch(
  () => props.list,
  (newVal, oldVal) => {
    sortByAsc(newVal);
    if (newVal.join(',') === sortByAsc(newList).join(',')) {
      return;
    }
    if (oldVal) {
      if (newVal.join(',') === sortByAsc(oldVal).join(',')) {
        return;
      }
      modify(oldVal, false);
    }
    if (newVal.length > 0) {
      modify(newVal, true);
    }
  }
);
const emit = defineEmits(['update:list']);
function modify(data: number[], isAdd: boolean) {
  console.log({ data, isAdd });
  data.forEach((num) => {
    const index = newList.indexOf(num);
    if (isAdd && index === -1) {
      newList.push(num);
    }
    if (!isAdd && index > -1) {
      newList.splice(index, 1);
    }
  });
  sortByAsc(newList);
  console.log(newList);
  emit('update:list', newList);
}
function random() {
  return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
}
function add() {
  const num = random();
  modify([num], true);
}
defineExpose({
  modify
});
</script>
