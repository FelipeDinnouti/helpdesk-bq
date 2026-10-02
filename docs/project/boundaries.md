---
title: Boundaries and scope rules
updated: 2026-10-02
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

- `Apostila_Operacao_Software_Confiavel.pdf` — the assignment spec (102 pages).
  **Read 2026-10-02.** Indexed in [[reference/spec-map]]; nobody needs to
  reread it. The binding subset is spec-map §3.
- [[reference/glossary]] — the naming contract. Binding on every identifier.
- [[project/team-and-screens]] — screen assignment and per-screen deliverables.
- `src/` + `public/` current code — the implementation baseline.

## Naming

Any new noun in the codebase gets an entry in [[reference/glossary]] first,
with its banned synonyms. Existing spec vocabulary is adopted as written
(`ticket`, `requester`, `technician`, `admin`, `owner`, `comment`, `status`,
`priority`, `history`); the pt-BR display alias `chamado` is the single
declared exception and never appears in an identifier.
