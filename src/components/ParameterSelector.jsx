import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const ParameterSelector = ({ param, selected, value, onChange }) => {
  const getOptions = (param) => {
    switch (param) {
      case 'tone':
        return [
          'professional', 'casual', 'formal', 'friendly',
          'Friendly', 'Thrilling', 'Exciting', 'Adventurous',
          'Innovative', 'Cutting-edge', 'Trendsetting', 'Trendy',
          'Revolutionary', 'Pioneering', 'Trailblazing', 'Progressive',
          'Established', 'Stable', 'Consistent'
        ];
      case 'length':
      case 'creativity':
      case 'detail':
      case 'urgency':
        return ['low', 'medium', 'high'];
      case 'format':
        return ['paragraph', 'bullet points', 'numbered list'];
      case 'style':
        return [
          'Professional', 'Informative', 'Technical', 'Fact-based',
          'Comparative', 'Conversational', 'Storytelling', 'Humorous',
          'Emotive', 'Engaging', 'Instructional', 'Ordering',
          'Enthusiastic', 'Commanding', 'Casual', 'Conversational'
        ];
      case 'sentiment':
        return ['positive', 'negative', 'neutral'];
      case 'audience':
        return ['general', 'experts', 'beginners', 'children'];
      case 'includeExamples':
      case 'includeCounterarguments':
        return ['yes', 'no'];
      default:
        return [];
    }
  };

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
      {param === 'keywords' ? (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(param, selected, e.target.value)}
          placeholder="Enter keywords"
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