import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquare, Code2 } from "lucide-react";

const GeneratedXMLPrompt = ({ xmlPrompt }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlPrompt)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
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
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Open ChatGPT
        </a>
        <a 
          href="https://claude.ai/new" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <Code2 className="h-4 w-4" />
          Open Claude
        </a>
      </div>
    </div>
  );
};

export default GeneratedXMLPrompt;