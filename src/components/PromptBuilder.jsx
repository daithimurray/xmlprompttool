import React, { useState } from 'react';
import PromptSection from './PromptSection';

const PromptBuilder = () => {
  const [sections, setSections] = useState([{ section: '', prompt: '' }]);

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
      <button
        onClick={addSection}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Section
      </button>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Generated XML Prompt</h2>
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
          {generateXMLPrompt()}
        </pre>
      </div>
    </div>
  );
};

export default PromptBuilder;