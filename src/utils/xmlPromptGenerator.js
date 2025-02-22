export const generateXMLPrompt = (sections, parameters) => {
  let xmlPrompt = '<prompt>';

  sections.forEach(section => {
    xmlPrompt += `\n\t<${section.section}>${section.prompt}</${section.section}>`;
  });

  if (parameters.tone.selected && parameters.tone.value) {
    xmlPrompt += `\n\n\t<tone>${parameters.tone.value}</tone>`;
  }

  if (parameters.length.selected && parameters.length.value) {
    xmlPrompt += `\n\n\t<length>${parameters.length.value}</length>`;
  }

  if (parameters.format.selected && parameters.format.value) {
    xmlPrompt += `\n\n\t<format>${parameters.format.value}</format>`;
  }

   if (parameters.style.selected && parameters.style.value) {
    xmlPrompt += `\n\n\t<style>${parameters.style.value}</style>`;
  }

  if (parameters.creativity.selected && parameters.creativity.value) {
    xmlPrompt += `\n\n\t<creativity>${parameters.creativity.value}</creativity>`;
  }

  if (parameters.detail.selected && parameters.detail.value) {
    xmlPrompt += `\n\n\t<detail>${parameters.detail.value}</detail>`;
  }

  if (parameters.keywords.selected && parameters.keywords.value) {
    xmlPrompt += `\n\n\t<keywords>${parameters.keywords.value}</keywords>`;
  }

  if (parameters.audience.selected && parameters.audience.value) {
    xmlPrompt += `\n\n\t<audience>${parameters.audience.value}</audience>`;
  }

  if (parameters.sentiment.selected && parameters.sentiment.value) {
    xmlPrompt += `\n\n\t<sentiment>${parameters.sentiment.value}</sentiment>`;
  }

  if (parameters.urgency.selected && parameters.urgency.value) {
    xmlPrompt += `\n\n\t<urgency>${parameters.urgency.value}</urgency>`;
  }

  if (parameters.improvePrompt.selected && parameters.improvePrompt.value === 'yes') {
    xmlPrompt += '\n\n<improve>\nPlease improve this prompt before responding.\n</improve>';
  }

  if (parameters.createPromptChain.selected && parameters.createPromptChain.value === 'yes') {
    xmlPrompt += '\n\n<chain>\nCreate a chain of follow-up prompts to further refine the response.\n</chain>';
  }

  if (parameters.includeExamples.selected && parameters.includeExamples.value === 'yes') {
    xmlPrompt += '\n\n<examples>\nInclude clear examples to illustrate the expected output.\n</examples>';
  }

  if (parameters.includeCounterarguments.selected && parameters.includeCounterarguments.value === 'yes') {
    xmlPrompt += '\n\n<counterarguments>\nConsider and address potential counterarguments in the response.\n</counterarguments>';
  }

  if (parameters.checklist.selected && parameters.checklist.value === 'yes') {
    xmlPrompt += '\n\n<checklist>\nProvide a checklist to ensure all requirements are met.\n</checklist>';
  }

  if (parameters.searchInternet.selected && parameters.searchInternet.value === 'yes') {
    xmlPrompt += '\n\n<search>\nPlease actively search the internet for relevant information and cite your sources in the response.\n</search>';
  }

  xmlPrompt += '\n</prompt>';
  
  return xmlPrompt;
};
