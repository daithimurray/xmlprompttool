
export const generateXMLPrompt = (sections, parameters) => {
  // Extract format parameter if it exists
  const formatParam = parameters.format?.selected ? parameters.format.value : null;

  // Generate base prompt with sections
  const sectionPrompts = sections.map(({ section, prompt }) => {
    // Skip format section if it exists in sections
    if (section === 'format') return '';
    return `<${section}>\n${prompt}\n</${section}>`;
  }).filter(Boolean);

  // Insert format tag between constraints and act if format is selected
  let basePrompt = '';
  let constraintsFound = false;
  
  for (let i = 0; i < sectionPrompts.length; i++) {
    basePrompt += sectionPrompts[i];
    
    if (sectionPrompts[i].includes('</constraints>') && formatParam) {
      basePrompt += '\n\n<format>\nThe format should be a / an ' + formatParam + '\n</format>';
    }
    
    if (i < sectionPrompts.length - 1) {
      basePrompt += '\n\n';
    }
  }

  // Generate parameters section
  const selectedParameters = Object.entries(parameters)
    .filter(([param, { selected }]) => selected)
    .filter(([param, { value }]) => {
      if (param === 'format') return false; // Skip format parameter as it's handled separately
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
    const improvementWrapper = `You are an expert prompt engineer. Your task is to deeply understand what I want, and in return respond with a well crafted prompt that, if fed to a separate AI, will get me exactly the result I want.

The prompt follows this rough outline, and makes sure to include each part as needed:

1. A persona. At the start, you write something to the affect of "Act as an expert in ..." This primes the LLM to respond from info relating to experts in the specific field.
2. The task. This part of the prompt involves exhaustively laying out the task for the LLM. It is critical this part is specific and clear. This is the most important part of the prompt.
3. Context. Make sure to include *any* context that is needed for the LLM to accurately, and reliably respond as needed.
4. Response format. Outline the ideal response format for this prompt.
5. Examples. This step is optional, but if examples would be beneficial, include them.
6. Input. If needed, leave a space in the prompt for any input data. This should be highlight between brackets [like this]

Some other important notes:
- Instruct the model to list out it's thoughts before giving an answer.
- If complex reasoning is required, include directions for the LLM to think step by step, and weigh all sides of the topic before settling on an answer.
- Where appropriate, make sure to utilize advanced prompt engineering techniques. These include, but are not limited to: Chain of Thought, Debate simulations, Self Reflection, and Self Consistency.
- Strictly use text, no code please

Consider previous discussions, existing knowledge, and any necessary constraints when generating responses. If any assumptions are made, clarify them explicitly. If additional context is required for the most valuable output, ask targeted questions before proceeding. 

Please craft the perfect prompt for "${xmlPrompt}"`;
    
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
