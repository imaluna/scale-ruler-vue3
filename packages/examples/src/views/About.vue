<template>
  <div>123</div>
</template>
<script setup lang="ts">
import { useAdd } from './useAdd';
const { list, add } = useAdd();
console.log(list);
onMounted(() => {
  add(5);
  add(2);
  add(7);

});
</script>
