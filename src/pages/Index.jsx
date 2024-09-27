import React, { useState } from 'react';
import PromptBuilder from '../components/PromptBuilder';
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState('ACT');

  const frameworks = {
    ACT: {
      sections: ['act', 'context', 'task'],
      helpText: 'Act: The persona or role the AI should assume.\nContext: Why the task is necessary and its significance.\nTask: What task the AI should perform.',
      defaultPrompts: {
        act: 'Act as a'
      }
    },
    COSTAR: {
      sections: ['context', 'objective', 'style', 'tone', 'audience', 'response'],
      helpText: 'Context: Background information relevant to the task.\nObjective: Clear definition of the task.\nStyle: Desired writing style or voice.\nTone: Emotional tone of the response.\nAudience: Identification of the target audience.\nResponse: Format of the output.'
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
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">XML Prompt Builder</h1>
        <p className="text-center text-gray-600 mb-8">
          When prompts involve multiple components like context, instructions, and examples, XML tags can hugely increase clarity, accuracy, flexibility and parseability. Use this simple tool to quickly create XML structured prompts.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(frameworks).map((framework) => (
            <Button
              key={framework}
              onClick={() => handleFrameworkClick(framework)}
              variant={selectedFramework === framework ? "default" : "outline"}
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
        <div className="text-center mt-8 mb-4">
          <a href="https://chatgptforbeginners.co/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">ChatGPT for Beginners</a>
          <a href="https://advancedchatgpt.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">Advanced ChatGPT</a>
          <a href="https://chatgptframeworks.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">ChatGPT Frameworks</a>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          Built by <a href="https://www.linkedin.com/in/davidmichaelmurray" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">David</a>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;