import React from 'react';
import ParameterSelector from './ParameterSelector';
import { Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";

const PromptParameters = ({ parameters, onParameterChange }) => {
  // Reorganized categories and parameters in a more logical order
  const categories = {
    primary: ['tone', 'length', 'format'], // Most commonly used parameters
    content: ['style', 'creativity', 'detail', 'keywords'], // Content-related parameters
    context: ['audience', 'sentiment', 'urgency'], // Context-related parameters
    advanced: ['improvePrompt', 'createPromptChain', 'includeExamples', 'includeCounterarguments', 'checklist'] // Advanced features
  };

  const categoryLabels = {
    primary: 'Essential Parameters',
    content: 'Content Configuration',
    context: 'Context & Audience',
    advanced: 'Advanced Features'
  };

  return (
    <Card className="bg-white p-4 mb-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Additional Parameters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, paramList]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {categoryLabels[category]}
            </h3>
            <div className="space-y-1">
              {paramList.map(param => (
                <ParameterSelector
                  key={param}
                  param={param}
                  selected={parameters[param].selected}
                  value={parameters[param].value}
                  onChange={onParameterChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PromptParameters;