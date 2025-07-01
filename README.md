# In-Browser-LLM-Evaluation-and-Feedback-Loop-System

An interactive full-stack application for visually comparing large language model (LLM) prompts, responses, and chaining strategies. Designed for researchers, engineers, and prompt designers, this system allows side-by-side evaluation of prompt variants, captures user feedback, and stores metadata for continuous improvement.

> Built with React, TypeScript, LangChain, OpenAI API, Pinecone, PostgreSQL, Express, and Docker.

---

## Overview

In modern AI development, prompt design and user feedback are essential to optimizing LLM performance. This system enables:

- Prompt templating and execution via LangChain
- Embedding storage in Pinecone for retrieval-augmented generation (RAG)
- Feedback loop capturing user scores/comments
- Persistent logging of interactions in PostgreSQL
- Docker-based reproducibility across environments

---

## Tech Stack

| Layer          | Technology                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Frontend       | React, TypeScript, TailwindCSS, Vite                                        |
| Backend        | Node.js, Express.js, LangChain, OpenAI API                                  |
| Database       | PostgreSQL (prompt logs, user feedback), Pinecone (semantic embeddings)     |
| MLOps Utility  | Prompt caching, RAG integration, real-time feedback tracking                |
| DevOps         | Docker, Docker Compose                                                      |

---

## Features

### LLM Prompt Evaluation Playground
- Submit and compare multiple prompt variants side-by-side.
- Supports temperature tuning, system/user roles, chaining strategies (e.g., summarization, RAG).

### Feedback Loop Collection
- Collects user ratings and comments for each LLM response.
- Stores feedback with prompt-response metadata for future model fine-tuning.

### Modular LangChain Pipelines
- Built-in modules for retrieval, summarization, classification.
- Easily customizable for your research or product use cases.

### Persistence and Retrieval
- Logs each interaction in PostgreSQL for longitudinal studies.
- Semantic embedding search powered by Pinecone.

---

## 📁 Project Structure

```bash
In-browser-llm-feedback/
├── backend/
│ ├── db/
│ │ └── schema.sql # PostgreSQL schema
│ ├── routes/
│ │ ├── llmRouter.ts # Routes for prompt submission and LLM responses
│ │ └── feedbackRouter.ts # Routes for collecting and storing feedback
│ ├── services/
│ │ └── pinecone.ts # Pinecone vector DB interface
│ ├── utils/
│ │ └── types.ts # Shared TypeScript types
│ ├── config.ts # Configuration (e.g., API keys, DB credentials)
│ ├── index.ts # Express server entry point
│ └── Dockerfile # Backend container
├── frontend/
│ ├── components/
│ │ ├── PromptForm.tsx # Form to submit prompt inputs
│ │ ├── PromptHistory.tsx # View past prompt submissions
│ │ └── PromptResult.tsx # Show response & feedback interface
│ ├── App.tsx # Root UI logic
│ ├── index.tsx # React app bootstrap
│ ├── tailwind.config.ts # TailwindCSS setup
│ ├── postcss.config.ts # PostCSS config
│ ├── tsconfig.json # TypeScript config
│ └── vite.config.ts # Vite build config
├── .gitignore
├── README.md
└── docker-compose.yml # Orchestrates frontend, backend, and PostgreSQL


---

## ⚙Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/get-docker/)
- [Pinecone Account](https://www.pinecone.io/start/)
- [OpenAI API Key](https://platform.openai.com/signup)

### Running the Application

1. Clone the repository:

```bash
git clone https://github.com/your-username/n-browser-llm-feedback.git
cd n-browser-llm-feedback

OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENV=your-pinecone-environment
PINECONE_INDEX=your-index
POSTGRES_URL=postgresql://user:pass@db:5432/llm_db

docker-compose up --build

