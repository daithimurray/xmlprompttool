import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const ParameterSelector = ({ param, selected, value, onChange }) => {
  const getOptions = (param) => {
    switch (param) {
      case 'tone':
        return ['professional', 'casual', 'formal', 'friendly'];
      case 'length':
      case 'creativity':
      case 'detail':
      case 'urgency':
        return ['low', 'medium', 'high'];
      case 'format':
        return ['paragraph', 'bullet points', 'numbered list'];
      case 'perspective':
        return ['first person', 'second person', 'third person'];
      case 'sentiment':
        return ['positive', 'negative', 'neutral'];
      case 'audience':
        return ['general', 'experts', 'beginners', 'children'];
      case 'includeExamples':
      case 'historicalContext':
      case 'useAnalogies':
      case 'includeCitations':
      case 'visualAids':
      case 'includeCounterarguments':
        return ['yes', 'no'];
      case 'skillLevel':
        return ['beginner', 'intermediate', 'advanced'];
      default:
        return [];
    }
  };

  const isTextInput = ['keywords', 'culture', 'structure', 'toneVariation'].includes(param);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={param}
        checked={selected}
        onCheckedChange={(checked) => onChange(param, checked, value)}
      />
      <label
        htmlFor={param}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {param.charAt(0).toUpperCase() + param.slice(1)}
      </label>
      {isTextInput ? (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(param, selected, e.target.value)}
          placeholder={`Enter ${param}`}
          className="ml-2"
        />
      ) : (
        <Select
          value={value}
          onValueChange={(newValue) => onChange(param, selected, newValue)}
          disabled={!selected}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {getOptions(param).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ParameterSelector;