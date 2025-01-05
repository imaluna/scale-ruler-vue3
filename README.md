# scale-ruler-vue3

A vue3 public component, an excellent assistant for building a low-code platform. It supports free movement and scaling of the canvas within the area, and includes ruler, positioning line and adsorption line functions.

[中文](https://github.com/imaluna/scale-ruler-vue3/blob/main/README-zh_cn.md)

[demo]()

## Features

- vue3 components API
- Support typescript
- Supports shortcut key zoom(e.g. use  ctrl + '+' and ctrl + '-' to zoom) and mouse zoom
- Supports free movement and scroll bar movement
- Easy and fast access

## Installation

### node

```shell
npm install scale-ruler-vue3 --save
or
yarn add scale-ruler-vue3
# or
pnpm add scale-ruler-vue3
# or
bun add scale-ruler-vue3
```

## Quick Start

```html
<template>
  <ScaleRuler
    ref="scaleRulerRef"
    v-model:scale="opt.scale"
    :auto-scale="opt.autoScale"
    :canvas-width="opt.canvasWidth"
    :canvas-height="opt.canvasHeight"
    :container-auto-size="true"
    :canvas-style="opt.canvasStyle"
  ></ScaleRuler>
</template>

<script setup>
import {reactive} from 'vue';
import ScaleRuler from 'scale-ruler-vue3';
const opt = reactive({
  canvasWidth: 1920,
  canvasHeight: 1000,
  autoScale: true,
  scale: 1,
  canvasStyle: {
    backgroundColor: '#ccc'
  }
});
</script>
```

## Attributes

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| scale/v-model:model	| 画布的缩放比例 | Number | 1| autoScale为true时，scale初始值不生效 |
| minScale	| 画布缩放比例最小值 | Number | 0.1 ||
| maxScale	| 画布缩放比例最大值 | Number | 10 ||
| autoScale	| 初始化时是否自动计算画布缩放比例 | Boolean | true ||
| canScale	| 是否允许缩放 | Boolean | true ||
| autoCenter	| 初始化时是是否自动居中 | Boolean | true ||
| containerAutoSize	| 是否自动计算容器的宽高 | Boolean | true |为true会监控container宽高变化并重新画布和标尺|
| containerWidth	| 容器宽度 | Number | 1000 |containerAutoSize为true时该值不生效|
| containerHeight	| 容器高度 | Number | 500 |containerAutoSize为true时该值不生效|
| containerXPadding	| x方向/水平方向容器与画布之间的左右间距 | Number | 80 ||
| containerYPadding	| y方向/垂直方向容器与画布之间的上下间距 | Number | 80 ||
| canvasWidth	| 画布宽度 | Number | 1920 ||
| canvasHeight	| 画布高度 | Number | 1000 ||
| canvasStyle	| 画布样式 | Object | {} ||
| proxyScaleKey	| 是否代理快捷键缩放 | Boolean | true |代理ctrl+ "+" 和 ctrl + "-"，可以放大、缩小画布|
| useScrollBar	| 是否使用滚动条 | Boolean | true ||
| scrollBarConfig	| 滚动条配置 | Object | {} | see scrollBarConfig params|
| useRuler	| 是否使用标尺 | Boolean | true ||
| rulerConfig	| 标尺配置 | Object | {} |see rulerConfig params|
| usePositionLine	| 是否使用定位线 | Boolean | true ||
| positionLineConfig	| 定位线配置 | Object | {} |see positionLineConfig params|
| onScale	| 缩放回调 | Function(scale) | - ||
| onMove	| 移动回调 | Function(translateX, translateY) | - ||


### scrollBarConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| bgColor	| 背景色 | String | #000000| |
| opacity	| 透明度 | Number | 0.4| |
| zIndex	| 滚动条堆叠顺序 | Number | 500| |
| size	| 水平滚动条的高度或垂直滚动条的宽度 | Number | 8| |

### rulerConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| xRulerHeight	| x/水平标尺的高度 | Number | 30|不要超过containerYPadding |
| yRulerWidth	| y/垂直标尺的宽度 | Number | 30|不要超过containerXPadding |
| bgColor	| 背景色 | String | #efefef| |
| fontColor	| 标尺数值的颜色 | String | #000000| |
| fontSize	| 标尺数值的字体大小 | Number | 12| |
| fontFamily	| 标尺数值的字体 |String | Arial| |
| lineColor	| 标尺刻度颜色 |String | #000000| |
| zIndex	| 标尺堆叠顺序 | Number | 400| |

### positionLineConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| lineColor	| 定位线的颜色 | String | #24aa61| |
| padding	| 定位线操作上下间距 | Number | 3| |
| adsorptionXList	| x/水平方向吸附线 |Array<Number> | [0, canvasWidth]| |
| adsorptionYList	| y/垂直方向吸附线 |Array<Number> | [0, canvasHeight]| |
| adsorptionGap	| 吸附距离 | Number | 4| |
| zIndex	| 堆叠顺序 | Number | 300| |


## Methods

| Methods Name	 | Description | Parameters
| --- | --- | --- |
| reset	| 还原画布 | - | 
| changeScale	| 改变缩放比例 | (scale:number 缩放比例) | 
| removeAllPositionLine	| 删除所有定位线 | - | 
| showRuler	| 显示标尺 | - | 
| hideRuler	| 隐藏标尺 | - | 
| showAllPositionLine	| 显示所有定位线 | - | 
| hideAllPositionLine	| 隐藏所有定位线 | - | 
| addAdsorptionLine	| 增加吸附线 | (data: number | Array<number> 吸附线的值，可为数组或数值, isY: boolean 是否为y/垂直方向吸附线) | 
| removeAdsorptionLine	| 删除吸附线 | (data: number | Array<number> 吸附线的值，可为数组或数值, isY: boolean 是否为y/垂直方向吸附线) | 





