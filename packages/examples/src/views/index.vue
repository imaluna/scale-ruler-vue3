<template>
  <div class="p-home">
    <aside class="left-aside">
      <ItemBox
        :scale="opt.scale"
        :positionLineXList="positionLineXList"
        :positionLineYList="positionLineYList"
        @getPositionLineList="getPositionLineList"
        @addAdsorptionLine="addAdsorptionLine"
      />
    </aside>
    <main>
      <header>
        <div class="mr-10 mb-10">
          <el-button @click="hideRuler">隐藏标尺</el-button>
          <el-button @click="showRuler">显示标尺</el-button>
          <el-button @click="hideAllPositionLine">隐藏定位线</el-button>
          <el-button @click="showAllPositionLine">显示定位线</el-button>
          <el-button @click="removeAllPositionLine">删除定位线</el-button>
          <el-button class="mr-10" @click="handleReset">还原</el-button>
        </div>
        <div class="mb-10 mr-20">
          <span class="text">{{ opt.canScale ? '允许' : '禁止' }}缩放</span>
          <el-switch class="ml-10" v-model="opt.canScale" />
        </div>
        <el-slider
          class="mr-10 mb-10"
          style="width: 150px"
          v-model="opt.scale"
          :disabled="!opt.canScale"
          :format-tooltip="formatScale"
          :min="opt.minScale"
          :max="opt.maxScale"
          :step="0.05"
        />
      </header>
      <ScaleRuler
        id="scale-ruler-container"
        class="container"
        ref="scaleRulerRef"
        v-model:scale="opt.scale"
        :auto-scale="opt.autoScale"
        :can-scale="opt.canScale"
        :canvas-width="opt.canvasWidth"
        :canvas-height="opt.canvasHeight"
        :container-auto-size="true"
        :canvas-style="opt.canvasStyle"
        :position-line-config="opt.positionLineConfig"
        @onMove="handleMove"
        @adsorptionLineChange="adsorptionLineChange"
      >
        <CanvasEdit
          ref="canvasEditRef"
          :scale="opt.scale"
          :positionLineXList="positionLineXList"
          :positionLineYList="positionLineYList"
          @getPositionLineList="getPositionLineList"
          @removeAdsorptionLine="removeAdsorptionLine"
          @addAdsorptionLine="addAdsorptionLine"
        />
      </ScaleRuler>
      <footer>
        <div class="mr-10 mb-10">
          <span class="text">吸附线x:</span>
          <el-input
            class="ml-10"
            ref="inputX"
            style="width: 200px"
            v-model="adsorptionX"
            @blur="handleAdsorptionXInputChange"
          ></el-input>
        </div>
        <div class="mr-10 mb-10">
          <span class="text">吸附线y:</span>
          <el-input
            class="ml-10"
            style="width: 200px"
            v-model="adsorptionY"
            @blur="handleAdsorptionYInputChange"
          ></el-input>
        </div>
      </footer>
    </main>
  </div>
</template>
<script setup lang="ts">
import ScaleRuler from 'scale-ruler-vue3';
// import type { PositionLineConfig } from 'scale-ruler-vue3';
import 'scale-ruler-vue3/lib/index.css';
import ItemBox from '@/components/ItemBox.vue';
import CanvasEdit from '@/components/CanvasEdit.vue';
import type { AnyRecord } from '@/index.d';
const opt = reactive<AnyRecord>({
  canvasWidth: 1920,
  canvasHeight: 1000,
  autoScale: true,
  canScale: true,
  scale: 1,
  minScale: 0.1,
  maxScale: 10,
  positionLineConfig: {
    adsorptionXList: [
      100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
      1500, 1600, 1700, 1800, 1900
    ],
    adsorptionYList: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  canvasStyle: {
    backgroundColor: '#fff'
  },
  useRuler: false
});

const adsorptionX = ref<string>(
  opt.positionLineConfig.adsorptionXList.join(',')
);
const adsorptionY = ref<string>(
  opt.positionLineConfig.adsorptionYList.join(',')
);
const scaleRulerRef = ref<InstanceType<typeof ScaleRuler> | null>(null);

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
function formatScale(value: number) {
  return +(value * 100).toFixed(2) + '%';
}
function handleAdsorptionXInputChange() {
  adsorptionLineCommonChange(adsorptionX.value, false);
}
function handleAdsorptionYInputChange() {
  adsorptionLineCommonChange(adsorptionY.value, true);
}
function adsorptionLineCommonChange(str: string, isY: boolean) {
  const list: number[] = str
    .split(',')
    .filter((item: any) => /^\d+$/.test(item))
    .map(Number);
  // 看是否发生变化
  if (isY) {
    if (opt.positionLineConfig.adsorptionYList.join(',') === list.join(','))
      return;
    opt.positionLineConfig.adsorptionYList = list;
  } else {
    if (opt.positionLineConfig.adsorptionXList.join(',') === list.join(','))
      return;
    opt.positionLineConfig.adsorptionXList = list;
  }
}
function adsorptionLineChange(value: number[], isY: boolean) {
  const key = isY ? 'adsorptionYList' : 'adsorptionXList';
  if (value.join(',') !== opt.positionLineConfig[key].join(',')) {
    opt.positionLineConfig[key] = value;
  }
  if (isY) {
    adsorptionY.value = value.join(',');
  } else {
    adsorptionX.value = value.join(',');
  }
}
function addAdsorptionLine(data: number[], isY: boolean) {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.addAdsorptionLine(data, isY);
  }
}
// 删除吸附线
function removeAdsorptionLine(data: number[], isY: boolean) {
  if (scaleRulerRef.value) {
    scaleRulerRef.value.removeAdsorptionLine(data, isY);
  }
}
/**
 * 移动更新canvas的位置信息
 */
const canvasEditRef = ref<InstanceType<typeof CanvasEdit> | null>(null);
function handleMove() {
  if (canvasEditRef.value) {
    canvasEditRef.value.updateRect();
  }
}

/**
 * 定位线
 */
const positionLineXList = ref<number[]>([]);
const positionLineYList = ref<number[]>([]);
function getPositionLineList() {
  if (scaleRulerRef.value) {
    positionLineXList.value = scaleRulerRef.value.getPositionLineList(false);
    positionLineYList.value = scaleRulerRef.value.getPositionLineList(true);
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
  background: #fff;
  .ml-10 {
    margin-left: 10px;
  }
  .mr-10 {
    margin-right: 10px;
  }
  .mr-20 {
    margin-right: 20px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .left-aside {
    width: 200px;
    height: 100%;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
  header,
  footer {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .text {
      color: var(--el-text-color-regular);
      font-size: var(--el-font-size-base);
      font-weight: var(--el-font-weight-primary);
    }
  }
  header {
    height: 50px;
  }

  .container {
    width: 100%;
    flex: 1;
    min-width: 1000px;
    box-sizing: border-box;
    /* border: 1px solid #ccc; */
  }
}
</style>
