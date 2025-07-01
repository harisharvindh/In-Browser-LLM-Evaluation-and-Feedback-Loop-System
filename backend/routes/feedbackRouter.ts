import express from 'express';
import { db } from '../db';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { prompt_id, rating, comment } = req.body;
    if (!prompt_id || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await db.query(
      'INSERT INTO feedback (prompt_id, rating, comment) VALUES ($1, $2, $3)',
      [prompt_id, rating, comment || null]
    );

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve feedback for a specific prompt
router.get('/:prompt_id', async (req, res) => {
  try {
    const { prompt_id } = req.params;
    const result = await db.query(
      'SELECT * FROM feedback WHERE prompt_id = $1',
      [prompt_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
  