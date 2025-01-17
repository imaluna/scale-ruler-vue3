import { defineStore } from 'pinia';
import type { EditStoreType, ItemType } from './useEditStore.d';
import type { RectType } from '@/index.d';

export const useEditStore = defineStore('useEditStore', {
  state: (): EditStoreType => {
    return {
      id: 1,
      itemList: [],
      canvasRect: null,
      itemAdsorptionX: {},
      itemAdsorptionY: {}
    };
  },
  getters: {
    getItemList(): EditStoreType['itemList'] {
      return this.itemList;
    },
    getId(): number {
      return this.id;
    },
    getCanvasReact(): EditStoreType['canvasRect'] {
      return this.canvasRect;
    },
    getItemAdsorptionX(): EditStoreType['itemAdsorptionX'] {
      return this.itemAdsorptionX;
    },
    getItemAdsorptionY(): EditStoreType['itemAdsorptionY'] {
      return this.itemAdsorptionY;
    }
  },
  actions: {
    addItem(item: ItemType): void {
      this.itemList.push(item);
      this.id++;
    },
    removeItem(id: number): void {
      const index = this.itemList.findIndex((item) => item.id === id);
      if (index > -1) {
        this.itemList.splice(index, 1);
      }
    },
    setCanvasRect(rect: RectType): void {
      this.canvasRect = rect;
    },
    setItemAdsorption(data: number[], isY: boolean) {
      data.forEach((num: number) => {
        const map = isY ? this.itemAdsorptionY : this.itemAdsorptionX;
        let count = map[num] || 0;
        count++;
        map[num] = count;
      });
    },
    // 返回需要删除的
    removeItemAdsorption(data: number[], isY: boolean): number[] {
      const res: number[] = [];
      data.forEach((num: number) => {
        const map = isY ? this.itemAdsorptionY : this.itemAdsorptionX;
        let count = map[num] || 0;
        count--;
        if (count <= 0) {
          delete map[num];
          res.push(num);
        } else {
          map[num] = count;
        }
      });
      return res;
    }
  }
});
