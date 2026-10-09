CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL CHECK (length(body) >= 1 AND length(body) <= 1000),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comment_ticket ON comments(ticket_id);
