import express from 'express';
import knex from 'knex';
import config from './knexfile.js';

const db = knex(config);
const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'hello-world';

app.get('/', async (_req, res) => {
  try {
    await db('visits').insert({});
    const [{ count }] = await db('visits').count('id');
    console.log(`[${appName}] visit #${count}`);
    res.send(`Goodbye World! App: ${appName} - Visits: ${count}\n`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}\n`);
  }
});

app.get('/healthz', async (_req, res) => {
  try {
    await db.raw('SELECT 1');
    res.send('ok');
  } catch {
    res.status(503).send('db unreachable');
  }
});

app.get((_req, res, _next) => res.status(404).send('Not Found'));

app.use((err, _req, res, _next) => res.status(500).send(`Error: ${err.message}\n`));

console.log('Running migrations...');

await db.migrate.latest();

console.log('Migrations complete');

app.listen(port, () => console.log(`Server running on :${port}`));
