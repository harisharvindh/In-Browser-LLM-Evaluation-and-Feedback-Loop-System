import React from "react";

interface PromptResultProps {
  prompt: string;
  response: string;
  onFeedback: (feedback: "positive" | "negative") => void;
  show: boolean;
}

const PromptResult: React.FC<PromptResultProps> = ({ prompt, response, onFeedback, show }) => {
  if (!show) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">LLM Response</h2>

      <div className="mb-4">
        <div className="text-gray-700 font-medium mb-1">Prompt:</div>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{prompt}</pre>
      </div>

      <div className="mb-4">
        <div className="text-gray-700 font-medium mb-1">Response:</div>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{response}</pre>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onFeedback("positive")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          👍 Helpful
        </button>
        <button
          onClick={() => onFeedback("negative")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          👎 Needs Work
        </button>
      </div>
    </div>
  );
};

export default PromptResult;
