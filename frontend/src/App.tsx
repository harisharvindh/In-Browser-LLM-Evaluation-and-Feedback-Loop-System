import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PromptForm from "./components/PromptForm";
import PromptHistory from "./components/PromptHistory";
import PromptResult from "./components/PromptResult";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="p-4 bg-white shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">n-Browser LLM Playground</h1>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Prompt</Link>
            <Link to="/history" className="hover:underline">History</Link>
          </nav>
        </header>

        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<PromptForm />} />
            <Route path="/history" element={<PromptHistory />} />
            <Route path="/result/:id" element={<PromptResult />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
