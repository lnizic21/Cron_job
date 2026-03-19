import db from '../../database/db.js';
import { generateSermon } from '../services/LLMService.js';

export function getSermonForDate(date) {
  return async (req, res) => {
    try {
      const dateISO = date.toISOString().split("T")[0];
      const gospel = await db.oneOrNone(
        "SELECT * FROM base.gospel WHERE date = $1",
        [dateISO]
      );

      if (!gospel) {
        return res.status(404).json({ error: "No gospel found for that date" });
      }

      const sermon = await generateSermon({
        gospelText: gospel.gospel_text,
        popeName: req.query.pope || "pape Franje",
      });

      return res.json({ sermon });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}