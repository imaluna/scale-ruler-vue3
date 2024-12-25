<template>
  <div class="p-home">
    <aside>
      <button id="btn">点击改变</button>
      <button id="btn2">删除定位线</button>
      <button id="btn3">隐藏定位线</button>
      <button id="btn4">显示定位线</button>
      <button id="btn5">显示标尺</button>
      <button id="btn6">隐藏标尺</button>
      <button id="btn7">放大</button>
      <button id="btn8">缩小</button>
      <button id="btn9">还原</button>
    </aside>
    <main>
      <header>我是头部</header>
      <ScaleRuler
        class="container"
        :canvas-width="opt.canvasWidth"
        :canvas-height="opt.canvasHeight"
        :container-auto-size="true"
      ></ScaleRuler>
      <footer>我是底部</footer>
    </main>
    <aside>lala</aside>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import ScaleRuler from 'scale-ruler-vue3';
import type { ScaleRulerOption } from 'scale-ruler-vue3';
const opt = reactive<ScaleRulerOption>({
  canvasWidth: 1920,
  canvasHeight: 1000
});
</script>
<style lang="scss">
body,
html,
div {
  padding: 0;
  margin: 0;
}
.p-home {
  display: flex;
  height: 100vh;
  aside {
    width: 200px;
    height: 100%;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  header,
  footer {
    height: 100px;
    width: 100%;
  }
  .container {
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    border: 12px solid #ddd;
  }
}
</style>
