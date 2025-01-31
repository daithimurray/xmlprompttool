import React from 'react';
import ParameterSelector from './ParameterSelector';
import { Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";

const PromptParameters = ({ parameters, onParameterChange }) => {
  // Group parameters by category
  const categories = {
    style: ['tone', 'style', 'format'],
    content: ['length', 'creativity', 'detail'],
    audience: ['audience', 'sentiment'],
    features: ['includeExamples', 'includeCounterarguments', 'checklist', 'improvePrompt', 'createPromptChain'],
    other: ['keywords', 'urgency']
  };

  return (
    <Card className="bg-white p-6 mb-4 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Additional Parameters</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(categories).map(([category, paramList]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="space-y-3">
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