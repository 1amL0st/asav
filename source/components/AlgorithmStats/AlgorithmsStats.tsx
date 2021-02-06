import React from 'react';

import { Api } from 'api';

import './AlgorithmsStats.scss';

export const AlgorithmStats: React.FC = () => {
  const stats = Api.algStats.useAlgStats();

  return (
    <div className="algorithms-stats">
      <div>Stats</div>
      <div>Swaps {stats.swaps}</div>
      <div>Comparison {stats.comparisons}</div>
      <div>Iterations {stats.iterations}</div>
    </div>
  );
};
