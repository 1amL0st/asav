import { useSelector } from 'react-redux';
import { IStore, AppStore } from 'store';

import { SorterParams } from 'algorithms';

import {ActionSetArrSize,
  ActionSetDelay,
  ActionSetSortAlgName,} from 'actions/AlgParamsActions';

import { IAlgParamsStore } from 'reducers/AlgParamsReducers';

export const AlgParamsApi = {
  useAlgParams(): IAlgParamsStore {
    return useSelector((store: IStore) => store.algParams);
  },

  useArraySize(): number {
    return useSelector((store: IStore) => store.algParams.arrSize);
  },

  setArraySize(size: number): void {
    AppStore.dispatch(ActionSetArrSize(size));
  },

  useSortAlgName(): string {
    return useSelector((store: IStore) => store.algParams.sortAlgName);
  },

  setSortAlgName(name: string): void {
    AppStore.dispatch(ActionSetSortAlgName(name));
  },

  useSorterParams(): SorterParams {
    return useSelector((store: IStore) => store.algParams.sorterParams);
  },

  useDelay(): number {
    return useSelector((store: IStore) => store.algParams.sorterParams.delay);
  },

  setDelay(delay: number): void {
    AppStore.dispatch(ActionSetDelay(delay));
  },
};