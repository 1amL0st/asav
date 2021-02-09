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
    for (let i = 0; i < this.arr.size; i++) {
      for (let j = i + 1; j < this.arr.size; j++) {
        if (await SorterUtils.cmpElements(this, i, j)) {
          await SorterUtils.swapElements(this, i, j);
        }
      }
    }
    this.callback(SorterAction.Finish);
    return;
  }
};
