import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,} from '../Base';
import { LArray } from '../LArray';

export const QuickSorter: ISorterConstrucotr = class QuickSorter
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

  private async partitions(
    leftPointer: number,
    rightPointer: number
  ): Promise<number> {
    const pivotIndex = rightPointer;
    const pivot = this.arr.elements[pivotIndex].value;

    rightPointer -= 1;

    while (true) {
      while (await SorterUtils.ifElementLessThan(this, leftPointer, pivot)) {
        await SorterUtils.pickPairOfElements(this, leftPointer, rightPointer);
        ++leftPointer;
      }

      while (
        rightPointer > 0 &&
        (await SorterUtils.ifElementGreaterThan(this, rightPointer, pivot))
      ) {
        await SorterUtils.pickPairOfElements(this, leftPointer, rightPointer);
        --rightPointer;
      }

      await SorterUtils.pickPairOfElements(this, leftPointer, rightPointer);
      if (leftPointer >= rightPointer) {
        break;
      } else {
        await SorterUtils.swapElements(this, leftPointer, rightPointer);
        ++leftPointer;
      }
    }

    await SorterUtils.pickPairOfElements(this, leftPointer, rightPointer);

    if (leftPointer != pivotIndex) {
      await SorterUtils.swapElements(this, leftPointer, pivotIndex);
    }

    return leftPointer;
  }

  private async quickSort(leftIndex: number, rightIndex: number) {
    if (rightIndex - leftIndex > 0) {
      const pivotIndex = await this.partitions(leftIndex, rightIndex);
      await this.quickSort(leftIndex, pivotIndex - 1);
      await this.quickSort(pivotIndex + 1, rightIndex);
    }
  }

  async sort(): Promise<void> {
    await this.quickSort(0, this.arr.size - 1);
    this.callback(SorterAction.Finish);
    return;
  }
};
