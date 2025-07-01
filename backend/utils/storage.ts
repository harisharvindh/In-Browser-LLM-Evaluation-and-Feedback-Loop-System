import { Pool } from "pg";
import { config } from "dotenv";

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Store a prompt-response interaction
export async function savePromptInteraction(userId: string, prompt: string, response: string, temperature: number): Promise<void> {
  await pool.query(
    `INSERT INTO interactions (user_id, prompt, response, temperature, timestamp)
     VALUES ($1, $2, $3, $4, NOW())`,
    [userId, prompt, response, temperature]
  );
}

// Save user feedback (rating, notes, etc.)
export async function saveFeedback(interactionId: number, feedback: string): Promise<void> {
  await pool.query(
    `UPDATE interactions SET feedback = $1 WHERE id = $2`,
    [feedback, interactionId]
  );
}

// Fetch recent interactions
export async function getRecentInteractions(userId: string, limit = 10): Promise<any[]> {
  const { rows } = await pool.query(
    `SELECT * FROM interactions WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2`,
    [userId, limit]
  );
  return rows;
}
