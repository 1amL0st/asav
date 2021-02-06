import { combineReducers } from 'redux';

import { IAlgParamsStore, AlgParamsReducer } from './AlgParamsReducers';

import { IAlgStatsStore, AlgStatsReducer } from './AlgStatsReducers';
import { ArrayReducer, IArrayStore } from './ArrayReducers';

export interface IStore {
  algParams: IAlgParamsStore;
  algStats: IAlgStatsStore;
  array: IArrayStore;
}

export const rootReducer = combineReducers({
  algParams: AlgParamsReducer,
  algStats: AlgStatsReducer,
  array: ArrayReducer,
});
