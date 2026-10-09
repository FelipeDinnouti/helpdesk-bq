const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// Banco de teste separado por arquivo: nunca o de demonstração.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'helpdesk-test-'));
process.env.DB_PATH = path.join(dir, 'test.db');
process.env.JWT_SECRET = 'segredo-de-teste';
process.env.JWT_EXPIRES_IN = '1h';

// Em-processo de propósito: o Jest isola process.env por arquivo, e
// processos-filhos não herdariam o DB_PATH do sandbox. Sem db.close() —
// a conexão fica aberta para os testes do mesmo arquivo.
const { migrate } = require('../db/migrate');
const { seed } = require('../db/seed');
const db = require('../db/db');
migrate(db);
seed(db);
