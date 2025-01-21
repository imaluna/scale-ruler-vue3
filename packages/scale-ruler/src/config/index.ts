import type { AnyRecord, RequiredScaleRulerOpt } from '../type';

export const defaultOpt: RequiredScaleRulerOpt = {
  // 画布缩放比例
  scale: 1,
  // 是否允许缩放
  canScale: true,
  // 最大缩放比例
  maxScale: 10,
  // 最小缩放比例
  minScale: 0.1,
  // 初始化是否自动居中
  autoCenter: true,
  // 初始化时是否自动计算画布缩放比例，此时忽略scale
  autoScale: true,
  // 是否自动计算容器的宽高，默认false，为true会监控container宽高变化并重新绘制
  containerAutoSize: false,
  // 容器宽度，containerAutoSize为true后，不取该值
  containerWidth: 1000,
  // 容器高度，containerAutoSize为true后，不取该值
  containerHeight: 500,
  containerXPadding: 800,
  containerYPadding: 800,
  canvasWidth: 1920,
  canvasHeight: 1000,
  // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
  proxyScaleKey: true,
  // 是否展示滚动条
  useScrollBar: true,
  // 是否使用标尺
  useRuler: true,
  // 是否使用定位线
  usePositionLine: true,
  positionLineConfig: {
    lineColor: '#6CC6A7',
    padding: 3,
    // 吸附距离
    adsorptionGap: 4,
    zIndex: 300,
    adsorptionXList: [],
    adsorptionYList: [],
    useRemove: true,
    removeIcon: '',
    removeIconFillColor: '#525252'
  },
  // 画布的样式
  canvasStyle: {},
  // 滚动条配置
  scrollBarConfig: {
    bgColor: '#000000',
    opacity: 0.4,
    zIndex: 500,
    barSize: 8
  },
  // 标尺配置
  rulerConfig: {
    // 垂直标尺的宽度
    yRulerWidth: 20,
    // 水平标尺的高度
    xRulerHeight: 20,
    // 标尺背景色
    // bgColor: '#efefef',
    bgColor: '#f5f5f5',
    // 标尺数值的颜色
    fontColor: '#797B80',
    // 标尺数值的字体大小
    fontSize: 10,
    // 标尺数值的字体
    fontFamily: 'Arial',
    // 标尺刻度线的颜色
    lineColor: '#797B80',
    zIndex: 400
  }
};

export const defaultProps = (function () {
  const res: AnyRecord = {};
  for (const i in defaultOpt) {
    // @ts-ignore
    const value = defaultOpt[i];
    if (typeof value === 'object' && value !== null) {
      res[i] = () => {
        return value;
      };
    } else {
      res[i] = value;
    }
  }
  return res;
})();
