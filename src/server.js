require('dotenv').config();
const app = require('./app');

// Só este arquivo abre porta. Todo o resto importa a app.
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(
    JSON.stringify({ level: 'info', event: 'server.started', port: PORT }),
  );
});
