export const ACTION_TYPE_SET_ARR_SIZE = 'ACTION_TYPE_SET_ARR_SIZE';
export const ACTION_TYPE_SET_SET_DELAY = 'ACTION_TYPE_SET_TICK';
export const ACTION_TYPE_SET_SORT_ALG_NAME = 'ACTION_TYPE_SET_SORT_ALG_NAME';

export interface ISetArrSize {
  type: string;
  size: number;
}

export interface ISetDelay {
  type: string;
  delay: number;
}

export interface ISetSortAlgName {
  type: string;
  name: string;
}

export const ActionSetSortAlgName = (name: string): ISetSortAlgName => {
  return {
    type: ACTION_TYPE_SET_SORT_ALG_NAME,
    name: name,
  };
};

export const ActionSetArrSize = (size: number): ISetArrSize => {
  return {
    type: ACTION_TYPE_SET_ARR_SIZE,
    size: size,
  };
};

export const ActionSetDelay = (delay: number): ISetDelay => {
  return {
    type: ACTION_TYPE_SET_SET_DELAY,
    delay: delay,
  };
};

export type ActionType = ISetArrSize | ISetDelay | ISetSortAlgName;
