export const ACTION_TYPE_INCREMENT_SWAPS = 'ACTION_TYPE_SET_SWAPS';
export const ACTION_TYPE_RESET_STATS = 'ACTION_TYPE_RESET';
export const ACTION_TYPE_INCREMENT_ITERATIONS =
  'ACTION_TYPE_INCREMENT_ITERATIONS';
export const ACTION_TYPE_INCREMENT_COMPARISIONS =
  'ACTION_TYPE_INCREMENT_COMPARISONS';

export interface IIncrementSwaps {
  type: string;
}

export interface IIncrementComparisons {
  type: string;
}

export const ActionIncrementComparisons = (): IIncrementComparisons => {
  return {
    type: ACTION_TYPE_INCREMENT_COMPARISIONS,
  };
};

export interface IResetStats {
  type: string;
}

export interface IIncrementIterations {
  type: string;
}

export const ActionIncrementIterations = (): IIncrementIterations => {
  return {
    type: ACTION_TYPE_INCREMENT_ITERATIONS,
  };
};

export const ActionResetStats = (): IResetStats => {
  return {
    type: ACTION_TYPE_RESET_STATS,
  };
};

export const ActionIncrementSwaps = (): IIncrementSwaps => {
  return {
    type: ACTION_TYPE_INCREMENT_SWAPS,
  };
};

export type ActionType = IIncrementSwaps;
