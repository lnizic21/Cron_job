import express from 'express';
import cron from 'node-cron';
import env from 'dotenv';
import db from './database/db.js';

env.config();
const PORT = process.env.PORT || 3000;


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

cron.schedule('*/5 * * * * *', async () => {
  try {
    await db.tx(async t => {
      await t.none('INSERT INTO base.zapis (name) VALUES ($1)', [['Zapisuje se svakih 5 sekundi']]);
    });
    console.log('Cron job executed and data inserted for every 5 seconds');
  } catch (err) {
    console.error('Error executing cron job:', err);
  }
});

cron.schedule('9 * * * * *', async () => {
  try {
    await db.tx(async t => {
      await t.none('INSERT INTO base.zapis (name) VALUES ($1)', [['Zapisuje se svaku 9 sekundu']]);
    });
    console.log('Cron job executed and data inserted for the 9th second');
  } catch (err) {
    console.error('Error executing cron job:', err);
  }
});



app.listen(PORT, () => {
  console.log(`Server is running localhost:${PORT}`);
});

export default app;