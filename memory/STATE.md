# helpdesk-bq — Transient State & Session Handoff

Last updated: **2026-10-02**. **Spec read and indexed. Vocabulary locked.
Docs batch built, awaiting reviewer gate.** Assignment due **Oct 9th**.

> **Operating principle:** `docs/` is the source of truth. This file is
> transient working state: where things stand, what to do next, what not to
> repeat. Decisions belong in `docs/`; status belongs here.

## 1. Read these, in order

1. **This file** — where things stand.
2. **`memory/TASK-01.md`** — the operative plan.
3. **`docs/README.md`**, then **[[reference/glossary]]** — the naming
   contract — before writing any code, screen, test or commit.

## 2. Current state

- **App:** still a skeleton. Express stubs (`src/app.js`, `src/server.js`),
  empty `routes/`/`controllers/`/`services/`/`repositories/`,
  `middlewares/`, `db/migrations/`, `public/`, `tests/`. **No UI exists yet.**
- **Spec:** `Apostila_Operacao_Software_Confiavel.pdf` — **read 2026-10-02**,
  102 pages. It is a course *methodology* handbook, not a product spec.
  Indexed in [[reference/spec-map]].
- **Team model (ours, not the spec's):** five collaborators, one screen each,
  addressed as *"colaborador responsável por &lt;Screen&gt;"*. Never by name.
  [[project/team-and-screens]].
- **Vocabulary (locked 2026-10-02):** `ticket` is canonical; pt-BR display
  alias `chamado` allowed in UI strings only, never in identifiers.
  [[reference/glossary]].
- **Adopted verbatim from the spec:** RF01–RF15, RNF01–RNF08, the Step 20 API
  contract + error envelope, the Passo 19/26 data model, the Passo 34 seed
  (3 users, 12 tickets).
- **Dropped from the spec:** two groups, rotating roles, 16-meeting cadence,
  double-signed gates, release committee, printable evidence sheets.
- **Open and blocking:** G1 (`owner_id` missing from the migration), G2
  (*fila*/queue undefined, Dashboard role unassigned), G4 (no comments or
  delete route). Together these block **Detalhe**, the most complex screen.
- **Resolved this batch:** G3 (status/priority enum→label map is now in
  glossary §3b). **Open but not blocking:** G7–G11, decided as their screen
  comes up.

## 3. Next

1. **Decide G1 + G2 + G4** — one decision-log block. Unblocks Detalhe.
2. **Lock the visual language** via ui-designer (shell, nav, state panels,
   spacing, type, colour roles) before the first screen is built.
3. **Build the five screens**, one batch each: Login → Novo chamado → Lista →
   Detalhe → Dashboard (dependency order, not the spec's order).
   Each batch: implement → verify → visual PASS → reviewer PASS → commit.
4. Decide G7 (`correlationId` format), G8 (reopen), G9 (delete semantics),
   G10 (pagination) when the screen that needs them comes up.

## 4. Constraints

- **Do not follow the PDF's process rules.** Take the product contract, ignore
  the ceremony. The user said so explicitly.
- Review budget: 2 rounds/batch; DOC batched, never blocking alone.
- Visual PASS mandatory on UI batches.
- Standing commit authority: conventional commits whenever green + reviewed.
- No secrets in source/docs/memory. No history rewrites.
- New noun in code → entry in `docs/reference/glossary.md` first.

## 5. Do not repeat (inherited from tessilion, paid for in rounds)

- No unreviewed batch in a commit; gate fires per batch.
- Every finding gets a ledger row before the fixing commit.
- Assert scripted edits landed; confirm by reading changed lines.
- Mutation-check bug-fix tests.
- Smoke ≠ visual; suite-green ≠ works.

## 6. Repository map

| Path | What it is |
|---|---|
| `docs/README.md` | docs index — start here |
| `docs/reference/glossary.md` | **naming contract — read before writing code** |
| `docs/project/team-and-screens.md` | five screens, five collaborators, per-screen deliverables |
| `docs/reference/spec-map.md` | the PDF indexed; what we use; gaps G1–G11 |
| `docs/decisions/decision-log.md` | every locked decision, one line each |
| `memory/STATE.md` | this file — entry point |
| `memory/TASK-01.md` | operative plan |
| `.opencode/agents/` | personas — workflow authority |
| `.opencode/commands/` | `/microfix` — the micro-change lane |
| `src/` `public/` `db/` `middlewares/` `tests/` | the app (all writable) |
