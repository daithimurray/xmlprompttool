import React from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const PromptSection = ({ section, prompt, onChange, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-3">
      <div className="mb-2">
        <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
          Section
        </label>
        <Input
          type="text"
          id="section"
          value={section}
          onChange={(e) => onChange('section', e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Prompt
        </label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => onChange('prompt', e.target.value)}
          rows="2"
          className="w-full resize-none"
        />
      </div>
      <Button
        onClick={onDelete}
        variant="destructive"
        size="sm"
      >
        Delete Section
      </Button>
    </div>
  );
};

export default PromptSection;