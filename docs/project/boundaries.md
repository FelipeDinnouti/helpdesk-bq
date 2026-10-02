---
title: Boundaries and scope rules
type: project
tags: [project, boundaries, safety]
---

# Boundaries and scope rules

Operative source alongside `.opencode/agents/project-manager.md`.

## Writable areas (nothing frozen)

| Path | What it is |
|---|---|
| `src/` | Express app: `app.js`, `server.js`, `routes/`, `controllers/`, `services/`, `repositories/` |
| `public/` | Static frontend (HTML/CSS/JS) — the graded surface |
| `db/` + `migrations/` | Schema + seeds |
| `middlewares/` | Express middlewares |
| `tests/` | Assignment test suite |
| `docs/` + `memory/` | Decisions + working state |

## Scope

- Implementation scope is the whole app above. No frozen repos, no
  off-limits paths.
- Layering: SQL in `repositories/`, business rules in `services/`,
  HTTP in `controllers/`/`routes/`. Controllers stay thin.
- Endpoint/contract changes get a one-line decision-log entry. No silent
  semantic changes.

## Safety

- No secrets in source, docs, or memory.
- Migrations reversible; no destructive data loss on the assignment path.
- No fake data shipped as real. Deterministic seed data labeled as such.
- No history rewrites (no reset/force-push/shared rebase).
- Commits under standing authority: whenever a batch is green + reviewed,
  conventional message (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`,
  `chore:`).

## Canonical references

- `Apostila_Operacao_Software_Confiavel.pdf` — the assignment spec.
  **Do NOT read until the user says so** (user instruction 2026-10-02).
- `src/` + `public/` current code — the implementation baseline.
