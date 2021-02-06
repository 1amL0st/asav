import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,} from '../Base';
import { LArray } from '../LArray';

export const InsertionSorter: ISorterConstrucotr = class InsertionSorter
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
    for (this.i = 1; this.i < this.arr.size; this.i++) {
      this.j = this.i;
      await SorterUtils.pickPairOfElements(this);
      while (
        this.j > 0 &&
        (await SorterUtils.cmpElements(this, this.j - 1, this.j))
      ) {
        await SorterUtils.swapElements(this, this.j - 1, this.j);
        this.j -= 1;
      }
    }
    this.callback(SorterAction.Finish);
    return;
  }
};
