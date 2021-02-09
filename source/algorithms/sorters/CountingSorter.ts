import {ISorterConstrucotr,
  ISorter,
  SorterCallback,
  SorterAction,
  SorterParams,
  SorterUtils,
  LElement,
  IAlgorithmDescription,} from '../Base';
import { LArray } from '../LArray';

export const CountingSorter: ISorterConstrucotr = class CountingSorter
  implements ISorter {
  arr: LArray;

  callback: SorterCallback;
  params: SorterParams;

  constructor(arr: LArray, params: SorterParams, clb: SorterCallback) {
    this.callback = clb;
    this.arr = arr;
    this.params = params;
  }

  /*
    TODO: Poor visualization...
  */
  async sort(): Promise<void> {
    const counters = new Array<LElement[]>(this.arr.size);
    counters.fill(null, 0, this.arr.size);

    for (let i = 0; i < this.arr.size; ++i) {
      await SorterUtils.pickElements(this, [i]);
      this.callback(SorterAction.Pick);

      const el = this.arr.elements[i];
      const subArr = counters[el.value - 1];
      if (subArr === null) {
        counters[el.value - 1] = new Array<LElement>();
      }
      counters[el.value - 1].push(new LElement(el.value, el.id, el.color));
    }

    const elements = new Array<LElement>();
    for (let i = 0; i < this.arr.size; ++i) {
      const subArr = counters[i];
      if (subArr !== null) {
        subArr.forEach((el) => elements.push(el));
      }
    }

    this.arr.elements = elements;

    this.callback(SorterAction.Finish);
    return;
  }

  getDescription(): IAlgorithmDescription {
    return {
      name: 'Counting sort',
      best: 'n + r',
      average: 'n + r',
      worst: 'n + r',
      memory: 'n + r'
    };
  }
};
