import React, { useState } from 'react';
import PromptSection from './PromptSection';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const PromptBuilder = () => {
  const [sections, setSections] = useState([
    { section: 'persona', prompt: 'Act as a' },
    { section: 'context', prompt: '' },
    { section: 'task', prompt: '' }
  ]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { section: '', prompt: '' }]);
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

  return (
    <div>
      {sections.map((section, index) => (
        <PromptSection
          key={index}
          section={section.section}
          prompt={section.prompt}
          onChange={(field, value) => handleSectionChange(index, field, value)}
          onDelete={() => deleteSection(index)}
        />
      ))}
      <Button
        onClick={addSection}
        className="mb-4"
      >
        Add Section
      </Button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Generated XML Prompt</h2>
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap mb-4">
          {generateXMLPrompt()}
        </pre>
        <Button onClick={copyToClipboard}>
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};

export default PromptBuilder;