import {ActionType,
  ISetArrSize,
  ISetDelay,
  ISetSortAlgName,
  ACTION_TYPE_SET_SORT_ALG_NAME,
  ACTION_TYPE_SET_ARR_SIZE,
  ACTION_TYPE_SET_SET_DELAY,} from 'actions/AlgParamsActions';

import { SorterParams } from 'algorithms/Base';

export interface IAlgParamsStore {
  sorterParams: SorterParams;
  arrSize: number;
  sortAlgName: string;
}

export const DefaultAlgParamsStore: IAlgParamsStore = {
  sorterParams: new SorterParams(),
  arrSize: 10,
  sortAlgName: 'Quick Sort',
};

export const AlgParamsReducer = (
  state = DefaultAlgParamsStore,
  action: ActionType
): IAlgParamsStore => {
  switch (action.type) {
    case ACTION_TYPE_SET_ARR_SIZE: {
      const a = action as ISetArrSize;
      return {
        ...state,
        arrSize: a.size,
      };
    }
    case ACTION_TYPE_SET_SET_DELAY: {
      const a = action as ISetDelay;
      return {
        ...state,
        sorterParams: {
          ...state.sorterParams,
          delay: a.delay,
        },
      };
    }
    case ACTION_TYPE_SET_SORT_ALG_NAME: {
      const a = action as ISetSortAlgName;
      return {
        ...state,
        sortAlgName: a.name,
      };
    }
    default:
      return state;
  }
};
