import React from 'react';

import { IAlgorithmDescription } from 'algorithms/Base';

import './ComparisonTable.scss';

interface IProps {
  descs: Array<IAlgorithmDescription>
}

export const ComparisonTable: React.FC<IProps> = ({
  descs
}: IProps) => {

  const rows = descs.map((desc) => {
    return (
      <tr key={desc.name}>
        <td>{desc.name}</td>
        <td>{desc.best}</td>
        <td>{desc.average}</td>
        <td>{desc.worst}</td>
        <td>{desc.memory}</td>
      </tr>
    )
  })

  return (
    <div className="comparison-table">
      <table className="table">
        <tr>
          <th>Algorithm name</th>
          <th>Best</th>
          <th>Average</th>
          <th>Worst</th>
          <th>Memory</th>
        </tr>
        {rows}
      </table>
    </div>
  )
}