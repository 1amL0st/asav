import React from 'react';

import { AlgorithmParams } from 'components/AlgorithmParams';
import { AlgorithmStats } from 'components/AlgorithmStats';

import { Controls } from 'components/Controls';

import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header flex-row">
      <AlgorithmParams />
      <AlgorithmStats />
      <Controls />
    </header>
  );
};
