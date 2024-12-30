import { reactive, watch, computed, ref, onMounted } from 'vue';
import type { RequiredScaleRulerOpt, TransformInfo, AnyRecord } from '@/type';
import type { Reactive, Ref } from 'vue';
import { getOffset } from '@/utils';
export const translateToCoordinate = (
  translate: number,
  transformInfo: TransformInfo,
  isY: boolean
) => {
  const { scale, translateX, translateY } =
    transformInfo as Required<TransformInfo>;
  const distance = translate - (isY ? translateY : translateX);
  return distance / scale;
};

export const coordinateToTranslate = (
  coordinate: number,
  transformInfo: TransformInfo,
  isY: boolean
) => {
  const { scale, translateX, translateY } =
    transformInfo as Required<TransformInfo>;
  const distance = coordinate * scale;
  return (isY ? translateY : translateX) + distance;
};

export function checkAdSorptionLine(
  list: number[],
  transformInfo: TransformInfo,
  adsorptionGap: number,
  translate: number,
  coordinate: number,
  isY: boolean
) {
  const res: AnyRecord = { coordinate, translate };
  const len = list.length;
  if (len > 0) {
    let start = 0;
    while (start < len) {
      const value = list[start];
      if (Math.abs(coordinate - value) <= adsorptionGap) {
        // 可以吸附
        res.coordinate = value;
        res.translate = coordinateToTranslate(value, transformInfo, isY);
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

export const useAddPositionLine = (
  opt: RequiredScaleRulerOpt,
  adsorptionList: Reactive<number[]>,
  transformInfo: TransformInfo,
  isY: boolean,
  rulerRef: Ref
) => {
  let lineId: number = 1;
  const positionLineMap = reactive<AnyRecord>({});
  let currentLine: AnyRecord = {};
  let isMouseDown = false;
  function positionMoveEvent(e: MouseEvent) {
    if (isMouseDown && currentLine.id) {
      const move = isY ? e.pageY : e.pageX - currentLine.start;
      const translate = currentLine.translate + move;
      const coordinate = translateToCoordinate(translate, transformInfo, isY);
      const checkInfo = checkAdSorptionLine(
        adsorptionList,
        transformInfo,
        opt.positionLineConfig.adsorptionGap,
        translate,
        coordinate,
        isY
      );
      Object.assign(currentLine, checkInfo);
      positionLineMap[currentLine.id] = currentLine;
    }
  }

  onMounted(() => {
    if (rulerRef.value) {
      const node = rulerRef.value as HTMLElement;
      node.addEventListener('mousedown', (e: MouseEvent) => {
        const rulerOffset = getOffset(node);
        const start = isY ? e.pageY : e.pageX;
        const translate = start - (isY ? rulerOffset.top : rulerOffset.left);
        const lineInfo: AnyRecord = {
          translate,
          start,
          id: lineId,
          coordinate: translateToCoordinate(translate, transformInfo, isY)
        };
        currentLine = lineInfo;
        positionLineMap[lineId++] = lineInfo;
        isMouseDown = true;
        document.addEventListener('mousemove', positionMoveEvent);
      });
      //todo 是否删除定位线
      document.addEventListener('mouseup', (e: MouseEvent) => {
        document.removeEventListener('mousemove', positionMoveEvent);
        if (!isMouseDown) return;
        isMouseDown = false;
        currentLine = {};
      });
    }
  });
  return { positionLineMap };
};
