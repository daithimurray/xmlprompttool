import React from 'react';

const PromptSection = ({ section, prompt, onChange, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="mb-4">
        <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
          Section
        </label>
        <input
          type="text"
          id="section"
          value={section}
          onChange={(e) => onChange('section', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => onChange('prompt', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Delete Section
      </button>
    </div>
  );
};

export default PromptSection;