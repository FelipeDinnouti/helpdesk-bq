# TASK-01 — helpdesk-bq build

Status: **workflow scaffold complete 2026-10-02 (uncommitted). Awaiting
user's next step (likely spec read).**

Authority: `docs/` holds decisions; **this file is the operative plan while
open.** Retrospectives go to the cycle ledger at write time, never
accumulate here.

## 1. Locked

- 3-persona workflow adapted from tessilion; all app dirs writable; nothing
  frozen.
- 2-round review cap per batch; DOC batched silently.
- Looks-first: visual PASS mandatory on UI batches; ui-designer first-class.
- Standing commit authority, conventional commits.
- Spec PDF unread until user says so.

## 2. Done

- [x] `.opencode/agents/{project-manager,code-reviewer,ui-designer}.md`
- [x] `.opencode/commands/microfix.md`
- [x] `docs/` vault (README, project, workflow, decisions, reference, cycles)
- [x] `memory/{STATE,TASK-01}.md`

## 3. Next (proposed, awaiting user)

1. Read spec (on user order) → slice list with acceptance per slice.
2. Lock visual language early (shell, nav, cards/tables, buttons, forms,
   states, spacing, type, color roles) via ui-designer proposal.
3. Build slice by slice: implement → verify (boot/smoke, `diff --check`) →
   visual PASS → reviewer PASS → commit per batch.
4. Keep ledger rows + decision-log lines as we go.

## 4. Open questions for user

- Read the PDF now or keep waiting?
- Which slice first (or spec order)?
- Any grading rubric details beyond looks-first + must-work?
