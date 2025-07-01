import express from "express";
import { pool } from "../db";

const router = express.Router();

// POST /api/feedback
router.post("/", async (req, res) => {
  const { recordId, userId, feedback, rating } = req.body;

  if (!recordId || !userId || !feedback) {
    return res.status(400).json({ error: "Missing required feedback fields" });
  }

  try {
    await pool.query(
      `INSERT INTO feedback (record_id, user_id, feedback, rating)
       VALUES ($1, $2, $3, $4)`,
      [recordId, userId, feedback, rating || null]
    );

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Error storing feedback:", err);
    res.status(500).json({ error: "Failed to store feedback" });
  }
});

export default router;
