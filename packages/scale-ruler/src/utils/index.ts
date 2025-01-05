import type { AnyRecord, TransformInfo } from '@/type';

/**
 * 设置样式
 */
export const setStyles = (styles: AnyRecord, node: HTMLElement) => {
  for (let prop in styles) {
    const value = styles[prop];
    // @ts-ignore
    node.style[prop] = value;
  }
};

export const getGridSize = (scale: number) => {
  if (scale <= 0.25) return 40;
  if (scale <= 0.5) return 20;
  if (scale <= 1) return 10;
  if (scale <= 2) return 5;
  if (scale <= 4) return 2;
  return 1;
};

// 获取元素的offsetTop和offsetLeft
export const getOffset = (node: HTMLElement) => {
  const rect = node.getBoundingClientRect();
  const top =
    rect.top + (document.body.scrollTop || document.documentElement.scrollTop);
  const left =
    rect.left +
    (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top, left };
};
/**
 * 定位线的位移转换为坐标
 */
export const translateToCoordinate = (
  transformInfo: TransformInfo,
  translate: number,
  isY: boolean
) => {
  const { scale, translateX, translateY } =
    transformInfo as Required<TransformInfo>;
  const distance = translate - (isY ? translateY : translateX);
  return distance / scale;
};
/**
 * 定位线的坐标转换为位移
 */
export const coordinateToTranslate = (
  transformInfo: TransformInfo,
  coordinate: number,
  isY: boolean
) => {
  const { scale, translateX, translateY } =
    transformInfo as Required<TransformInfo>;
  const distance = coordinate * scale;
  return (isY ? translateY : translateX) + distance;
};
/**
 * 检查吸附线
 */
export function checkAdSorptionLine(
  adsorptionList: number[],
  transformInfo: TransformInfo,
  adsorptionGap: number,
  translate: number,
  coordinate: number,
  isY: boolean
) {
  const res: AnyRecord = { coordinate, translate };
  const len = adsorptionList.length;
  if (len > 0) {
    let start = 0;
    while (start < len) {
      const value = adsorptionList[start];
      if (Math.abs(coordinate - value) <= adsorptionGap) {
        // 可以吸附
        res.coordinate = value;
        res.translate = coordinateToTranslate(transformInfo, value, isY);
        break;
      } else {
        if (value > coordinate) {
          break;
        }
      }
      start++;
    }
  }
  return res;
}
