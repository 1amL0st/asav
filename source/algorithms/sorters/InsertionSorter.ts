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
  }

  async sort(): Promise<void> {
    for (let i = 1; i < this.arr.size; i++) {
      let j = i;
      await SorterUtils.pickPairOfElements(this, i, j);
      while (
        j > 0 &&
        (await SorterUtils.cmpElements(this, j - 1, j))
      ) {
        await SorterUtils.swapElements(this, j - 1, j);
        j -= 1;
      }
    }
    this.callback(SorterAction.Finish);
    return;
  }
};
