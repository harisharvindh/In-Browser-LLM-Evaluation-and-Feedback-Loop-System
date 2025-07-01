// backend/src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import promptRoutes from './api/prompt';
import feedbackRoutes from './api/feedback';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/prompt', promptRoutes);
app.use('/api/feedback', feedbackRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('LLM Evaluation and Feedback API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
