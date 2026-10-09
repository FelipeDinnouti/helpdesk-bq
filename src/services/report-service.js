const { randomUUID } = require('node:crypto');
const db = require('../../db/db');
const { httpError } = require('../middlewares/error-handler');
const { PRIORITIES, STATUSES } = require('../lib/validate');

// RF13/RF14 + G13: mesmos filtros e mesma visibilidade da Lista.
// Forma fixa: as 5 chaves de status e as 4 de prioridade sempre presentes.
function summary(query, user) {
  const { status, priority, category_id, since, until } = query || {};
  const where = ['t.deleted_at IS NULL'];
  const params = [];
  if (user.role === 'requester') {
    where.push('t.requester_id = ?');
    params.push(user.id);
  }
  if (status) {
    if (!STATUSES.includes(status)) {
      const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
      err.details = [{ field: 'status', message: 'Status inválido.' }];
      throw err;
    }
    where.push('t.status = ?');
    params.push(status);
  }
  if (priority) {
    if (!PRIORITIES.includes(priority)) {
      const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
      err.details = [{ field: 'priority', message: 'Prioridade inválida.' }];
      throw err;
    }
    where.push('t.priority = ?');
    params.push(priority);
  }
  if (category_id) { where.push('t.category_id = ?'); params.push(category_id); }
  if (since) { where.push('t.created_at >= ?'); params.push(since); }
  if (until) { where.push('t.created_at <= ?'); params.push(until); }

  const clause = `WHERE ${where.join(' AND ')}`;
  const rows = db.prepare(`SELECT status, priority, COUNT(*) AS n FROM tickets t ${clause} GROUP BY status, priority`).all(...params);

  const by_status = { open: 0, analysis: 0, in_progress: 0, resolved: 0, closed: 0 };
  const by_priority = { low: 0, medium: 0, high: 0, critical: 0 };
  let total = 0;
  for (const r of rows) {
    by_status[r.status] += r.n;
    by_priority[r.priority] += r.n;
    total += r.n;
  }
  return { by_status, by_priority, total };
}

function listCategories() {
  return db.prepare('SELECT id, name FROM categories WHERE active = 1 ORDER BY name ASC').all();
}

function createCategory(name) {
  const clean = typeof name === 'string' ? name.trim() : '';
  if (clean.length < 2 || clean.length > 60) {
    const err = httpError(400, 'VALIDATION_ERROR', 'Revise os campos destacados.');
    err.details = [{ field: 'name', message: 'O nome da categoria precisa ter entre 2 e 60 caracteres.' }];
    throw err;
  }
  const id = `c-${randomUUID().slice(0, 8)}`;
  try {
    db.prepare('INSERT INTO categories (id, name, active) VALUES (?, ?, 1)').run(id, clean);
  } catch {
    throw httpError(409, 'CATEGORY_TAKEN', 'Já existe uma categoria com esse nome.');
  }
  return { id, name: clean };
}

function setCategoryActive(id, active) {
  const row = db.prepare('SELECT id, name FROM categories WHERE id = ?').get(id);
  if (!row) throw httpError(404, 'NOT_FOUND', 'Recurso não encontrado.');
  db.prepare('UPDATE categories SET active = ? WHERE id = ?').run(active ? 1 : 0, id);
  return { ...row, active: active ? 1 : 0 };
}

module.exports = { summary, listCategories, createCategory, setCategoryActive };
