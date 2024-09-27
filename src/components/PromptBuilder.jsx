import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PromptSection from './PromptSection';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const PromptBuilder = ({ initialSections = [], defaultPrompts = {} }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (initialSections.length > 0) {
      setSections(initialSections.map((section, index) => ({
        id: `section-${index}`,
        section: section,
        prompt: defaultPrompts[section] || ''
      })));
    }
  }, [initialSections, defaultPrompts]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { id: `section-${Date.now()}`, section: '', prompt: '' }]);
  };

  const deleteSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
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
        <div className="flex space-x-4">
          <Button onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          <Button as="a" href="https://chat.openai.com/chat" target="_blank" rel="noopener noreferrer">
            Open ChatGPT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;