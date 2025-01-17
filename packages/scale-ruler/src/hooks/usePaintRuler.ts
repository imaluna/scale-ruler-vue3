import { nextTick } from 'vue';
import type { Ref } from 'vue';
import type { RequiredScaleRulerOpt, TransformInfo } from '@/type';
import { getGridSize } from '@/utils';
export const usePaintRuler = (
  opt: RequiredScaleRulerOpt,
  transform: TransformInfo,
  isY: boolean,
  rulerRef: Ref
) => {
  nextTick(() => {
    const node = rulerRef.value;
    if (node) {
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      const { rulerConfig } = opt;
      const { bgColor, fontFamily, fontSize, lineColor, fontColor } =
        rulerConfig;
      if (width > 0 && height > 0) {
        const ctx = node.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        // 填充
        if (bgColor) {
          ctx.save();
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
        const padding = isY
          ? rulerConfig.yRulerWidth
          : rulerConfig.xRulerHeight;
        const { translateX, translateY, scale } =
          transform as Required<TransformInfo>;
        const translate = isY ? translateY : translateX;
        const gridSize = getGridSize(scale);
        const gridPixel = gridSize * scale;
        const ratio = window.devicePixelRatio;
        const distance = -translate;
        const startValue = Math.floor(distance / gridPixel);
        const endValue = Math.floor(
          ((isY ? height : width) - translate) / gridPixel
        );
        ctx.save();
        ctx.fillStyle = lineColor;
        ctx.font = `${fontSize * ratio}px ${fontFamily}`;
        ctx.translate(0.5, 0.5);
        ctx.scale(1 / ratio, 1 / ratio);
        if (isY) {
          ctx.fillRect((padding - 1) * ratio, 0, 1, height * ratio);
        } else {
          ctx.fillRect(0, (padding - 1) * ratio, width * ratio, 1);
        }
        for (let i = startValue; i <= endValue; i++) {
          ctx.fillStyle = lineColor;
          const x = (translate + i * gridPixel) * ratio;
          let gap = padding / 4;
          if (i % 10 === 0) {
            gap = (padding * 4) / 5;
          } else if (i % 5 === 0) {
            gap = padding / 3;
          }
          if (isY) {
            ctx.fillRect((padding - gap) * ratio, x, gap * ratio, 1);
          } else {
            ctx.fillRect(x, (padding - gap) * ratio, 1, gap * ratio);
            if (i % 10 === 0) {
              ctx.fillStyle = fontColor;
              ctx.fillText(
                String(i * gridSize),
                x + 2 * ratio,
                (padding + 8 - gap) * ratio
              );
            }
          }
        }
        ctx.restore();
        if (isY) {
          ctx.font = `${fontSize}px ${fontFamily}`;
          ctx.fillStyle = lineColor;
          let i = startValue;
          while (i <= endValue) {
            if (i % 10) {
              i++;
            } else {
              ctx.save();
              const y = translate + i * gridPixel + padding / 2;
              ctx.translate(y + padding / 5, y - (padding * 6) / 5);
              ctx.rotate(Math.PI / 2);
              ctx.fillText(String(i * gridSize), (padding * 4) / 5, y);
              i += 10;
              ctx.restore();
            }
          }
        }
      }
    }
  });
};
