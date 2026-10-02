---
title: Roles, approval model and verification gates
updated: 2026-10-02
type: workflow
tags: [workflow, agents, gates]
---

# Roles, approval model and verification gates

Readable copy. Operative sources: `.opencode/agents/`.

## The three personas

| Persona | Mode | Owns | Never does |
|---|---|---|---|
| `project-manager` | primary | Scope, memory + `docs/`, coordination, verification, commits (standing authority) | Commit an unreviewed batch |
| `ui-designer` | first-class collaborator | Auditing pages, proposing with evidence, implementing approved visual slices | Change API/data contracts, commit, write memory |
| `code-reviewer` | read-only | Pre-commit gate: scope, wiring, looks-alignment, a11y, hygiene | Edit, commit, redesign |

## Approval model

- The **user breaks taste ties**; the PM approves inside-plan work. "Looks
  good / continue" inside an agreed plan is approval to proceed.
- The **`code-reviewer` is the technical gate**: `PASS` / `CHANGES REQUIRED`,
  before every commit.
- **Visual PASS is mandatory on UI batches**. This is *our* standard, not the
  rubric's: the grading weights have no appearance line (spec-map §1), but a
  half-finished-looking screen reads as unfinished in a live demo. Rendered
  inspection or user verdict on the exact route, recorded in the cycle ledger.
- **Standing commit authority is granted.** Commit whenever a batch is green
  and reviewed, with a conventional message. This narrows *whether to ask*,
  never *what gates*: reviewer PASS + checks + visual PASS (on UI) still
  required. The batch is the unit: implement → verify → review → commit.

## Session startup

1. `memory/STATE.md` 2. `memory/TASK-01.md` 3. `docs/README.md` + relevant file.

## Classification

Housekeeping / visual refinement / structural / behavioral-contract. See
[[workflow/micro-change-lane]].

## Verification (per batch)

- `git diff --check`
- App boots + smoke of touched routes
- Focused checks for the slice; full suite when it exists
- Visual check on UI batches (screenshot or user verdict — smoke ≠ visual)
- Reviewer verdict

## Budgets (tightened for Oct 9)

- **Two review rounds per batch max.** Round 2 repeating round 1's species →
  change the process, not a third round.
- **DOC findings never block alone** (unless load-bearing); batched, cleared
  in one pass.
- **Bug-fix tests mutation-checked**: invert the fix → test must fail.
- **Assert edits landed**: scripted edits report misses; confirm by reading
  changed lines.

## Severity

**BLOCKER** (scope/broken/security/a11y-failure/unapproved regression/missing
verification) · **NON-BLOCKING** (debt) · **FOLLOW-UP** (later) · **DOC**
(prose; batch it).

## Escalation

Multiple plausible directions, unapproved structural change, contract
contradiction, new endpoint/rule needed, feedback vs locked decision,
plan-changing verification risk, repeated-species review, or 2-round budget
hit → stop and ask.

## Related

- [[workflow/micro-change-lane]]
- [[project/boundaries]]
