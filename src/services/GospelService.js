
import cron from 'node-cron';
import got from 'got';
import * as cheerio from 'cheerio';
import pgPromise from 'pg-promise';


 export async function fetchGospel(dateStr) {

  const client = got.extend({
    headers: { 'User-Agent': 'MyScraper/1.0 (+email@example.com)' },

    retry: { limit: 2 }
  });

  async function fetchAndStore(dateStr) {
    const url = `https://hilp.hr/liturgija-dana/${dateStr}`;

    try {
      const html = await client.get(url).text();
      const $ = cheerio.load(html);

      const blurbs = $('.et_pb_blurb_content').toArray();

      let reference = '', title = '', intro = '', text = '';

      for (let i = 0; i < blurbs.length; i++) {
        const desc = $(blurbs[i]).find('.et_pb_blurb_description').text().trim();
        if (!desc) continue;

        if (/(Mt|Mk|Lk|Iv)/.test(desc)) {
          reference = desc;

          for (let j = i + 1; j < blurbs.length; j++) {
            const nextDesc = $(blurbs[j]).find('.et_pb_blurb_description');
            if (!nextDesc.length) continue;

            const p = nextDesc.find('p').text();

            if (p && p.includes('Čitanje svetog Evanđelja')) {
              const titleTag = $(blurbs[j]).find('.et_pb_module_header').first();
              title = titleTag.text().trim() || '';

              const lines = p
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean);

              intro = lines[0] || '';
              text = lines.slice(1).join('\n') || '';
              break;
            }
          }
          break;
        }
      }

      if (!reference || !text) {
        console.warn('Parsing failed or content missing for', url);
        return;
      }

      console.log('Gospel fetching completed. Fetched data:', {
        reference,
        title,
        intro,
        text
      });

      return { reference, title, intro, text };

    } catch (err) {
      console.error('Error fetching:', url, err.message);
    }
  }

  
   const data = await fetchAndStore(dateStr);
  return data;
}   


export default fetchGospel;





