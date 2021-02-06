import React, { CSSProperties } from 'react';

import { LElement } from 'algorithms/Base';

import './Viewport.scss';

interface IProps {
  arr: Array<LElement>;
}

export const Viewport: React.FC<IProps> = ({ arr }: IProps) => {
  const columns = arr.map((el) => {
    const style: CSSProperties = {
      height: `${(100 * el.value) / arr.length}%`,
      backgroundColor: el.color,
    };
    return <div className="element" style={style} key={el.id} />;
  });

  return <div className="viewport flex-row">{columns}</div>;
};
