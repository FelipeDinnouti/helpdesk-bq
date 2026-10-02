# helpdesk-bq — Transient State & Session Handoff

Last updated: **2026-10-02**. **Workflow scaffold complete (uncommitted):
3 personas + `/microfix` + docs vault + this file + `memory/TASK-01.md`.
Assignment PDF deliberately unread. Next: user guides the first build step
(likely: read spec → slice plan → visual language → build).**

> **Operating principle:** `docs/` is the source of truth. This file is
> transient working state: where things stand, what to do next, what not to
> repeat. Decisions belong in `docs/`; status belongs here.

## 1. Read these, in order

1. **This file** — where things stand.
2. **`memory/TASK-01.md`** — the operative plan.
3. **`docs/README.md`**, then the relevant file under `docs/`.

## 2. Current state

- **Workflow:** tessilion's system replicated and adapted (all writable,
  2-round review cap, looks-first visual gate, standing commit authority
  with conventional commits). Details: `docs/decisions/decision-log.md`
  §2026-10-02.
- **App:** skeleton only. Express stubs (`src/app.js`, `src/server.js`),
  empty `routes/`/`controllers/`/`services/`/`repositories/`,
  `middlewares/` (`.gitkeep`), `db/migrations/`, `public/` (`.gitkeep`),
  `tests/` (`.gitkeep`).
- **Spec:** `Apostila_Operacao_Software_Confiavel.pdf` present, **NOT read**
  per user instruction. Do not read until told.
- **Decisions locked:** §2026-10-02 decision-log (scope, budgets, gates,
  commit authority).
- **Open:** visual language (highest-leverage early task), test setup,
  first build slices (await spec).

## 3. Next

User guides the next step. Expected sequence once unleashed: read spec →
slice plan in `TASK-01.md` → lock visual language via ui-designer → build
slice by slice (verify → visual PASS → reviewer PASS → commit per batch).

## 4. Constraints

- PDF off-limits until user says so.
- Review budget: 2 rounds/batch; DOC batched, never blocking alone.
- Visual PASS mandatory on UI batches.
- Standing commit authority: conventional commits whenever green + reviewed.
- No secrets in source/docs/memory. No history rewrites.

## 5. Do not repeat (inherited from tessilion, paid for in rounds)

- No unreviewed batch in a commit; gate fires per batch.
- Every finding gets a ledger row before the fixing commit.
- Assert scripted edits landed; confirm by reading changed lines.
- Mutation-check bug-fix tests.
- Smoke ≠ visual; suite-green ≠ works.

## 6. Repository map

| Path | What it is |
|---|---|
| `docs/` | source of truth |
| `memory/STATE.md` | this file — entry point |
| `memory/TASK-01.md` | operative plan |
| `.opencode/agents/` | personas — workflow authority |
| `.opencode/commands/` | `/microfix` |
| `src/` `public/` `db/` `middlewares/` `tests/` | the app (all writable) |
