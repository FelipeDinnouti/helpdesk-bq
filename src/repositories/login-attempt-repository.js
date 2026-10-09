const { randomUUID } = require('node:crypto');
const db = require('../../db/db');

// Janela do bloqueio (RF02): 3 falhas em 5 min → 10 min travado.
const WINDOW_MINUTES = 5;
const MAX_FAILURES = 3;
const LOCK_MINUTES = 10;

function record(email, success, at = new Date().toISOString()) {
  db.prepare(
    'INSERT INTO login_attempts (id, email, success, created_at) VALUES (?, ?, ?, ?)',
  ).run(randomUUID(), String(email).toLowerCase().trim(), success ? 1 : 0, at);
}

function recentFailures(email, at = Date.now()) {
  const since = new Date(at - WINDOW_MINUTES * 60 * 1000).toISOString();
  return db
    .prepare(
      'SELECT created_at FROM login_attempts WHERE email = ? AND success = 0 AND created_at >= ? ORDER BY created_at DESC',
    )
    .all(String(email).toLowerCase().trim(), since);
}

// Trava a partir da falha que completa a trinca na janela, por LOCK_MINUTES.
// recentFailures já filtra a janela de 5 min: havendo 3+, a mais nova dispara.
function lockedUntil(email, at = Date.now()) {
  const failures = recentFailures(email, at);
  if (failures.length < MAX_FAILURES) return null;
  const newest = new Date(failures[0].created_at).getTime();
  return newest + LOCK_MINUTES * 60 * 1000;
}

function prune() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  db.prepare('DELETE FROM login_attempts WHERE created_at < ?').run(cutoff);
}

module.exports = { record, recentFailures, lockedUntil, prune, WINDOW_MINUTES, MAX_FAILURES, LOCK_MINUTES };
