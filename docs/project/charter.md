---
title: Project charter
updated: 2026-10-02
type: project
tags: [project, charter]
---

# Project charter

## Mission

Build a working, good-looking helpdesk application for the school assignment
due **Oct 9th**. The rubric's heaviest weights are **implementation (20%)**
and **test techniques (20%)**, with **no appearance line item** (see
[[reference/spec-map]] §1). Looks decide how the live demo reads, not the
score — so the app must run end to end (boot, routes respond, data persists,
no dead screens) *and* look finished.

## Goals

- Complete core flows working: login → open → triage → handle → close →
  report. The assignment contract is extracted in [[reference/spec-map]] §3 —
  five screens, RF01–RF15, RNF01–RNF08, the Step 20 API contract, the Passo 19
  data model.
- Every screen visually coherent: one shell, one header/nav, consistent
  cards/tables/buttons/forms/state panels.
- Every screen truthful: loading/empty/error states, no invented numbers, no
  blank failures.
- Small approved pattern set, reused — not reinvented per screen.
- The five screens are owned one-per-collaborator and verifiable against the
  checklist in [[project/team-and-screens]] §2.

## Non-goals

- **We do not follow the PDF's process.** Two groups, rotating roles, meeting
  cadence, double-signed gates, printable evidence sheets — all dropped. See
  [[reference/spec-map]] §3.4 for the line.
- No exhaustive feature matrix; completeness of the required flows beats
  breadth.
- No global redesigns mid-sprint once the visual language locks.
- No fake data in the shipped app (the Passo 34 seed is deterministic and
  labelled as seed).
- No production hardening beyond the assignment (no deploy pipeline, no
  multi-env ops).

## Baseline

Repo skeleton at scaffold time: Express stubs (`src/app.js`, `src/server.js`),
empty `routes/`/`controllers/`/`services/`/`repositories/`, empty
`middlewares/`, `db/migrations/`, empty `public/`, empty `tests/`. The
visual language is not yet established — establishing it early is the
highest-leverage design task.

## Deliverable standard

A UI batch commits only after: checks pass, `code-reviewer` PASS, and a
visual PASS (rendered inspection or user verdict). A passing smoke test is
not visual approval.
