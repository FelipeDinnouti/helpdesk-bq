const db = require('../../db/db');

const PUBLIC_COLUMNS = 'id, name, email, role, active, created_at';

function findByEmail(email) {
  return db
    .prepare(`SELECT ${PUBLIC_COLUMNS}, password_hash FROM users WHERE email = ?`)
    .get(String(email).toLowerCase().trim());
}

function findById(id) {
  return db
    .prepare(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ?`)
    .get(id);
}

function create({ id, name, email, passwordHash, role }) {
  db.prepare(
    'INSERT INTO users (id, name, email, password_hash, role, active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)',
  ).run(id, name, String(email).toLowerCase().trim(), passwordHash, role, new Date().toISOString());
  return findById(id);
}

module.exports = { findByEmail, findById, create };
