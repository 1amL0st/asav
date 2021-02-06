import { InsertionSorter } from './InsertionSorter';
import { SelectionSorter } from './SelectionSorter';
import { BubbleSorter } from './BubbleSorter';
import { MergeSorter } from './MergeSorter';
import { CountingSorter } from './CountingSorter';

import { ISorter, SorterCallback, SorterParams } from '../Base';
import { LArray } from 'algorithms/LArray';
import { QuickSorter } from './QuickSorter';

export type S = typeof InsertionSorter | typeof SelectionSorter;

export class SortersPool {
  static getSortersNames(): Array<string> {
    return [
      'Quick sort',
      'Insertion sort',
      'Selection sort',
      'Buble sort',
      'Merge sort',
      'Counting sort'
    ];
  }

  static getSorterByName(
    params: SorterParams,
    sorterName: string,
    larray: LArray,
    clb: SorterCallback
  ): ISorter {
    switch (sorterName) {
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
      case 'Buble sort':
        return new BubbleSorter(larray, params, clb);
      default:
        throw Error('Wrong sort algorithm name!');
    }
  }
}
