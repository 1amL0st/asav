import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,} from '../Base';
import { LArray } from '../LArray';

export const SelectionSorter: ISorterConstrucotr = class SelectionSorter
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

  async sort(): Promise<void> {
    for (; this.i < this.arr.size; this.i++) {
      for (this.j = this.i + 1; this.j < this.arr.size; this.j++) {
        if (await SorterUtils.cmpElements(this)) {
          await SorterUtils.swapElements(this);
        }
      }
    }
    this.callback(SorterAction.Finish);
    return;
  }
};
