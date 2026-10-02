# TASK-01 — helpdesk-bq build

Status: **spec read and indexed; vocabulary and team model locked (2026-10-02).
Docs batch awaiting reviewer gate. Build phase not started — no UI exists.**

Authority: `docs/` holds decisions; **this file is the operative plan while
open.** Retrospectives go to the cycle ledger at write time, never accumulate
here.

## 1. Locked

- `ticket` is the canonical noun; pt-BR alias `chamado` in UI strings only.
- Five collaborators, one screen each, addressed as "colaborador responsável
  por <Screen>", never by name.
- RF01–RF15, RNF01–RNF08, the Step 20 API contract, the Passo 19/26 data
  model and the Passo 34 seed are adopted verbatim.
- The PDF's process rules are **not** followed.
- 2-round review cap; DOC batched; visual PASS mandatory on UI batches;
  standing commit authority, conventional commits.

## 2. Done

- [x] `.opencode/agents/{project-manager,code-reviewer,ui-designer}.md`
- [x] `.opencode/commands/microfix.md`
- [x] `docs/` vault (README, project, workflow, decisions, reference, cycles)
- [x] Read + index the 102-page spec → `docs/reference/spec-map.md`
- [x] Vocabulary → `docs/reference/glossary.md`
- [x] Delegation basis → `docs/project/team-and-screens.md`
- [x] Index, charter, boundaries, decisions, known-issues refreshed

## 3. Next, in order

1. **Decide G1 + G2 + G4** (ticket `owner_id`, *fila*/queue, comments + delete
   routes) — one decision-log block. Blocks Detalhe.
2. **Lock the visual language** via ui-designer. Nothing renders yet; this is
   the highest-leverage hour available.
3. **Scaffold**: `package.json` scripts (dev/test/lint/start), `db/migrations`,
   `db/seed`, the Step 20 routes wired thin (controllers → services →
   repositories), error handler + correlationId.
4. **Build the five screens**, one batch each, in dependency order:
   Login → Novo chamado → Lista → Detalhe → Dashboard.
   Per batch: implement → verify (`git diff --check`, boot, smoke, focused
   tests) → visual PASS → reviewer PASS → commit.
5. Incidental decisions as their screen arrives: G3 (status enum), G7
   (correlationId), G8 (reopen), G9 (delete semantics), G10 (pagination).

## 4. Open questions for the user

- Middlewares at root (as now) or in `src/` (as the spec says)? One choice,
  then consistency — `known-issues` #3.
- Do we want `docs/` to also carry the spec-named discovery documents
  (`01-termo-abertura.md`, `02-problema-personas.md`) for grading, or is the
  dossier optional for us?

## 5. Non-negotiables

- No unreviewed batch in a commit.
- Every reviewer finding gets a cycle-ledger row **before** the fixing commit.
- Assert scripted edits landed; confirm by reading the changed lines.
- No secrets anywhere. No history rewrites.
- A new noun enters the codebase only after `docs/reference/glossary.md` has
  an entry for it.
