<template>
  <div>
    <p>
      <el-input v-model="addNum" style="width: 300px"></el-input>
      <el-button @click="handleAdd">增加</el-button>
    </p>
    <p>
      <el-input v-model="removeNum" style="width: 300px"></el-input>
      <el-button @click="handleRemove">删除</el-button>
    </p>
    <AddList ref="addListRef" v-model:list="list" />
    <ShowList :list="list" />
  </div>
</template>
<script setup lang="ts">
import AddList from '@/components/AddList.vue';
import ShowList from '@/components/ShowList.vue';
const list = ref<number[]>([0, 100]);
console.log(list);
const addNum = ref('');
const removeNum = ref('');
const addListRef = ref<InstanceType<typeof AddList> | null>(null);
function modify(data: number[], isAdd: boolean) {
  if (addListRef.value) {
    addListRef.value.modify(data, isAdd);
  }
}
function handleAdd() {
  modify([+addNum.value], true);
}
function handleRemove() {
  modify([+removeNum.value], false);
}
</script>
