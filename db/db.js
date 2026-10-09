require('dotenv').config();
const Database = require('better-sqlite3');

// Ponto único de acesso ao banco. Nenhum repositório importa better-sqlite3.
// Schema portátil (sem dialeto): o Postgres continua sendo o alvo declarado.
const db = new Database(process.env.DB_PATH || './db/helpdesk.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;
