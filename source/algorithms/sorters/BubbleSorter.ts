import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,} from '../Base';
import { LArray } from '../LArray';

export const BubbleSorter: ISorterConstrucotr = class BubbleSorter
  implements ISorter {
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
  }

  async sort(): Promise<void> {
    let swaps = 1;
    while (swaps != 0) {
      swaps = 0;
      for (let i = 0; i < this.arr.size - 1; i++) {
        if (await SorterUtils.cmpElements(this, i, i + 1)) {
          await SorterUtils.swapElements(this, i, i + 1);
          swaps++;
        }
      }
    }
    this.callback(SorterAction.Finish);
    return;
  }
};
