import express from 'express';
import cron from 'node-cron';
import env from 'dotenv';
import db from './database/db.js';
import router from './src/router/route.js';
import fetchGospel from './src/services/GospelService.js';
import { formatDateSlug } from './src/helpers/dateSlug.js';

env.config();
const PORT = process.env.PORT || 3000;


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api',router); 




const todaysDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
const dateSlug = formatDateSlug(new Date(todaysDate)); // 'utorak-17-3-2026'
console.log('Generated date slug for today:', dateSlug);

    //40 min 12 sati svaki dan
    cron.schedule('0 40 13 * * *', async () => {
        try {
            const data = await fetchGospel(dateSlug, todaysDate);
            console.log('Fetched gospel data:', data);
        } catch (err) {
            console.error('Error in cron job:', err);
        }
    });



cron.schedule('0 15 11 * * *', async () => {
  try {
    await db.tx(async t => {
      await t.none('INSERT INTO base.zapis (name) VALUES ($1)', [['Zapisuje za 11:15']]);
    });
    console.log('Cron job executed and data inserted for 11:15');
  } catch (err) {
    console.error('Error executing cron job:', err);
  }
});



app.listen(PORT, () => {
  console.log(`Server is running localhost:${PORT}`);
});

export default app;