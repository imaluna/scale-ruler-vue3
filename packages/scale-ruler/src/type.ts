export interface ScaleRulerOption {
  scale?: number;
  minScale?: number;
  maxScale?: number;
  canScale?: boolean;
  autoCenter?: boolean;
  autoScale?: boolean;
  containerAutoSize?: boolean;
  containerWidth?: number;
  containerHeight?: number;
  containerXPadding?: number;
  containerYPadding?: number;
  canvasWidth: number;
  canvasHeight: number;
  proxyScaleKey?: boolean;
  useScrollBar?: boolean;
  useRuler?: boolean;
  usePositionLine?: boolean;
  positionLineConfig?: PositionLineConfig;
  canvasStyle?: AnyRecord;
  scrollBarConfig?: ScrollBarConfig;
  rulerConfig?: RulerConfig;
  adsorptionXList?: number[];
  adsorptionYList?: number[];
}
export interface PositionLineConfig {
  lineColor?: string;
  padding?: number;
  // 吸附距离
  adsorptionGap?: number;
  zIndex?: number;
  // adsorptionXList?: number[];
  // adsorptionYList?: number[];
}
export interface ScrollBarConfig {
  bgColor?: string;
  opacity?: number;
  barSize?: number;
  zIndex?: number;
}
export interface RulerConfig {
  // x轴-水平标尺的高度
  xRulerHeight?: number;
  // Y轴-垂直标尺的宽度
  yRulerWidth?: number;
  // 标尺背景色
  bgColor?: string;
  // 标尺数值的颜色
  fontColor?: string;
  // 标尺数值的字体大小
  fontSize?: number;
  // 标尺数值的字体
  fontFamily?: string;
  // 标尺刻度线的颜色
  lineColor?: string;
  zIndex?: number;
}
export interface AnyRecord {
  [key: string]: any;
}

/**
 * 容器信息
 */
export interface ContainerInfo extends AnyRecord {
  originWidth?: number;
  originHeight?: number;
  hasAddResize?: boolean;
  position?: string;
  width?: number;
  height?: number;
}
/**
 * 画布移动配置
 */
export interface TransformInfo {
  scale?: number;
  translateX?: number;
  translateY?: number;
}
/**
 * 移动边界信息
 */
export interface BoundaryInfo {
  minTranslateX?: number;
  maxTranslateX?: number;
  minTranslateY?: number;
  maxTranslateY?: number;
}

/**
 * 滚动条信息
 */
export interface ScrollBarInfo extends AnyRecord {
  totalWidth?: number;
  totalHeight?: number;
  isXLarge?: boolean;
  isYLarge?: boolean;
  isLarge?: boolean;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}
export interface RulerInfo extends AnyRecord {}
export interface RequiredScaleRulerOpt extends Required<ScaleRulerOption> {
  positionLineConfig: Required<PositionLineConfig>;
  scrollBarConfig: Required<ScrollBarConfig>;
  rulerConfig: Required<RulerConfig>;
}
export type RequiredContainerInfo = Required<ContainerInfo>;
export type RequiredScrollBarInfo = Required<ScrollBarInfo>;
