export const ACTION_TYPE_SET_ELEMENTS = 'ACTION_TYPE_SET_ELEMENTS';
export const ACTION_TYPE_SET_UNSORTED_ELEMENTS =
  'ACTION_TYPE_SET_UNSORTED_ELEMENTS';
export const ACTION_TYPE_RESET_SORTED_ELEMENTS =
  'ACTION_TYPE_RESET_SORTED_ELEMENTS';
export const ACTION_TYPE_SET_SORT_STAGE = 'ACTION_TYPE_SET_START_SORT_FLAG';
export const ACTION_TYPE_GENERATE_ARR = 'ACTION_TYPE_GENERATE_ARR';
export const ACTION_TYPE_GENERATE_WORST_CASE_ARR =
  'ACTION_TYPE_GENERATE_WORST_CASE_ARR';

import { LElement } from 'algorithms/Base';

export enum SortStage {
  None,
  Started,
  InProgress,
  Finished,
}

export interface IActionGenerateWorstCaseArr {
  type: string;
  size: number;
}

export const ActionGenerateWorstCaseArr = (
  size: number
): IActionGenerateWorstCaseArr => {
  return {
    type: ACTION_TYPE_GENERATE_WORST_CASE_ARR,
    size: size,
  };
};

export interface IActionGenerateArr {
  type: string;
  size: number;
}

export const ActionGenerateArr = (size: number): IActionGenerateArr => {
  return {
    type: ACTION_TYPE_GENERATE_ARR,
    size: size,
  };
};

export interface IActionSetSortStage {
  type: string;
  stage: SortStage;
}

export const ActionSetSortStage = (stage: SortStage): IActionSetSortStage => {
  return {
    type: ACTION_TYPE_SET_SORT_STAGE,
    stage: stage,
  };
};

export interface IActionSetElements {
  type: string;
  elements: Array<LElement>;
}

export const ActionSetElements = (
  elements: Array<LElement>
): IActionSetElements => {
  return {
    type: ACTION_TYPE_SET_ELEMENTS,
    elements: elements,
  };
};

export interface IActionSetUnsortedElements {
  type: string;
  elements: Array<LElement>;
}

export const ActionSetUnsortedElements = (
  elements: Array<LElement>
): IActionSetUnsortedElements => {
  return {
    type: ACTION_TYPE_SET_UNSORTED_ELEMENTS,
    elements: elements,
  };
};

export interface IActionResetSortedElements {
  type: string;
}

export const ActionResetSortedElements = (): IActionResetSortedElements => {
  return {
    type: ACTION_TYPE_RESET_SORTED_ELEMENTS,
  };
};

export type ActionType =
  | IActionSetElements
  | IActionSetUnsortedElements
  | IActionResetSortedElements
  | IActionGenerateArr
  | IActionGenerateWorstCaseArr;
