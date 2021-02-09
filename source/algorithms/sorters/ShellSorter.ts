import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,
  LElement,
  IAlgorithmDescription,} from '../Base';
import { LArray } from '../LArray';

export const ShellSorter: ISorterConstrucotr = class ShellSorter
  implements ISorter {
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
  }

  private async shellSort(n: number): Promise<void> {
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const tmp = this.arr.elements[i];

        let j = i;
        while (
          j >= gap &&
          ((await SorterUtils.cmpElements(this, j - gap, i)) ||
            this.arr.ifElementGreaterThanValue(j - gap, tmp.value))
        ) {
          await SorterUtils.swapElements(this, j - gap, j);
          j -= gap;
        }

        this.arr.elements[j] = tmp;
      }
    }
  }

  async sort(): Promise<void> {
    await this.shellSort(this.arr.size);
    this.callback(SorterAction.Finish);
    return;
  }

  getDescription(): IAlgorithmDescription {
    return {
      name: 'Shell sort',
      best: 'n log n',
      average: 'n^(4/3)',
      worst: 'n^(3/2)',
      memory: '1'
    };
  }
};
