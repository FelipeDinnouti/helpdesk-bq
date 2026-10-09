CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL CHECK (length(title) >= 10 AND length(title) <= 100),
  description TEXT NOT NULL CHECK (length(description) >= 30 AND length(description) <= 5000),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'analysis', 'in_progress', 'resolved', 'closed')),
  requester_id TEXT NOT NULL REFERENCES users(id),
  owner_id TEXT REFERENCES users(id),
  category_id TEXT REFERENCES categories(id),
  deleted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ticket_filter ON tickets(status, priority);
CREATE INDEX IF NOT EXISTS idx_ticket_requester ON tickets(requester_id);
