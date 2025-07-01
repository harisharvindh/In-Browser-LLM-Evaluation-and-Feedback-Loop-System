import React, { useEffect, useState } from "react";
import axios from "axios";

interface PromptHistoryItem {
  id: number;
  prompt: string;
  response: string;
  created_at: string;
}

const PromptHistory: React.FC = () => {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/llm/history");
        setHistory(res.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading history...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Prompt History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="border-b pb-4">
              <div className="text-gray-600 text-sm mb-1">{new Date(item.created_at).toLocaleString()}</div>
              <div className="font-semibold">Prompt:</div>
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{item.prompt}</pre>
              <div className="font-semibold mt-2">Response:</div>
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{item.response}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PromptHistory;
