const { randomUUID } = require('node:crypto');
const db = require('../../db/db');

function add({ ticket_id, author_id, body }) {
  const id = randomUUID();
  const at = new Date().toISOString();
  db.prepare('INSERT INTO comments (id, ticket_id, author_id, body, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(id, ticket_id, author_id, body.trim(), at);
  return { id, ticket_id, author_id, body: body.trim(), created_at: at };
}

function forTicket(ticket_id) {
  return db
    .prepare(`SELECT c.*, u.name AS author_name, u.role AS author_role FROM comments c
      JOIN users u ON u.id = c.author_id
      WHERE c.ticket_id = ? ORDER BY c.created_at ASC`)
    .all(ticket_id);
}

module.exports = { add, forTicket };
