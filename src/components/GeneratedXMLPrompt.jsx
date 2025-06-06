import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GeneratedXMLPrompt = ({ xmlPrompt }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlPrompt)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">STEP 4️⃣ - COPY YOUR XML FORMATTED PROMPT</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Generated XML Prompt</h2>
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap mb-4">
          {xmlPrompt}
        </pre>
        <div className="flex justify-start space-x-4">
          <Button onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          <a 
            href="https://chat.openai.com/chat" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline flex items-center"
          >
            Open ChatGPT
          </a>
          <a 
            href="https://claude.ai/new" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline flex items-center"
          >
            Open Claude
          </a>
        </div>
      </div>
    </div>
  );
};

export default GeneratedXMLPrompt;