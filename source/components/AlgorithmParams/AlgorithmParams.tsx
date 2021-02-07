import React, { useEffect } from 'react';

import { Api } from 'api';
import { SortersPool } from 'algorithms/sorters/SortersPool';
import { RangeInput } from 'components/RangeInput';
import { LArray } from 'algorithms';

import './AlgorithmParams.scss';

export const AlgorithmParams: React.FC = () => {
  const algParams = Api.algParams.useAlgParams();

  const onArrSizeInputChange = (value: number) => {
    const arr = new LArray(value);
    Api.arrStore.setElements(arr.elements);
    Api.arrStore.setUnsortedElements(arr.elements);
    Api.algParams.setArraySize(value);
  };

  const onTickInputChange = (value: number) => Api.algParams.setDelay(value);

  const onSortingAlgSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Api.algParams.setSortAlgName(e.target.value);
  };

  useEffect(() => {
    // TODO: Remove this code Later
    Api.algParams.setSortAlgName('Quick sort');
    Api.algParams.setDelay(30);
    onArrSizeInputChange(10);
    Api.arrStore.generateWorstCaseArr();
  }, []);

  return (
    <div className="alg-params flex-row">
      <select onChange={onSortingAlgSelect} value={algParams.sortAlgName}>
        {SortersPool.getSortersNames().map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <RangeInput
        className="alg-params-input"
        title="Tick"
        minValue={10}
        maxValue={10000}
        value={algParams.sorterParams.delay}
        onChange={onTickInputChange}
      />
      <RangeInput
        className="alg-params-input"
        title="Elements"
        minValue={2}
        maxValue={120}
        value={algParams.arrSize}
        onChange={onArrSizeInputChange}
      />
    </div>
  );
};
