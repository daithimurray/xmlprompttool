import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PromptSection from './PromptSection';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const PromptBuilder = ({ selectedFramework, frameworks }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (selectedFramework && frameworks[selectedFramework]) {
      const frameworkSections = frameworks[selectedFramework].sections;
      const defaultPrompts = frameworks[selectedFramework].defaultPrompts || {};

      setSections(prevSections => {
        if (prevSections.length === 0) {
          // Initialize sections only if they haven't been set before
          return frameworkSections.map((section, index) => ({
            id: `section-${index}`,
            section: section,
            prompt: defaultPrompts[section] || ''
          }));
        } else {
          // Preserve existing sections and add new ones if necessary
          const updatedSections = [...prevSections];
          frameworkSections.forEach((section, index) => {
            if (!updatedSections[index]) {
              updatedSections[index] = {
                id: `section-${index}`,
                section: section,
                prompt: defaultPrompts[section] || ''
              };
            } else if (updatedSections[index].section !== section) {
              updatedSections[index].section = section;
              if (!updatedSections[index].prompt) {
                updatedSections[index].prompt = defaultPrompts[section] || '';
              }
            }
          });
          // Remove extra sections if the new framework has fewer sections
          return updatedSections.slice(0, frameworkSections.length);
        }
      });
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
    return sections
      .map(({ section, prompt }) => `<${section}>\n${prompt}\n</${section}>`)
      .join('\n\n');
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