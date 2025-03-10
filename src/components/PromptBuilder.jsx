import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PromptSection from './PromptSection';
import PromptParameters from './PromptParameters';
import GeneratedXMLPrompt from './GeneratedXMLPrompt';
import { generateXMLPrompt } from '../utils/xmlPromptGenerator';
import { Button } from "@/components/ui/button";

const PromptBuilder = ({ selectedFramework, frameworks }) => {
  const [sections, setSections] = useState([]);
  const [parameters, setParameters] = useState({
    tone: { selected: false, value: 'professional' },
    length: { selected: false, value: 'medium' },
    creativity: { selected: false, value: 'medium' },
    format: { selected: false, value: 'paragraph' },
    style: { selected: false, value: 'Professional' },
    sentiment: { selected: false, value: 'neutral' },
    detail: { selected: false, value: 'medium' },
    audience: { selected: false, value: 'general' },
    includeExamples: { selected: false, value: 'no' },
    keywords: { selected: false, value: '' },
    urgency: { selected: false, value: 'medium' },
    includeCounterarguments: { selected: false, value: 'no' },
    checklist: { selected: false, value: 'no' },
    improvePrompt: { selected: false, value: 'no' },
    createPromptChain: { selected: false, value: 'no' },
    tenQuestions: { selected: false, value: 'no' },
    atomicSteps: { selected: false, value: 'no' }, // Added new parameter
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  const handleParameterChange = (param, selected, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: { selected, value: value !== undefined ? value : prev[param].value }
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">STEP 2️⃣ - WRITE YOUR PROMPT, USING SECTIONS</h2>
      
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
        className="mb-4 bg-[#10a37f] hover:bg-[#0e916f] text-white"
      >
        Add Section
      </Button>

      <PromptParameters 
        parameters={parameters}
        onParameterChange={handleParameterChange}
      />

      <GeneratedXMLPrompt 
        xmlPrompt={generateXMLPrompt(sections, parameters)}
      />
    </div>
  );
};

export default PromptBuilder;
