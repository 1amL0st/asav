import { InsertionSorter } from './InsertionSorter';
import { SelectionSorter } from './SelectionSorter';
import { BubbleSorter } from './BubbleSorter';
import { MergeSorter } from './MergeSorter';
import { CountingSorter } from './CountingSorter';
import { ShellSorter } from './ShellSorter';

import { IAlgorithmDescription, ISorter, SorterCallback, SorterParams } from '../Base';
import { LArray } from 'algorithms/LArray';
import { QuickSorter } from './QuickSorter';
import { HeapSorter } from './HeapSorter';

export type S = typeof InsertionSorter | typeof SelectionSorter;

export class SortersPool {
  static getSortersNames(): Array<string> {
    return [
      'Quick sort',
      'Insertion sort',
      'Selection sort',
      'Bubble sort',
      'Merge sort',
      'Counting sort',
      'Heap sort',
      'Shell sort',
    ];
  }

  static getSorterByName(
    sorterName: string,
    params: SorterParams,
    larray: LArray,
    clb: SorterCallback
  ): ISorter {
    switch (sorterName) {
      case 'Shell sort':
        return new ShellSorter(larray, params, clb);
      case 'Heap sort':
        return new HeapSorter(larray, params, clb);
      case 'Counting sort':
        return new CountingSorter(larray, params, clb);
      case 'Merge sort':
        return new MergeSorter(larray, params, clb);
      case 'Insertion sort':
        return new InsertionSorter(larray, params, clb);
      case 'Selection sort':
        return new SelectionSorter(larray, params, clb);
      case 'Quick sort':
        return new QuickSorter(larray, params, clb);
      case 'Bubble sort':
        return new BubbleSorter(larray, params, clb);
      default:
        throw Error('Wrong sort algorithm name!');
    }
  }

  static getSorterDescriptions(): Array<IAlgorithmDescription> {
    const params = new SorterParams();
    const arr = new LArray(0);
    const clb = () => {
      return 0
    }

    return SortersPool.getSortersNames().map((sorterName) => {
      return SortersPool.getSorterByName(sorterName, params, arr, clb).getDescription()
    });
  }
}
