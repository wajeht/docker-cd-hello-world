import express from 'express';
import knexPkg from 'knex';
import config from '../knexfile.js';

const knex = knexPkg(config);
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || 'dev';
const appName = process.env.APP_NAME || 'hello-world';

app.get('/', async (req, res) => {
  try {
    await knex('visits').insert({});
    const [{ count }] = await knex('visits').count('id');
    console.log(`[${appName}] visit #${count}`);
    res.send(`Hello Docker CD World! App: ${appName} | Version: ${version} | Visits: ${count}\n`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}\n`);
  }
});

app.get('/healthz', async (req, res) => {
  try {
    await knex.raw('SELECT 1');
    res.send('ok');
  } catch {
    res.status(503).send('db unreachable');
  }
});

console.log('Running migrations...');
await knex.migrate.latest();
console.log('Migrations complete');

app.listen(port, () => {
  console.log(`Server running on :${port} (version: ${version})`);
});
