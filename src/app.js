const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const correlationId = require('./middlewares/correlation-id');
const notFound = require('./middlewares/not-found');
const { errorHandler } = require('./middlewares/error-handler');
const routes = require('./routes');

// Configura o Express. NÃO chama listen — server.js faz isso,
// e os testes importam a app direto com supertest (apostila, Passo 27).
const app = express();

app.use(correlationId);
app.use(express.json({ limit: '100kb' }));
app.use('/api', routes);

// Produção: serve a SPA do React. Em dev o Vite serve com proxy /api.
const DIST = path.join(__dirname, '..', 'frontend', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(DIST, 'index.html'));
  });
}
app.use(notFound);
app.use(errorHandler);

module.exports = app;
