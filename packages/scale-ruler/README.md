# scale-ruler-vue3

A vue3 public component, an excellent assistant for building a low-code platform. It supports free movement and scaling of the canvas within the area, and includes ruler, positioning line and adsorption line functions.

[中文](https://github.com/imaluna/scale-ruler-vue3/blob/main/README-zh_cn.md)

[demo]()

## Features

- vue3 components API
- Support typescript
- Supports shortcut key zoom(e.g. use  ctrl + '+' and ctrl + '-' to zoom) , mouse zoom and touchpad dual finger pinch zoom
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
| scale/v-model:model	| Scale ratio of canvas | Number | 1| If <code>autoScale</code> is true，The initial value of <code>scale</code> does not take effect |
| minScale	| The minimum value of scale ratio of canvas | Number | 0.1 ||
| maxScale	| The maximum value of scale ratio of canvas  | Number | 10 ||
| autoScale	| Whether to automatically calculate the scale ratio of canvas during initialization | Boolean | true ||
| canScale	| Whether scaling is allowed or not | Boolean | true ||
| autoCenter	| Whether to automatically center the canvas during initialization| Boolean | true ||
| containerAutoSize	| Whether to automatically calculate the width and height of the container | Boolean | true |If true, it will monitor the changes of container width and height and repaint the canvas and ruler|
| containerWidth	| Container width | Number | 1000 |containerAutoSize为true时该值不生效|
| containerHeight	| Container height | Number | 500 |containerAutoSize为true时该值不生效|
| containerXPadding	| The left and right padding between the container and the canvas in the x-direction/horizontal direction | Number | 80 ||
| containerYPadding	| The top and bottom padding between the container and the canvas in the y-direction/vertical direction  | Number | 80 ||
| canvasWidth	| Canvas width | Number | 1920 ||
| canvasHeight	| Canvas height | Number | 1000 ||
| canvasStyle	| The style of canvas | Object | {} ||
| proxyScaleKey	| Whether to proxy the shortcut key zoom function or not | Boolean | true | proxy ctrl+ "+" to  zoom in  and ctrl + "-" to zoom out|
| useScrollBar	| Whether to use scrollbar | Boolean | true ||
| scrollBarConfig	| The config of scrollbar | Object | {} | see scrollBarConfig params|
| useRuler	| Whether to use ruler | Boolean | true ||
| rulerConfig	| The config of ruler | Object | {} |see rulerConfig params|
| usePositionLine	| Whether to use position line | Boolean | true ||
| positionLineConfig	| The config of position line | Object | {} |see positionLineConfig params|



### scrollBarConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| bgColor	| background color | String | #000000| |
| opacity	| opacity | Number | 0.4| |
| zIndex	| zIndex | Number | 500| |
| size	| The height of horizontal scrollbar and the width of vertical scrollbar | Number | 8| |

### rulerConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| xRulerHeight	| The height of x/horizontal ruler | Number | 30|Do not bigger than the <code>containerYPadding</code> |
| yRulerWidth	| The width of y/vertical ruler | Number | 30|Do not bigger than <code>containerXPadding</code> |
| bgColor	| Background color of ruler | String | #efefef| |
| fontColor	| The color of number in ruler | String | #000000| |
| fontSize	| The font size of number in ruler | Number | 12| |
| fontFamily	| The font family of number in ruler |String | Arial| |
| lineColor	| The line color of ruler |String | #000000| |
| zIndex	| zIndex | Number | 400| |

### positionLineConfig params

| Attribute | Description | Type | Default | Remark
| --- | --- | --- | --- |--- |
| lineColor	| The color of position line | String | #24aa61| |
| padding	| The padding of operation  | Number | 3| |
| adsorptionXList	| The list of adsorption in x/horizontal direction |Array<Number> | [0, canvasWidth]| |
| adsorptionYList	| The list of adsorption in y/vertical direction |Array<Number> | [0, canvasHeight]| |
| adsorptionGap	| The gap to adsorb | Number | 4| |
| zIndex	| zIndex | Number | 300| |

## Events

| Methods Name	 | Description | Parameters
| --- | --- | --- |
| onScale	| triggers when scaling the canvas | scale | 
| onMove	| triggers when moving the canvas | translateX, translateY |

## Methods

| Methods Name	 | Description | Parameters
| --- | --- | --- |
| reset	| reset the canvas | - | 
| changeScale	| change the scale ratio of canvas | (scale:number 缩放比例) | 
| removeAllPositionLine	| remove all the position line(s) | - | 
| showRuler	| show rulers | - | 
| hideRuler	| hide rulers | - | 
| showAllPositionLine	| show all the position line(s)   | - | 
| hideAllPositionLine	| hide all the position line(s) | - | 
| addAdsorptionLine	| add adsorption line(s) | (data: number \| Array<number>- the value of adsorption line, isY: boolean -Whether it is in the y/vertical direction) | 
| removeAdsorptionLine	| remove adsorption line(s)  | (data: number \| Array<number>- the value of adsorption line, isY: boolean -Whether it is in the y/vertical direction)| 





