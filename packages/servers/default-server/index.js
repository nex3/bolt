const { getConfig } = require('@bolt/build-tools/utils/config-store.js');
const { handleRequest } = require('@bolt/api');
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3123;

async function init() {
  const config = await getConfig();

  app.get(['/docs', '/docs/', '/docs/index.html'], (req, res) => {
    res.redirect('/docs/getting-started/index.html');
  });

  app.get('/pattern-lab/splash-screen', (req, res) => {
    res.redirect('/pattern-lab');
  });

  app.get('/favicon.ico', (req, res) => {
    res.redirect('/pattern-lab/favicons/favicon.ico');
  });

  app.use('/api', handleRequest);

  app.use(express.static(path.relative(process.cwd(), config.wwwDir)));

  app.listen(port, () => {
    console.log(`Express listening on http://localhost:${port}`);
  });

  app.redirect;
}

init();
