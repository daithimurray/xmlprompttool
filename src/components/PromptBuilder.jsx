
import React, { useState } from 'react';
import XMLOutput from './GeneratedXMLPrompt';
import PromptSection from './PromptSection';
import PromptParameters from './PromptParameters';
import { generateXMLPrompt } from '../utils/xmlPromptGenerator';

const PromptBuilder = ({ selectedFramework, frameworks }) => {
  const [sections, setSections] = useState(
    frameworks[selectedFramework].sections.map(section => ({
      section: section.name,
      prompt: section.defaultPrompt
    }))
  );

  const [parameters, setParameters] = useState({
    tone: { selected: false, value: '' },
    length: { selected: false, value: '' },
    format: { selected: false, value: '' },
    style: { selected: false, value: '' },
    creativity: { selected: false, value: '' },
    detail: { selected: false, value: '' },
    keywords: { selected: false, value: '' },
    audience: { selected: false, value: '' },
    sentiment: { selected: false, value: '' },
    urgency: { selected: false, value: '' },
    improvePrompt: { selected: false, value: 'no' },
    createPromptChain: { selected: false, value: 'no' },
    includeExamples: { selected: false, value: 'no' },
    includeCounterarguments: { selected: false, value: 'no' },
    checklist: { selected: false, value: 'no' },
    searchInternet: { selected: false, value: 'no' },
    tenQuestions: { selected: false, value: 'no' }  // Added new parameter
  });

  const handlePromptChange = (sectionName, newPrompt) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.section === sectionName ? { ...section, prompt: newPrompt } : section
      )
    );
  };

  const handleParameterChange = (param, selected, value = '') => {
    setParameters(prev => ({
      ...prev,
      [param]: { selected, value }
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">STEP 2️⃣ - COMPLETE THE SECTIONS</h2>
      {frameworks[selectedFramework].sections.map((section) => (
        <PromptSection
          key={section.name}
          sectionName={section.name}
          defaultPrompt={section.defaultPrompt}
          onPromptChange={handlePromptChange}
        />
      ))}

      <PromptParameters
        parameters={parameters}
        onParameterChange={handleParameterChange}
      />

      <XMLOutput
        generatedPrompt={generateXMLPrompt(sections, parameters)}
      />
    </div>
  );
};

export default PromptBuilder;
