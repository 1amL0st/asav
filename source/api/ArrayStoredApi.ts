import { useSelector } from 'react-redux';
import { IStore, AppStore } from 'store';

import { LElement } from 'algorithms';

import { IArrayStore } from 'reducers/ArrayReducers';
import {ActionResetSortedElements,
  ActionSetElements,
  ActionSetUnsortedElements,
  SortStage,
  ActionSetSortStage,
  ActionGenerateArr,
  ActionGenerateWorstCaseArr,} from 'actions/ArrayActions';

import {ActionResetStats,} from 'actions/AlgStatsActions';

export const ArrayStoreApi = {
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