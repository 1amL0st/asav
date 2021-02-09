import React, { useEffect } from 'react';
import { Api } from 'api';

import { LArray, SorterAction } from 'algorithms';

import { Viewport } from 'components/Viewport';
import { Header } from 'components/Header';

import { SortersPool } from 'algorithms/sorters/SortersPool';

import './App.scss';
import { SortStage } from 'actions/ArrayActions';

export const App: React.FC = () => {
  const algParams = Api.algParams.useAlgParams();
  const arrayStore = Api.arrStore.useArrayStore();
  const sortStage = Api.arrStore.useSortStage();

  const onSortStart = () => {
    const arr = new LArray(0);
    arr.size = algParams.arrSize;
    arr.elements = [...arrayStore.elements];

    Api.arrStore.setSortStage(SortStage.InProgress);

    const onSorterIteration = (action: SorterAction) => {
      if (action == SorterAction.Swap) {
        Api.algStats.incrementSwaps();
      } else if (action == SorterAction.Pick) {
        Api.algStats.incrementIterations();
      } else if (action == SorterAction.Compare) {
        Api.algStats.incrementComparisons();
      } else if (action == SorterAction.Finish) {
        Api.arrStore.setSortStage(SortStage.Finished);
      }
      Api.arrStore.setElements([...arr.elements]);
    };

    const sorter = SortersPool.getSorterByName(
      algParams.sorterParams,
      algParams.sortAlgName,
      arr,
      onSorterIteration
    );

    sorter.sort();
  };

  useEffect(() => {
    if (sortStage === SortStage.Started) {
      onSortStart();
    }
  }, [sortStage]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Viewport arr={arrayStore.elements} />
      </main>
    </div>
  );
};

export default App;
