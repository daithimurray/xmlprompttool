import React, { useState } from 'react';
import PromptBuilder from '../components/PromptBuilder';
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState(null);

  const frameworks = {
    ACT: {
      sections: ['persona', 'context', 'task'],
      helpText: 'Act as a persona\nContext\nTask',
      defaultPrompts: {
        persona: 'Act as a'
      }
    },
    COSTAR: {
      sections: ['context', 'objective', 'style', 'tone', 'audience', 'response'],
      helpText: 'Context (C): Background information relevant to the task.\nObjective (O): Clear definition of the task.\nStyle (S): Desired writing style or voice.\nTone (T): Emotional tone of the response.\nAudience (A): Identification of the target audience.\nResponse (R): Format of the output.'
    },
    RISEN: {
      sections: ['role', 'input', 'structure', 'engagement', 'nextSteps'],
      helpText: 'Role: The persona or role the AI should assume.\nInput: Specific details or questions to guide responses.\nStructure: Desired format for the output.\nEngagement: Interaction style with users.\nNext Steps: Guidance on follow-up actions or questions.'
    },
    GCA: {
      sections: ['goal', 'context', 'audience'],
      helpText: 'Goal: What task the AI should perform.\nContext: Why the task is necessary and its significance.\nAudience: Who will read or benefit from the output.'
    },
    RODES: {
      sections: ['role', 'objective', 'details', 'examples', 'style'],
      helpText: 'Role: What role should the AI play?\nObjective: What is the desired outcome?\nDetails: Specific information needed for context.\nExamples: Providing examples to illustrate expectations.\nStyle: Desired tone and style of communication.'
    }
  };

  const handleFrameworkClick = (framework) => {
    setSelectedFramework(framework);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">XML Prompt Builder</h1>
        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(frameworks).map((framework) => (
            <Button
              key={framework}
              onClick={() => handleFrameworkClick(framework)}
              variant="outline"
            >
              {framework}
            </Button>
          ))}
        </div>
        {selectedFramework && (
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold mb-2">{selectedFramework} Framework</h2>
            <p className="whitespace-pre-wrap">{frameworks[selectedFramework].helpText}</p>
          </div>
        )}
        <PromptBuilder 
          initialSections={selectedFramework ? frameworks[selectedFramework].sections : []} 
          defaultPrompts={selectedFramework ? frameworks[selectedFramework].defaultPrompts : {}}
        />
        <div className="text-center mt-8 text-sm text-gray-500">
          Built by <a href="https://www.linkedin.com/in/davidmichaelmurray" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">David</a>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;