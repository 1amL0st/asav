import {ActionType,
  ACTION_TYPE_RESET_SORTED_ELEMENTS,
  ACTION_TYPE_SET_ELEMENTS,
  ACTION_TYPE_SET_UNSORTED_ELEMENTS,
  ACTION_TYPE_SET_SORT_STAGE,
  IActionSetUnsortedElements,
  IActionSetElements,
  IActionSetSortStage,
  SortStage,
  ACTION_TYPE_GENERATE_ARR,
  IActionGenerateArr,
  IActionGenerateWorstCaseArr,
  ACTION_TYPE_GENERATE_WORST_CASE_ARR,} from 'actions/ArrayActions';

import { LElement } from 'algorithms/Base';
import { LArray } from 'algorithms';

export interface IArrayStore {
  elements: Array<LElement>;
  preSortedElements: Array<LElement>;
  sortStage: SortStage;
}

const DefaultArr = new LArray(10);

const DefaultArrayStore: IArrayStore = {
  elements: [...DefaultArr.elements],
  preSortedElements: [...DefaultArr.elements],
  sortStage: SortStage.None,
};

export const ArrayReducer = (
  store = DefaultArrayStore,
  action: ActionType
): IArrayStore => {
  switch (action.type) {
    case ACTION_TYPE_SET_ELEMENTS:
      const a = action as IActionSetElements;
      return {
        ...store,
        elements: [...a.elements],
      };
    case ACTION_TYPE_SET_UNSORTED_ELEMENTS: {
      const a = action as IActionSetUnsortedElements;
      return {
        ...store,
        preSortedElements: [...a.elements],
      };
    }
    case ACTION_TYPE_RESET_SORTED_ELEMENTS:
      return {
        ...store,
        elements: [...store.preSortedElements],
      };
    case ACTION_TYPE_SET_SORT_STAGE: {
      const a = action as IActionSetSortStage;
      return {
        ...store,
        sortStage: a.stage,
      };
    }
    case ACTION_TYPE_GENERATE_ARR: {
      const a = action as IActionGenerateArr;
      const arr = new LArray(a.size);
      return {
        sortStage: SortStage.None,
        elements: [...arr.elements],
        preSortedElements: [...arr.elements],
      };
    }
    case ACTION_TYPE_GENERATE_WORST_CASE_ARR: {
      const a = action as IActionGenerateWorstCaseArr;
      const arr = LArray.elementsInDescendingOrder(a.size);
      return {
        sortStage: SortStage.None,
        elements: [...arr],
        preSortedElements: [...arr],
      };
    }
    default:
      return store;
  }
};
