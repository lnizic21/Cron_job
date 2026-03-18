
import db  from "../../database/db.js";

    export  function getGospelForDate(date) {
        return async (  req , res ) => {

        try { 
            const dateISO = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            const gospel = await db.oneOrNone('SELECT * FROM base.gospel WHERE date = $1', [dateISO]);
            if (!gospel) {
                console.warn('No gospel found for date:', dateISO);
                res.status(404).json({ error: 'No gospel found for the specified date' });
                return;
            }
           return res.status(200).json(gospel);

        } catch (err) {
            console.error('Error fetching gospel for date:', err);
            throw err;
        }
    }
    }