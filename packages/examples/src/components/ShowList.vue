<template>
  <div>
    <el-button @click="show">显示</el-button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array as PropType<number[]>,
    required: true
  }
});
function show() {
  console.log(JSON.stringify(props.list), '---show---');
}
</script>
