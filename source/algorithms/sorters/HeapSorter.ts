import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,
  LElement,} from '../Base';
import { LArray } from '../LArray';

export const HeapSorter: ISorterConstrucotr = class HeapSorter
  implements ISorter {
  i: number;
  j: number;
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
    this.i = 0;
    this.j = 0;
  }

  private async heapify(n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && (await SorterUtils.cmpElements(this, l, largest))) {
      largest = l;
    }

    if (r < n && (await SorterUtils.cmpElements(this, r, largest))) {
      largest = r;
    }

    if (largest != i) {
      await SorterUtils.swapElements(this, largest, i);
      await this.heapify(n, largest);
    }
  }

  async sort(): Promise<void> {
    for (let i = this.arr.size / 2 - 1; i >= 0; i--) {
      await this.heapify(this.arr.size, i);
    }

    for (let i = this.arr.size - 1; i > 0; i--) {
      await SorterUtils.swapElements(this, 0, i);
      await this.heapify(i, 0);
    }

    this.callback(SorterAction.Finish);
    return;
  }
};
