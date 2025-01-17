import type { ComponentItem } from '@/config/index.d';
import type { RectType } from '@/index.d';

export interface ItemType extends ComponentItem {
  left: number;
  top: number;
  x: number;
  y: number;
}

export interface EditStoreType {
  id: number;
  itemList: ItemType[];
  canvasRect: RectType | null;
  itemAdsorptionX: Record<string, number>;
  itemAdsorptionY: Record<string, number>;
}
