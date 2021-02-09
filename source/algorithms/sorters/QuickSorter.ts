import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,
  IAlgorithmDescription,} from '../Base';
import { LArray } from '../LArray';

export const QuickSorter: ISorterConstrucotr = class QuickSorter
  implements ISorter {
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
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

  getDescription(): IAlgorithmDescription {
    return {
      name: 'Quick sort',
      best: 'n log n',
      average: 'n log n',
      worst: 'n^2',
      memory: 'log n'
    };
  }
};
