import { useSelector } from 'react-redux';
import { IStore, AppStore } from 'store';


import { IAlgStatsStore } from 'reducers/AlgStatsReducers';
import {ActionIncrementComparisons,
  ActionIncrementIterations,
  ActionIncrementSwaps,
  ActionResetStats,} from 'actions/AlgStatsActions';

export const AlgStatsApi = {
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