const { randomUUID } = require('node:crypto');
const db = require('../../db/db');

const SELECT = `SELECT t.*,
  r.name AS requester_name,
  o.name AS owner_name,
  c.name AS category_name
  FROM tickets t
  LEFT JOIN users r ON r.id = t.requester_id
  LEFT JOIN users o ON o.id = t.owner_id
  LEFT JOIN categories c ON c.id = t.category_id`;

function create({ title, description, priority, requester_id, category_id = null }) {
  const id = randomUUID();
  const at = new Date().toISOString();
  db.prepare(`INSERT INTO tickets
    (id, title, description, priority, status, requester_id, owner_id, category_id, deleted_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'open', ?, NULL, ?, NULL, ?, ?)`)
    .run(id, title.trim(), description.trim(), priority, requester_id, category_id, at, at);
  return findById(id, true);
}

// includeDeleted só para admin.
function findById(id, includeDeleted = false) {
  const row = db.prepare(`${SELECT} WHERE t.id = ?`).get(id);
  if (!row) return null;
  if (row.deleted_at && !includeDeleted) return null;
  return row;
}

// G1: solicitante vê os seus; técnico/admin veem todos. G7: paginação.
function list({ status, priority, category_id, scopeUser, scopeRole, page = 1, pageSize = 10, order = 'desc' }) {
  const where = ['t.deleted_at IS NULL'];
  const params = [];
  if (scopeRole === 'requester') {
    where.push('t.requester_id = ?');
    params.push(scopeUser);
  }
  if (status) { where.push('t.status = ?'); params.push(status); }
  if (priority) { where.push('t.priority = ?'); params.push(priority); }
  if (category_id) { where.push('t.category_id = ?'); params.push(category_id); }

  const size = Math.min(Math.max(Number(pageSize) || 10, 1), 50);
  const num = Math.max(Number(page) || 1, 1);
  const dir = order === 'asc' ? 'ASC' : 'DESC';
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const total = db.prepare(`SELECT COUNT(*) AS n FROM tickets t ${clause}`).get(...params).n;
  const data = db
    .prepare(`${SELECT} ${clause} ORDER BY t.created_at ${dir} LIMIT ? OFFSET ?`)
    .all(...params, size, (num - 1) * size);
  return { data, page: num, pageSize: size, total, totalPages: Math.max(Math.ceil(total / size), 1) };
}

function updateFields(id, fields) {
  const allowed = ['priority', 'owner_id', 'category_id'];
  const sets = [];
  const params = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key} = ?`);
      params.push(fields[key]);
    }
  }
  if (!sets.length) return findById(id, true);
  sets.push('updated_at = ?');
  params.push(new Date().toISOString(), id);
  db.prepare(`UPDATE tickets SET ${sets.join(', ')} WHERE id = ?`).run(...params);
  return findById(id, true);
}

function softDelete(id) {
  const at = new Date().toISOString();
  db.prepare('UPDATE tickets SET deleted_at = ?, updated_at = ? WHERE id = ?').run(at, at, id);
}

module.exports = { create, findById, list, updateFields, softDelete };
