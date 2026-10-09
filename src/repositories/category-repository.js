const { randomUUID } = require('node:crypto');
const db = require('../../db/db');

function listActive() {
  return db.prepare('SELECT id, name FROM categories WHERE active = 1 ORDER BY name ASC').all();
}

function findActiveById(id) {
  return db.prepare('SELECT id FROM categories WHERE id = ? AND active = 1').get(id);
}

function create(name) {
  const id = `c-${randomUUID().slice(0, 8)}`;
  db.prepare('INSERT INTO categories (id, name, active) VALUES (?, ?, 1)').run(id, name);
  return { id, name };
}

function setActive(id, active) {
  const row = db.prepare('SELECT id, name FROM categories WHERE id = ?').get(id);
  if (!row) return null;
  db.prepare('UPDATE categories SET active = ? WHERE id = ?').run(active ? 1 : 0, id);
  return { ...row, active: active ? 1 : 0 };
}

module.exports = { listActive, findActiveById, create, setActive };
