<template>
  <div ref="container" class="scale-ruler-container">
    <div>content</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import type { PropType } from 'vue';
import type { ScaleRulerOption } from './type';
const props = defineProps({
  options: {
    type: Object as PropType<ScaleRulerOption>,
    default: () => ({})
  }
});
const { options } = toRefs(props);
console.log(options, '---options--');
</script>
