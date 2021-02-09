import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,
  LElement,} from '../Base';
import { LArray } from '../LArray';

export const MergeSorter: ISorterConstrucotr = class MergeSorter
  implements ISorter {
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
  }

  async merge(
    left: Array<LElement>,
    right: Array<LElement>
  ): Promise<Array<LElement>> {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      const leftId = left[leftIndex].id;
      const rightId = right[rightIndex].id;
      await SorterUtils.cmpElementsByIds(this, leftId, rightId);
      await SorterUtils.swapElementsByIds(this, leftId, rightId);
      if (left[leftIndex].value < right[rightIndex].value) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  async mergeSort(unsortedArray: Array<LElement>): Promise<Array<LElement>> {
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    const middle = Math.floor(unsortedArray.length / 2);

    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    return this.merge(await this.mergeSort(left), await this.mergeSort(right));
  }

  async sort(): Promise<void> {
    this.arr.elements = await this.mergeSort(this.arr.elements);
    this.callback(SorterAction.Finish);
    return;
  }
};
