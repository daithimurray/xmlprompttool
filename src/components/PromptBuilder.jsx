import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PromptSection from './PromptSection';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const PromptBuilder = ({ selectedFramework, frameworks }) => {
  const [sections, setSections] = useState([]);
  const [parameters, setParameters] = useState({
    tone: false,
    length: false,
    creativity: false,
    format: false,
    perspective: false,
    sentiment: false,
    detail: false,
    audience: false,
    includeExamples: false,
    keywords: false,
  });

  useEffect(() => {
    if (selectedFramework && frameworks[selectedFramework]) {
      const frameworkSections = frameworks[selectedFramework].sections;
      setSections(frameworkSections.map((section, index) => ({
        id: `section-${index}`,
        section: section.name,
        prompt: section.defaultPrompt
      })));
    }
  }, [selectedFramework, frameworks]);

  const handleSectionChange = (index, field, value) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = { ...newSections[index], [field]: value };
      return newSections;
    });
  };

  const addSection = () => {
    setSections(prevSections => [...prevSections, { id: `section-${Date.now()}`, section: '', prompt: '' }]);
  };

  const deleteSection = (index) => {
    setSections(prevSections => prevSections.filter((_, i) => i !== index));
  };

  const generateXMLPrompt = () => {
    let xmlPrompt = sections
      .map(({ section, prompt }) => `<${section}>\n${prompt}\n</${section}>`)
      .join('\n\n');

    const selectedParameters = Object.entries(parameters)
      .filter(([_, isSelected]) => isSelected)
      .map(([param]) => {
        switch (param) {
          case 'tone': return '| tone: [desired tone] |';
          case 'length': return '| length: [short/medium/long] |';
          case 'creativity': return '| creativity: [low/medium/high] |';
          case 'format': return '| format: [desired format] |';
          case 'perspective': return '| perspective: [first person/third person] |';
          case 'sentiment': return '| sentiment: [positive/negative/neutral] |';
          case 'detail': return '| detail: [high/medium/low] |';
          case 'audience': return '| audience: [target audience] |';
          case 'includeExamples': return '| include examples: yes/no |';
          case 'keywords': return '| keywords: [list of keywords] |';
          default: return '';
        }
      })
      .join('\n');

    if (selectedParameters) {
      xmlPrompt += '\n\n<parameters>\n' + selectedParameters + '\n</parameters>';
    }

    return xmlPrompt;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateXMLPrompt())
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  const handleParameterChange = (param) => {
    setParameters(prev => ({ ...prev, [param]: !prev[param] }));
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PromptSection
                        section={section.section}
                        prompt={section.prompt}
                        onChange={(field, value) => handleSectionChange(index, field, value)}
                        onDelete={() => deleteSection(index)}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        onClick={addSection}
        className="mb-4"
      >
        Add Section
      </Button>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4">Additional Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(parameters).map((param) => (
            <div key={param} className="flex items-center space-x-2">
              <Checkbox
                id={param}
                checked={parameters[param]}
                onCheckedChange={() => handleParameterChange(param)}
              />
              <label
                htmlFor={param}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {param.charAt(0).toUpperCase() + param.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Generated XML Prompt</h2>
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap mb-4">
          {generateXMLPrompt()}
        </pre>
        <div className="flex justify-start space-x-4">
          <Button onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          <a href="https://chat.openai.com/chat" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
            Open ChatGPT
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;