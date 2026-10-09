const fs = require('node:fs');
const path = require('node:path');

const DIR = path.join(__dirname, 'migrations');

function migrate(db) {

db.exec(`CREATE TABLE IF NOT EXISTS _migrations (
  name TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL
);`);

  db.exec(`CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL
  );`);

  const applied = new Set(
    db.prepare('SELECT name FROM _migrations').all().map((r) => r.name),
  );
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.sql')).sort();

for (const file of files) {
  if (applied.has(file)) continue;
  const sql = fs.readFileSync(path.join(DIR, file), 'utf8');
  db.exec('BEGIN');
  try {
    db.exec(sql);
    db.prepare('INSERT INTO _migrations (name, applied_at) VALUES (?, ?)').run(
      file,
      new Date().toISOString(),
    );
    db.exec('COMMIT');
    console.log(`migrated: ${file}`);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}
  console.log('migrations ok');
}

if (require.main === module) {
  migrate(require('./db'));
}

module.exports = { migrate };
