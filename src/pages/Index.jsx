import React, { useState } from 'react';
import PromptBuilder from '../components/PromptBuilder';
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState('ACT');

  const frameworks = {
    ACT: {
      sections: [
        { name: 'act', defaultPrompt: 'You are a {{jobtitle}} with {{yearsofexperience}} in {{industry}}. You specialize in {{expertiseskills}} and communicate in a {{tonestyle}} manner. Your goal is to {{primaryobjective}}.' },
        { name: 'context', defaultPrompt: 'The following context is relevant to this task: \n\n1 - {{contextitem}}\n2 - {{contextitem}}\n3 - {{contextitem}}' },
        { name: 'task', defaultPrompt: 'Your task is to {{taskdetails}}. Focus on {{keypriorities}}. Ensure that your answer is {{constraints}}.\n\nConsider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. If you need any further context to give the best / most valuable output - please ask me relevant questions.' }
      ],
      helpText: 'Act: Define the specific role, profession, or character the AI should embody (e.g., "Act as a marketing expert").\nContext: Provide relevant background information and circumstances.\nTask: Clearly state what you want the AI to do or accomplish.'
    },
    COSTAR: {
      sections: [
        { name: 'context', defaultPrompt: '' },
        { name: 'objective', defaultPrompt: '' },
        { name: 'style', defaultPrompt: '' },
        { name: 'tone', defaultPrompt: '' },
        { name: 'audience', defaultPrompt: '' },
        { name: 'response', defaultPrompt: '' }
      ],
      helpText: 'Context: Background information relevant to the task.\nObjective: Clear definition of the task.\nStyle: Desired writing style or voice.\nTone: Emotional tone of the response.\nAudience: Identification of the target audience.\nResponse: Format of the output.'
    },
    RISEN: {
      sections: [
        { name: 'role', defaultPrompt: '' },
        { name: 'input', defaultPrompt: '' },
        { name: 'structure', defaultPrompt: '' },
        { name: 'engagement', defaultPrompt: '' },
        { name: 'nextSteps', defaultPrompt: '' }
      ],
      helpText: 'Role: The persona or role the AI should assume.\nInput: Specific details or questions to guide responses.\nStructure: Desired format for the output.\nEngagement: Interaction style with users.\nNext Steps: Guidance on follow-up actions or questions.'
    },
    GCA: {
      sections: [
        { name: 'goal', defaultPrompt: '' },
        { name: 'context', defaultPrompt: '' },
        { name: 'audience', defaultPrompt: '' }
      ],
      helpText: 'Goal: What task the AI should perform.\nContext: Why the task is necessary and its significance.\nAudience: Who will read or benefit from the output.'
    },
    RODES: {
      sections: [
        { name: 'role', defaultPrompt: '' },
        { name: 'objective', defaultPrompt: '' },
        { name: 'details', defaultPrompt: '' },
        { name: 'examples', defaultPrompt: '' },
        { name: 'style', defaultPrompt: '' }
      ],
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
          selectedFramework={selectedFramework}
          frameworks={frameworks}
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
