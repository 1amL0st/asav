import {ActionType,
  ACTION_TYPE_INCREMENT_SWAPS,
  ACTION_TYPE_RESET_STATS,
  ACTION_TYPE_INCREMENT_ITERATIONS,
  ACTION_TYPE_INCREMENT_COMPARISIONS,} from 'actions/AlgStatsActions';

export interface IAlgStatsStore {
  comparisons: number;
  iterations: number;
  swaps: number;
  time: number;
}

export const DefaultAlgStatsStore: IAlgStatsStore = {
  comparisons: 0,
  iterations: 0,
  swaps: 0,
  time: 0,
};

export const AlgStatsReducer = (
  store = DefaultAlgStatsStore,
  action: ActionType
): IAlgStatsStore => {
  switch (action.type) {
    case ACTION_TYPE_INCREMENT_SWAPS: {
      return {
        ...store,
        swaps: store.swaps + 1,
        iterations: store.iterations + 1,
      };
    }
    case ACTION_TYPE_RESET_STATS: {
      return DefaultAlgStatsStore;
    }
    case ACTION_TYPE_INCREMENT_ITERATIONS: {
      return {
        ...store,
        iterations: store.iterations + 1,
      };
    }
    case ACTION_TYPE_INCREMENT_COMPARISIONS:
      return {
        ...store,
        comparisons: store.comparisons + 1,
        iterations: store.iterations + 1,
      };
    default:
      return store;
  }
};
