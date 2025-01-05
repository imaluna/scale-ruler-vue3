<template>
  <div class="p-home">
    <aside>
      <button id="btn">点击改变</button>
      <button id="btn2" @click="removeAllPositionLine">删除定位线</button>
      <button id="btn3" @click="hideAllPositionLine">隐藏定位线</button>
      <button id="btn4" @click="showAllPositionLine">显示定位线</button>
      <button id="btn5" @click="showRuler">显示标尺</button>
      <button id="btn6" @click="hideRuler">隐藏标尺</button>
      <button id="btn7" @click="scaleGrow">放大</button>
      <button id="btn8" @click="scaleShrink">缩小</button>
      <button id="btn9" @click="handleReset">还原</button>
      <button @click="addAdsorptionList">添加吸附线y</button>
    </aside>
    <main>
      <header>我是头部</header>
      <ScaleRuler
        class="container"
        ref="scaleRulerRef"
        v-model:scale="opt.scale"
        :auto-scale="opt.autoScale"
        :canvas-width="opt.canvasWidth"
        :canvas-height="opt.canvasHeight"
        :container-auto-size="true"
        :canvas-style="opt.canvasStyle"
      ></ScaleRuler>
      <footer>我是底部</footer>
    </main>
    <aside>lala</aside>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import ScaleRuler from 'scale-ruler-vue3';
interface AnyRecord {
  [key: string]: any;
}
const opt = reactive<AnyRecord>({
  canvasWidth: 1920,
  canvasHeight: 1000,
  autoScale: true,
  scale: 1,
  canvasStyle: {
    backgroundColor: '#ccc'
  },
  useRuler: false
});

const scaleRulerRef = ref(null);
function handleReset() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.reset();
  }
}
function removeAllPositionLine() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.removeAllPositionLine();
  }
}
function showRuler() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.showRuler();
  }
}
function hideRuler() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.hideRuler();
  }
}
function showAllPositionLine() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.showAllPositionLine();
  }
}
function hideAllPositionLine() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.hideAllPositionLine();
  }
}
function scaleGrow() {
  opt.scale += 0.05;
}
function scaleShrink() {
  opt.scale -= 0.05;
}
function addAdsorptionList() {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.addAdsorptionList([200, 300], true);
  }
}
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
