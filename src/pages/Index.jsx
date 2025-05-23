import React, { useState } from 'react';
import PromptBuilder from '../components/PromptBuilder';
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Code2, Brain, ExternalLink } from "lucide-react";
const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState('ACT');
  const frameworks = {
    ACT: {
      sections: [{
        name: 'ultimateGoal',
        defaultPrompt: 'I want {{desiredoutcome}}'
      }, {
        name: 'constraints',
        defaultPrompt: 'I don\'t want {{undesiredoutcomes}}'
      }, {
        name: 'act',
        defaultPrompt: 'You are a {{jobtitle}} with {{yearsofexperience}} in {{industry}}. You specialize in {{expertiseskills}} and communicate in a {{tonestyle}} manner. Your goal is to {{primaryobjective}}.'
      }, {
        name: 'context',
        defaultPrompt: '1 - {{contextitem}}\n2 - {{contextitem}}\n3 - {{contextitem}}'
      }, {
        name: 'task',
        defaultPrompt: 'Your task is to {{taskdetails}}. Focus on {{ultimateGoal}}. Ensure that your answer is abiding by the {{constraints}}.\n\nConsider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. Please search the internet as needed, but please call out your sources. If you need any further context to give the best / most valuable output - please ask me relevant questions.'
      }],
      helpText: 'Act: Define the specific role, profession, or character the AI should embody.\nUltimate Goal: Clearly state what you want to achieve.\nConstraints: Specify what you want to avoid or exclude.\nContext: Provide relevant background information and circumstances.\nTask: Clearly state what you want the AI to do or accomplish.'
    },
    COSTAR: {
      sections: [{
        name: 'context',
        defaultPrompt: ''
      }, {
        name: 'objective',
        defaultPrompt: ''
      }, {
        name: 'style',
        defaultPrompt: ''
      }, {
        name: 'tone',
        defaultPrompt: ''
      }, {
        name: 'audience',
        defaultPrompt: ''
      }, {
        name: 'response',
        defaultPrompt: ''
      }],
      helpText: 'Context: Background information relevant to the task.\nObjective: Clear definition of the task.\nStyle: Desired writing style or voice.\nTone: Emotional tone of the response.\nAudience: Identification of the target audience.\nResponse: Format of the output.'
    },
    RISEN: {
      sections: [{
        name: 'role',
        defaultPrompt: ''
      }, {
        name: 'input',
        defaultPrompt: ''
      }, {
        name: 'structure',
        defaultPrompt: ''
      }, {
        name: 'engagement',
        defaultPrompt: ''
      }, {
        name: 'nextSteps',
        defaultPrompt: ''
      }],
      helpText: 'Role: The persona or role the AI should assume.\nInput: Specific details or questions to guide responses.\nStructure: Desired format for the output.\nEngagement: Interaction style with users.\nNext Steps: Guidance on follow-up actions or questions.'
    },
    GCA: {
      sections: [{
        name: 'goal',
        defaultPrompt: ''
      }, {
        name: 'context',
        defaultPrompt: ''
      }, {
        name: 'audience',
        defaultPrompt: ''
      }],
      helpText: 'Goal: What task the AI should perform.\nContext: Why the task is necessary and its significance.\nAudience: Who will read or benefit from the output.'
    },
    RODES: {
      sections: [{
        name: 'role',
        defaultPrompt: ''
      }, {
        name: 'objective',
        defaultPrompt: ''
      }, {
        name: 'details',
        defaultPrompt: ''
      }, {
        name: 'examples',
        defaultPrompt: ''
      }, {
        name: 'style',
        defaultPrompt: ''
      }],
      helpText: 'Role: What role should the AI play?\nObjective: What is the desired outcome?\nDetails: Specific information needed for context.\nExamples: Providing examples to illustrate expectations.\nStyle: Desired tone and style of communication.'
    },
    'Study Plan': {
      sections: [{
        name: 'Prompt',
        defaultPrompt: "Act as my skill tutor with the following context:\n\nYou are an expert at [topic]\n\nYou break down complex topics in a way anyone can understand\n\nYou cite your sources so I can research further\n\nYou focus on helping me overcome sticking points\n\nYour mission is to provide me with a 60-day study regimen that includes:\n\nAn executive summary that distills the core principles, key insights, and real-world applications of the topic in a clear and concise format\n\nThe 80/20 of the topic—what 20% of the knowledge drives 80% of the results\n\nOne best-selling book on the topic\n\nOne technical book on the topic\n\nMultiple YouTube videos that best explain the topic\n\n3-5 interrelated interests that complement the main topic for supplementary learning\n\nA list of key experts and content creators in the field whose work I should follow for ongoing insights\n\nFor your first response, provide me with the executive summary and study regimen.\n\nFor further responses:\n\nHelp me overcome sticking points\n\nTeach me nuances of the topic\n\nTest me on my knowledge to reinforce learning and keep the conversation going"
      }, {
        name: 'Topic',
        defaultPrompt: ''
      }],
      helpText: 'Prompt: Detailed instructions for the AI tutor.\nTopic: The specific subject or skill you want to learn.'
    }
  };
  const handleFrameworkClick = framework => {
    setSelectedFramework(framework);
  };
  return <div className="min-h-screen bg-[#343541] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">XML Prompt Builder</h1>
          <p className="text-lg text-gray-300 mb-2">
            When prompts involve multiple components like context, instructions, and examples, XML tags can hugely increase clarity, accuracy, flexibility and parseability.{' '}
            <a href="https://www.linkedin.com/in/davidmichaelmurray" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#10a37f] transition-colors">
              Built by David.
            </a>
          </p>
          <Separator className="my-4 bg-gray-600 mx-auto w-1/2" />
          <a href="https://mypromptbuilder.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-300 hover:text-[#10a37f] transition-colors mt-2">
            Check out the newest version of this tool here <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-4 text-center">STEP 1️⃣ - CHOOSE A FRAMEWORK</h2>

        <Card className="p-6 mb-8 shadow-lg bg-[#444654] border-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(frameworks).map(framework => <Button key={framework} onClick={() => handleFrameworkClick(framework)} variant={selectedFramework === framework ? "default" : "outline"} className={`w-full ${selectedFramework === framework ? 'bg-[#10a37f] hover:bg-[#0e916f] text-white border-[#10a37f]' : 'border-[#10a37f] text-[#10a37f] hover:bg-[#10a37f] hover:text-white'}`}>
                {framework}
              </Button>)}
          </div>
        </Card>

        {selectedFramework && <Card className="bg-[#444654] shadow-lg p-6 mb-8 border-0">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <Brain className="mr-2 h-5 w-5 text-[#10a37f]" />
              {selectedFramework} Framework
            </h2>
            <p className="whitespace-pre-wrap text-gray-300">{frameworks[selectedFramework].helpText}</p>
          </Card>}

        <PromptBuilder selectedFramework={selectedFramework} frameworks={frameworks} />

        <Card className="bg-[#444654] shadow-lg p-6 mt-8 border-0">
          <p className="text-md text-gray-300 py-2 rounded-md px-[240px]">
            Hi there - I hope this tool has been helpful!<br />
            I've worked in tech for 10+ years and I use AI every day to help me be more productive.<br />
            Reach out if I can help at all or if you'd like me to send you my favourite follow-up prompts I use every day.
          </p>
        </Card>

        <Separator className="my-8 bg-gray-600" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-4">
          <a href="https://chatgptforbeginners.co/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-[#444654] rounded-lg shadow-md hover:shadow-lg transition-shadow border-0 text-gray-300 hover:text-[#10a37f]">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>ChatGPT for Beginners</span>
          </a>
          <a href="https://advancedchatgpt.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-[#444654] rounded-lg shadow-md hover:shadow-lg transition-shadow border-0 text-gray-300 hover:text-[#10a37f]">
            <Code2 className="h-5 w-5 mr-2" />
            <span>Advanced ChatGPT</span>
          </a>
          <a href="https://chatgptframeworks.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-[#444654] rounded-lg shadow-md hover:shadow-lg transition-shadow border-0 text-gray-300 hover:text-[#10a37f]">
            <Brain className="h-5 w-5 mr-2" />
            <span>ChatGPT Frameworks</span>
          </a>
        </div>
      </div>
      <Toaster />
    </div>;
};
export default Index;