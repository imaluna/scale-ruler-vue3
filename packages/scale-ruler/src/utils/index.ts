import type { AnyRecord } from "@/type";

/**
 * 设置样式
 */
export const setStyles = (styles: AnyRecord, node: HTMLElement) => {
  for(let prop in styles) {
    const value = styles[prop];
    // @ts-ignore
    node.style[prop] = value;
  }
};
