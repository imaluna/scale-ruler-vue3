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
  onScale?: (scale: number) => void;
  onMove?: (translateX: number, translateY: number) => void;
}
export interface PositionLineConfig {
  lineColor: string;
  padding: number;
  adsorptionXList: number[];
  adsorptionYList: number[];
  // 吸附距离
  adsorptionGap: number;
}
export interface ScrollBarConfig {
  bgColor: string;
  opacity: number;
}
export interface RulerConfig {
  // x轴-水平标尺的高度
  xRulerHeight: number;
  // Y轴-垂直标尺的宽度
  yRulerWidth: number;
  // 标尺背景色
  bgColor: string;
  // 标尺数值的颜色
  fontColor: string;
  // 标尺数值的字体大小
  fontSize: number;
  // 标尺数值的字体
  fontFamily: string;
  // 标尺刻度线的颜色
  lineColor: string;
}
export interface AnyRecord {
  [key: string]: any;
}

export interface ContainerInfo extends AnyRecord {
  originWidth?: number;
  originHeight?: number;
  hasAddResize?: boolean;
  position?: string;
  width?: number;
  height?: number;
}
export type RequiredScaleRulerOpt = Required<ScaleRulerOption>;