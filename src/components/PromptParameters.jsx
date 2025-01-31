import React from 'react';
import ParameterSelector from './ParameterSelector';

const PromptParameters = ({ parameters, onParameterChange }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 className="text-xl font-semibold mb-4">Additional Parameters</h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(parameters).map(([param, { selected, value }]) => (
        <ParameterSelector
          key={param}
          param={param}
          selected={selected}
          value={value}
          onChange={onParameterChange}
        />
      ))}
    </div>
  </div>
);

export default PromptParameters;