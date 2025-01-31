export const generateXMLPrompt = (sections, parameters) => {
  let basePrompt = sections
    .map(({ section, prompt }) => `<${section}>\n${prompt}\n</${section}>`)
    .join('\n\n');

  const selectedParameters = Object.entries(parameters)
    .filter(([param, { selected }]) => selected)
    .filter(([param, { value }]) => {
      if (param === 'improvePrompt' && value === 'yes' && parameters.improvePrompt.selected) return false;
      if (param === 'createPromptChain' && value === 'yes' && parameters.createPromptChain.selected) return false;
      return true;
    })
    .map(([param, { value }]) => {
      switch (param) {
        case 'keywords':
          return `| ${param}: ${value} |`;
        case 'urgency':
          return `| ${param}: ${value} |`;
        case 'includeCounterarguments':
          return `| include counterarguments: ${value} |`;
        case 'creativity':
          const temperatureMap = {
            low: '0.1',
            medium: '0.5',
            high: '0.9'
          };
          return `| temperature: ${temperatureMap[value]} |`;
        default:
          return `| ${param}: ${value} |`;
      }
    })
    .join('\n');

  let xmlPrompt = basePrompt;

  if (selectedParameters) {
    xmlPrompt += '\n\n<parameters>\n' + selectedParameters + '\n</parameters>';
  }

  if (parameters.checklist.selected && parameters.checklist.value === 'yes') {
    xmlPrompt += '\n\n<checklist>\nStart by analyzing the task and breaking it down into a clear, numbered list of single, actionable items. After addressing each item in sequence, review the completed list to ensure all items are handled thoroughly and to the highest standard. If any item is incomplete or can be improved, revisit and refine it before finalizing the output.\n</checklist>';
  }

  if (parameters.improvePrompt.selected && parameters.improvePrompt.value === 'yes') {
    const improvementWrapper = `<act>
You are a {{prompt engineer}} with {{huge experience}} in {{writing prompts for LLMs}}.
</act>

<task>
Your task is to {{take the prompt below and improve it for a LLM}}. Focus on {{making it clear and understandable for LLMs to process and deliver the best outputs}}. 

Consider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. If you need any further context to give the best / most valuable output - please ask me relevant questions.
</task>

"${xmlPrompt}"`;
    
    return improvementWrapper;
  }

  if (parameters.createPromptChain.selected && parameters.createPromptChain.value === 'yes') {
    const chainWrapper = `<act>
You are a {{prompt engineer}} with {{huge experience}} in {{writing prompts for LLMs}}.
</act>

<task>
Your task is to {{take the prompt below and create a chain of sequential prompts that each build out the output of the previous ones. Each prompt should focus on a single element of the overall goal of the original promt}}. Focus on {{making it clear and understandable for LLMs to process and deliver the best outputs}}. The goal is that by breaking down the larger problem into small, chained prompts, the final output is better than just doing one large one-shot prompt

Consider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. If additional context is required for the most valuable output, ask targeted questions before proceeding. 
</task>

"${xmlPrompt}"`;
    
    return chainWrapper;
  }

  return xmlPrompt;
};