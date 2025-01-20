import { reactive, watch, computed } from 'vue';
import type { RequiredScaleRulerOpt } from '@/type';
import type { Ref } from 'vue';
import { sortByAsc } from '@/utils';
/**
 * 吸附线
 */
export const useAdsorption = (
  opt: Ref<RequiredScaleRulerOpt>,
  isY: boolean,
  updateList: (value: number[]) => void
) => {
  const originList = computed(() =>
    sortByAsc(
      opt.value.positionLineConfig[isY ? 'adsorptionYList' : 'adsorptionXList']
    )
  );
  const adsorptionList = reactive<number[]>(originList.value);
  addAdsorptionList(0);
  function modifyAdsorption(num: number, isAdd: boolean = true) {
    const index = adsorptionList.indexOf(num);
    if (isAdd && index === -1) {
      adsorptionList.push(num);
    }
    if (!isAdd && index > -1) {
      adsorptionList.splice(index, 1);
    }
    if (isAdd) {
      sortByAsc(adsorptionList);
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
    updateList(adsorptionList);
  }
  function addAdsorptionList(data: number | number[]) {
    modifyAdsorptionList(data);
  }
  function removeAdsorptionList(data: number | number[]) {
    modifyAdsorptionList(data, false);
  }
  watch(
    () => originList.value,
    (newVal, oldVal) => {
      sortByAsc(newVal);
      if (newVal.join(',') === sortByAsc(adsorptionList).join(',')) {
        return;
      }
      if (oldVal?.length > 0) {
        removeAdsorptionList(oldVal);
      }
      addAdsorptionList(newVal);
    }
  );
  /**
   * 画布尺寸
   */
  const canvasSize = computed((): number =>
    !isY ? opt.value.canvasWidth : opt.value.canvasHeight
  );
  /**
   * 画布尺寸变化
   */
  watch(
    () => canvasSize.value,
    (newVal, oldVal) => {
      if (oldVal !== undefined) {
        removeAdsorptionList(oldVal);
      }
      addAdsorptionList(newVal);
    },
    {
      immediate: true
    }
  );
  return { adsorptionList, modifyAdsorptionList };
};
