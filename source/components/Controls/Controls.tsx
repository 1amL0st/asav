import React from 'react';

import { Api } from 'api';
import { SortStage } from 'actions/ArrayActions';

import './Controls.scss';

export const Controls: React.FC = () => {
  const onResetBtnHandler = () => {
    Api.algStats.resetStats();
    Api.arrStore.resetSortedElements();
  };

  const onSortStartBtnHandler = () =>
    Api.arrStore.setSortStage(SortStage.Started);

  const onRandomizeBtnHandler = () => Api.arrStore.generateNewArray();
  const onWorstCaseArrBtnHandler = () => Api.arrStore.generateWorstCaseArr();

  return (
    <div className="controls">
      <button onClick={onWorstCaseArrBtnHandler}>Worst case arr</button>
      <button onClick={onRandomizeBtnHandler}>Randomize</button>
      <button onClick={onResetBtnHandler}>Reset</button>
      <button onClick={onSortStartBtnHandler}>Start</button>
    </div>
  );
};
