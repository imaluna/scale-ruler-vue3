/**
 * @function 鼠标移动事件处理
 * @param node 监听移动事件的元素
 * @param mousedownEvent 鼠标按下回调
 * @param mousemoveEvent  鼠标移动回调
 * @param mouseupEvent 鼠标松开回调
 */
export function bindMouseMove(
  node: HTMLElement,
  mousedownEvent: (e: MouseEvent) => void,
  mousemoveEvent: (e: MouseEvent) => void,
  mouseupEvent: (e: MouseEvent) => void
) {
  if (!node) return;
  function newMouseMoveEvent(e: MouseEvent) {
    e.preventDefault();
    if (typeof mousemoveEvent === 'function') {
      mousemoveEvent(e);
    }
  }
  node.addEventListener('mousedown', (e: MouseEvent) => {
    // 左键按下
    if (e.button === 0) {
      e.preventDefault();
      if (typeof mousedownEvent === 'function') {
        mousedownEvent(e);
      }
      document.addEventListener('mousemove', newMouseMoveEvent);
    }
  });
  document.addEventListener('mouseup', (e: MouseEvent) => {
    document.removeEventListener('mousemove', newMouseMoveEvent);
    if (typeof mouseupEvent === 'function') {
      mouseupEvent(e);
    }
  });
}
