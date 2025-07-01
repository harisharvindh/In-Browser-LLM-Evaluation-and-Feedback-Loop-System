import express from "express";
import { pool } from "../db";
import { generateCompletion } from "../services/openaiService";
import { storePromptRecord } from "../utils/storage";

const router = express.Router();

// POST /api/prompts/evaluate
router.post("/evaluate", async (req, res) => {
  const { prompt, temperature, userId, metadata } = req.body;

  if (!prompt || temperature === undefined) {
    return res.status(400).json({ error: "Missing prompt or temperature" });
  }

  try {
    const responseText = await generateCompletion(prompt, temperature);

    // Optional: store the prompt and completion in DB
    const recordId = await storePromptRecord({
      userId,
      prompt,
      response: responseText,
      temperature,
      metadata,
    });

    res.json({
      recordId,
      prompt,
      response: responseText,
    });
  } catch (err) {
    console.error("Prompt evaluation error:", err);
    res.status(500).json({ error: "Failed to evaluate prompt" });
  }
});

export default router;
