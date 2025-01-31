import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  MessageSquare, 
  Type, 
  Layout, 
  Clock, 
  Sparkles, 
  FileText, 
  Users, 
  Heart, 
  Tag,
  Zap,
  CheckSquare,
  MessageCircle,
  Brain,
  GitBranch
} from 'lucide-react';

const ParameterSelector = ({ param, selected, value, onChange }) => {
  const getOptions = (param) => {
    switch (param) {
      case 'tone':
        return ['Professional', 'Casual', 'Friendly', 'Formal'];
      case 'length':
      case 'creativity':
      case 'detail':
      case 'urgency':
        return ['low', 'medium', 'high'];
      case 'format':
        return [
          'Slack - no emojis', 'Slack - some emojis', 'Slack - lots of emojis',
          'paragraph', 'bullet points', 'numbered list',
          'Table', 'List', 'Summary', 'Plain text', 'Quote',
          'CSV', 'XML', 'JSON', 'Markdown', 'Image', 'Audio',
          'PowerPoint', 'Excel', 'Bulleted Points', 'Spreadsheet', 'Article'
        ];
      case 'style':
        return [
          'Professional', 'Informative', 'Technical', 'Fact-based',
          'Comparative', 'Conversational', 'Storytelling', 'Humorous',
          'Emotive', 'Engaging', 'Instructional', 'Ordering',
          'Enthusiastic', 'Commanding', 'Casual'
        ];
      case 'sentiment':
        return ['positive', 'negative', 'neutral'];
      case 'audience':
        return ['general', 'experts', 'beginners', 'children'];
      case 'includeExamples':
      case 'includeCounterarguments':
      case 'checklist':
      case 'improvePrompt':
      case 'createPromptChain':
        return null; // Return null for boolean parameters
      default:
        return [];
    }
  };

  const getIcon = (param) => {
    const icons = {
      tone: MessageSquare,
      style: Type,
      format: Layout,
      length: Clock,
      creativity: Sparkles,
      detail: FileText,
      audience: Users,
      sentiment: Heart,
      keywords: Tag,
      urgency: Zap,
      includeExamples: CheckSquare,
      includeCounterarguments: MessageCircle,
      checklist: CheckSquare,
      improvePrompt: Brain,
      createPromptChain: GitBranch
    };
    
    const IconComponent = icons[param] || MessageSquare;
    return <IconComponent className="h-4 w-4 text-gray-500" />;
  };

  const isBooleanParameter = getOptions(param) === null;
  const displayName = param.charAt(0).toUpperCase() + param.slice(1).replace(/([A-Z])/g, ' $1');

  const handleCheckboxChange = (checked) => {
    onChange(param, checked, isBooleanParameter ? (checked ? 'yes' : 'no') : value);
  };

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-0.5 min-w-[180px]">
        {getIcon(param)}
        <label
          htmlFor={param}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-0.5"
        >
          {displayName}
        </label>
      </div>
      
      <div className="flex items-center gap-0.5 flex-1">
        <Checkbox
          id={param}
          checked={selected}
          onCheckedChange={handleCheckboxChange}
          className="data-[state=checked]:bg-primary"
        />
        
        {!isBooleanParameter && (
          param === 'keywords' ? (
            <Input
              type="text"
              value={value}
              onChange={(e) => onChange(param, selected, e.target.value)}
              placeholder="Enter keywords"
              className="flex-1 ml-0.5"
              disabled={!selected}
            />
          ) : (
            <Select
              value={value}
              onValueChange={(newValue) => onChange(param, selected, newValue)}
              disabled={!selected}
            >
              <SelectTrigger className="w-[180px] ml-0.5">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {getOptions(param)?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        )}
      </div>
    </div>
  );
};

export default ParameterSelector;
