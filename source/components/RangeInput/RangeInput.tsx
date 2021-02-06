import React from 'react';
import classNames from 'classnames';

import './RangeInput.scss';

interface IProps {
  className?: string;
  title?: string;
  value: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export const RangeInput: React.FC<IProps> = ({
  className,
  title,
  value,
  minValue,
  maxValue,
  onChange,
}: IProps) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={classNames('range-input', className)}>
      <span className="range-input-title">{title}</span>
      <input
        className="range-input-scroll"
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={onInputChange}
      />
      <input
        className="range-input-number"
        type="number"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};
