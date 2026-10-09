const { randomUUID } = require('node:crypto');
const db = require('../../db/db');

function add({ ticket_id, actor_id, event, before = null, after = null }) {
  const id = randomUUID();
  const at = new Date().toISOString();
  db.prepare(`INSERT INTO ticket_history
    (id, ticket_id, actor_id, event, before, after, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(id, ticket_id, actor_id, event, before, after, at);
  return { id, ticket_id, actor_id, event, before, after, created_at: at };
}

function forTicket(ticket_id) {
  return db
    .prepare(`SELECT h.*, u.name AS actor_name FROM ticket_history h
      JOIN users u ON u.id = h.actor_id
      WHERE h.ticket_id = ? ORDER BY h.created_at ASC`)
    .all(ticket_id);
}

module.exports = { add, forTicket };
