import React, { useState } from 'react';
import PromptBuilder from '../components/PromptBuilder';
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Code2, Brain } from "lucide-react";

const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState('ACT');

  const frameworks = {
    ACT: {
      sections: [
        { name: 'act', defaultPrompt: 'You are a {{jobtitle}} with {{yearsofexperience}} in {{industry}}. You specialize in {{expertiseskills}} and communicate in a {{tonestyle}} manner. Your goal is to {{primaryobjective}}.' },
        { name: 'context', defaultPrompt: '1 - {{contextitem}}\n2 - {{contextitem}}\n3 - {{contextitem}}' },
        { name: 'task', defaultPrompt: 'Your task is to {{taskdetails}}. Focus on {{keypriorities}}. Ensure that your answer is {{constraints}}.\n\nConsider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. If you need any further context to give the best / most valuable output - please ask me relevant questions.' }
      ],
      helpText: 'Act: Define the specific role, profession, or character the AI should embody.\nContext: Provide relevant background information and circumstances.\nTask: Clearly state what you want the AI to do or accomplish.'
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
    <div className="min-h-screen bg-[#F1F0FB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-4">XML Prompt Builder</h1>
          <p className="text-lg text-[#403E43] mb-6">
            When prompts involve multiple components like context, instructions, and examples, XML tags can hugely increase clarity, accuracy, flexibility and parseability.
          </p>
        </div>

        <Card className="p-6 mb-8 shadow-lg bg-white border border-[#E5DEFF]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(frameworks).map((framework) => (
              <Button
                key={framework}
                onClick={() => handleFrameworkClick(framework)}
                variant={selectedFramework === framework ? "default" : "outline"}
                className={`w-full ${
                  selectedFramework === framework 
                    ? 'bg-[#7E69AB] hover:bg-[#6E59A5] text-white border-[#7E69AB]' 
                    : 'border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB] hover:text-white'
                }`}
              >
                {framework}
              </Button>
            ))}
          </div>
        </Card>

        {selectedFramework && (
          <Card className="bg-white shadow-lg p-6 mb-8 border border-[#E5DEFF]">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-[#1A1F2C]">
              <Brain className="mr-2 h-5 w-5 text-[#7E69AB]" />
              {selectedFramework} Framework
            </h2>
            <p className="whitespace-pre-wrap text-[#403E43]">{frameworks[selectedFramework].helpText}</p>
          </Card>
        )}

        <PromptBuilder 
          selectedFramework={selectedFramework}
          frameworks={frameworks}
        />

        <Separator className="my-8 bg-[#E5DEFF]" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-4">
          <a 
            href="https://chatgptforbeginners.co/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#E5DEFF] text-[#403E43] hover:text-[#7E69AB]"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            <span>ChatGPT for Beginners</span>
          </a>
          <a 
            href="https://advancedchatgpt.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#E5DEFF] text-[#403E43] hover:text-[#7E69AB]"
          >
            <Code2 className="h-5 w-5 mr-2" />
            <span>Advanced ChatGPT</span>
          </a>
          <a 
            href="https://chatgptframeworks.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#E5DEFF] text-[#403E43] hover:text-[#7E69AB]"
          >
            <Brain className="h-5 w-5 mr-2" />
            <span>ChatGPT Frameworks</span>
          </a>
        </div>

        <div className="flex justify-between items-center text-sm text-[#7E69AB] mt-4">
          <div className="flex space-x-4">
            <a 
              href="https://chat.openai.com/chat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#6E59A5] hover:text-[#5B4A94] hover:underline"
            >
              Open ChatGPT
            </a>
            <a 
              href="https://claude.ai/new" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#6E59A5] hover:text-[#5B4A94] hover:underline"
            >
              Open Claude
            </a>
          </div>
          <p>
            Built by <a href="https://www.linkedin.com/in/davidmichaelmurray" target="_blank" rel="noopener noreferrer" className="text-[#6E59A5] hover:text-[#5B4A94] hover:underline">David</a>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;