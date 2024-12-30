import { reactive, watch, computed } from 'vue';
import type { RequiredScaleRulerOpt } from '@/type';

/**
 * 吸附线
 */
export const useAdsorption = (opt: RequiredScaleRulerOpt, isY: boolean) => {
  const adsorptionList = reactive<number[]>([0]);
  function modifyAdsorption(num: number, isAdd: boolean = true) {
    const index = adsorptionList.indexOf(num);
    if (isAdd && index === -1) {
      adsorptionList.push(num);
    }
    if (!isAdd && index > -1) {
      adsorptionList.splice(index, 1);
    }
  }

  function modifyAdsorptionList(
    data: number | number[],
    isAdd: boolean = true
  ) {
    if (Array.isArray(data)) {
      data.forEach((num) => modifyAdsorption(num, isAdd));
    } else {
      modifyAdsorption(data, isAdd);
    }
  }
  function addAdsorptionList(data: number | number[]) {
    modifyAdsorptionList(data);
    adsorptionList.sort((a, b) => a - b);
  }
  function removeAdsorptionList(data: number | number[]) {
    modifyAdsorptionList(data, false);
  }

  const originAdsorptionList = computed(
    () => opt.positionLineConfig[isY ? 'adsorptionYList' : 'adsorptionXList']
  );
  /**
   * 吸附线变化
   */
  watch(
    () => originAdsorptionList.value,
    (newVal) => {
      addAdsorptionList(newVal);
    },
    {
      deep: true
    }
  );
  /**
   * 画布尺寸
   */
  const canvasSize = computed((): number =>
    isY ? opt.canvasHeight : opt.canvasWidth
  );
  /**
   * 画布尺寸变化
   */
  watch(
    () => canvasSize.value,
    (newVal, oldVal) => {
      removeAdsorptionList(oldVal);
      addAdsorptionList(newVal);
    }
  );
  return { adsorptionList };
};
