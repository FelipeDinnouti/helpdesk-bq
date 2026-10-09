---
title: Passo 02 — banco de dados
type: plano
updated: 2026-10-09
tags: [plano, backend, banco, migracoes, seed]
---

# Passo 02 — banco de dados

**Entrega:** migrações versionadas que criam o schema inteiro, seed
determinístico que recria a demonstração, e um `db.js` que isola o acesso.

## Decisões deste passo (já travadas no plano-mestre)

- SQLite em arquivo via `better-sqlite3`; Postgres é o alvo, schema portátil.
- Tabelas: `users`, `categories`, `tickets`, `comments`, `ticket_history`,
  `login_attempts`. `owner_id` existe e é anulável (G2). `category_id` existe e
  é anulável (G3).
- Soft delete por `deleted_at` (G6). Listas excluem apagados por padrão.

## Escopo

- `db/db.js`: abre `DB_PATH`, `pragma foreign_keys = ON`, exporta a conexão.
  Um único ponto de acesso — repositórios futuros não importam `better-sqlite3`
  direto.
- `db/migrate.js`: lê `db/migrations/*.sql` em ordem, aplica os pendentes,
  registra em `_migrations`. Idempotente: rodar duas vezes não quebra.
- Migrações (SQL portátil — tipos TEXT/INTEGER, sem dialeto):
  - `001_users.sql` — `users(id TEXT PK, name, email UNIQUE, password_hash,
    role CHECK(requester|technician|admin), active INTEGER 1, created_at)`.
  - `002_categories.sql` — `categories(id TEXT PK, name UNIQUE, active 1)`.
  - `003_tickets.sql` — `tickets(id PK, title CHECK(length 10–100),
    description CHECK(length 30–5000), priority CHECK(low|medium|high|critical),
    status CHECK(open|analysis|in_progress|resolved|closed) DEFAULT open,
    requester_id → users, owner_id → users NULL, category_id → categories
    NULL, deleted_at NULL, created_at, updated_at)`. Índice `(status, priority)`.
  - `004_comments.sql` — `comments(id PK, ticket_id → tickets, author_id →
    users, body CHECK(length 1–1000), created_at)`.
  - `005_ticket_history.sql` — `ticket_history(id PK, ticket_id, actor_id,
    event, before NULL, after NULL, created_at)`. Índice `(ticket_id)`.
  - `006_login_attempts.sql` — `login_attempts(id PK, email, success 0/1,
    created_at)`. Índice `(email, created_at)`.
- Datas em UTC ISO-8601 como TEXT; IDs `crypto.randomUUID()` gerados no código.
- `db/seed.js`: limpa e recria — 3 usuários (`admin@exemplo.local`,
  `tecnico@exemplo.local`, `lia@exemplo.local`, senha `senha123`), 5 categorias
  (Hardware, Software, Rede, Acesso, Impressão), **12 chamados** 3/3/3/2/1 com
  prioridades distribuídas, alguns comentários e histórico coerente.
  Determinístico: rodar duas vezes dá o mesmo estado.

## Fora de escopo

Repositórios por entidade (cada passo de API cria o seu, fino, sobre `db.js`).

## Aceite

- [ ] `rm -f db/helpdesk.db && npm run migrate && npm run seed` do zero, sem erro.
- [ ] 12 chamados contáveis, 3 usuários, 5 categorias; CHECKs rejeitam título
      curto, prioridade inválida e status inválido (provado com inserts que
      falham).
- [ ] `git diff --check` limpo; `*.db` ignorado pelo git.
