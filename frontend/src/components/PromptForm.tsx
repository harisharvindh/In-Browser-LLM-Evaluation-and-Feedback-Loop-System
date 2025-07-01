import React, { useState } from "react";
import axios from "axios";

const PromptForm: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await axios.post("/api/llm/submit", {
        prompt,
        model,
        temperature,
      });

      setResult(response.data.output);
    } catch (err) {
      console.error(err);
      setResult("Error while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          rows={4}
          required
        />

        <label className="block mb-2 font-semibold">Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>

        <label className="block mb-2 font-semibold">Temperature: {temperature}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Prompt"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">LLM Output</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
