import type { AnyRecord } from '@/type';

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
