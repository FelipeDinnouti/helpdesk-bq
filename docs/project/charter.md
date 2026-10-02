---
title: Project charter
type: project
tags: [project, charter]
---

# Project charter

## Mission

Build a working, good-looking helpdesk application for the school assignment
due **Oct 9th**. Grading weights **looks above functionality**, but the app
must run end to end (boot, routes respond, data persists, no dead screens).

## Goals

- Complete core flows working: whatever the assignment spec requires
  (spec lives in `Apostila_Operacao_Software_Confiavel.pdf` — **unread as of
  2026-10-02, read it only on user instruction**).
- Every screen visually coherent: one shell, one header/nav, consistent
  cards/tables/buttons/forms/state panels.
- Every screen truthful: loading/empty/error states, no invented numbers, no
  blank failures.
- Small approved pattern set, reused — not reinvented per screen.

## Non-goals

- No exhaustive feature matrix; completeness of the required flows beats
  breadth.
- No global redesigns mid-sprint once the visual language locks.
- No fake data in the shipped app (labeled deterministic seed data is fine).
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
