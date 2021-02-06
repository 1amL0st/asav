import { useSelector } from 'react-redux';
import { IStore, AppStore } from 'store';

import {ActionSetArrSize,
  ActionSetDelay,
  ActionSetSortAlgName,} from 'actions/AlgParamsActions';
import { LElement, SorterParams } from 'algorithms';
import { IAlgStatsStore } from 'reducers/AlgStatsReducers';
import {ActionIncrementComparisons,
  ActionIncrementIterations,
  ActionIncrementSwaps,
  ActionResetStats,} from 'actions/AlgStatsActions';
import { IArrayStore } from 'reducers/ArrayReducers';
import {ActionResetSortedElements,
  ActionSetElements,
  ActionSetUnsortedElements,
  SortStage,
  ActionSetSortStage,
  ActionGenerateArr,
  ActionGenerateWorstCaseArr,} from 'actions/ArrayActions';
import { IAlgParamsStore } from 'reducers/AlgParamsReducers';

const AlgParamsApi = {
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

const ArrayStoreApi = {
  useArrayStore(): IArrayStore {
    return useSelector((store: IStore) => store.array);
  },

  generateNewArray(): void {
    const size = AppStore.getState().algParams.arrSize;
    AppStore.dispatch(ActionGenerateArr(size));
  },

  generateWorstCaseArr(): void {
    const size = AppStore.getState().algParams.arrSize;
    AppStore.dispatch(ActionGenerateWorstCaseArr(size));
  },

  useSortStage(): SortStage {
    return useSelector((store: IStore) => store.array.sortStage);
  },

  setSortStage(stage: SortStage): void {
    if (stage == SortStage.Started) {
      AppStore.dispatch(ActionResetStats());
    }
    AppStore.dispatch(ActionSetSortStage(stage));
  },

  setElements(elements: Array<LElement>): void {
    AppStore.dispatch(ActionSetElements(elements));
  },

  setUnsortedElements(elements: Array<LElement>): void {
    AppStore.dispatch(ActionSetUnsortedElements(elements));
  },

  useUnsrotedElements(): Array<LElement> {
    return useSelector((store: IStore) => store.array.preSortedElements);
  },

  resetSortedElements(): void {
    AppStore.dispatch(ActionResetSortedElements());
  },
};

const AlgStatsApi = {
  useAlgStats(): IAlgStatsStore {
    return useSelector((store: IStore) => store.algStats);
  },

  incrementComparisons(): void {
    AppStore.dispatch(ActionIncrementComparisons());
  },

  incrementSwaps(): void {
    AppStore.dispatch(ActionIncrementSwaps());
  },

  incrementIterations(): void {
    AppStore.dispatch(ActionIncrementIterations());
  },

  resetStats(): void {
    AppStore.dispatch(ActionResetStats());
  },
};

export const Api = {
  algParams: AlgParamsApi,
  arrStore: ArrayStoreApi,
  algStats: AlgStatsApi,
};
