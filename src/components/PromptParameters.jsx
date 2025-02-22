
import React from 'react';
import ParameterSelector from './ParameterSelector';
import { Settings } from 'lucide-react';
import { Card } from "@/components/ui/card";

const PromptParameters = ({ parameters, onParameterChange }) => {
  const categories = {
    primary: ['tone', 'length', 'format'],
    context: ['audience', 'sentiment', 'urgency'],
    content: ['style', 'creativity', 'detail', 'keywords'],
    advanced: ['improvePrompt', 'createPromptChain', 'includeExamples', 'includeCounterarguments', 'checklist', 'tenQuestions'] // Added tenQuestions
  };

  const categoryLabels = {
    primary: 'Essential Parameters',
    context: 'Context & Audience',
    content: 'Content Configuration',
    advanced: 'Advanced Features'
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">STEP 3️⃣ - REFINE, USING PARAMETERS</h2>
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
    </div>
  );
};

export default PromptParameters;
