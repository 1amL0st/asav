import { LArray } from './LArray';

export enum SorterAction {
  Compare,
  ArrMutation,
  Pick,
  Swap,
  Finish,
}

export type SorterCallback = (s: SorterAction) => void;

export interface ISorterConstrucotr {
  new (arr: LArray, params: SorterParams, clb: SorterCallback): ISorter;
}

export interface ISorter {
  params: SorterParams;
  callback: SorterCallback;

  arr: LArray;

  i: number;
  j: number;

  sort(): Promise<void>;
}

export class LElement {
  value: number;
  id: number;
  color: string;

  constructor(value: number, id: number, color = 'yellow') {
    this.color = color;
    this.value = value;
    this.id = id;
  }
}

export class SorterParams {
  constructor(
    public delay: number = 30,
    public iterColor: string = 'red',
    public swapColor: string = 'purple',
    public defaoltColor: string = 'yellow'
  ) {}
}

export class SorterUtils {
  static async pickPairOfElements(
    sorter: ISorter,
    first: number = sorter.i,
    second: number = sorter.j
  ): Promise<void> {
    return await sorter.arr.highlightElements(
      [first, second],
      'red',
      'yellow',
      sorter.params.delay,
      () => sorter.callback(SorterAction.ArrMutation)
    );
  }

  static async pickElements(
    sorter: ISorter,
    indices: Array<number>
  ): Promise<void> {
    return await sorter.arr.highlightElements(
      indices,
      'red',
      'yellow',
      sorter.params.delay,
      () => sorter.callback(SorterAction.ArrMutation)
    );
  }

  static async swapWithoutComparison(
    sorter: ISorter,
    first: number = sorter.i,
    second: number = sorter.j
  ): Promise<void> {
    sorter.callback(SorterAction.Swap);
    await sorter.arr.swapElements(first, second);
  }

  static async swapElements(
    sorter: ISorter,
    first: number = sorter.i,
    second: number = sorter.j
  ): Promise<void> {
    sorter.callback(SorterAction.Swap);
    return await sorter.arr.swapWithHighlight(
      first,
      second,
      sorter.params.delay,
      () => sorter.callback(SorterAction.ArrMutation)
    );
  }

  static async cmpElements(
    sorter: ISorter,
    first: number = sorter.i,
    second: number = sorter.j
  ): Promise<boolean> {
    sorter.callback(SorterAction.Compare);
    await SorterUtils.pickPairOfElements(sorter, first, second);
    return sorter.arr.ifAnElementGreater(first, second);
  }

  static async ifElementGreaterThan(
    sorter: ISorter,
    elementIndex: number,
    value: number
  ): Promise<boolean> {
    sorter.callback(SorterAction.Compare);
    return sorter.arr.ifElementGreaterThanValue(elementIndex, value);
  }

  static async ifElementLessThan(
    sorter: ISorter,
    elementIndex: number,
    value: number
  ): Promise<boolean> {
    sorter.callback(SorterAction.Compare);
    return sorter.arr.ifElementLessThanValue(elementIndex, value);
  }

  static async cmpElementsByIds(
    sorter: ISorter,
    firstId: number,
    secondId: number
  ): Promise<void> {
    sorter.callback(SorterAction.Compare);
    const firstIndex = sorter.arr.elements.findIndex((e) => e.id === firstId);
    const secondIndex = sorter.arr.elements.findIndex((e) => e.id === secondId);
    await SorterUtils.pickPairOfElements(sorter, firstIndex, secondIndex);
  }

  static async swapElementsByIds(
    sorter: ISorter,
    firstId: number,
    secondId: number
  ): Promise<void> {
    sorter.callback(SorterAction.Compare);
    const firstIndex = sorter.arr.elements.findIndex((e) => e.id === firstId);
    const secondIndex = sorter.arr.elements.findIndex((e) => e.id === secondId);
    await SorterUtils.swapElements(sorter, firstIndex, secondIndex);
    sorter.callback(SorterAction.ArrMutation);
  }
}

export type Elements = Array<LElement>;
