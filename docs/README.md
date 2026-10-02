---
title: helpdesk-bq documentation
type: index
status: source-of-truth
updated: 2026-10-02
tags: [index, helpdesk-bq]
---

# helpdesk-bq documentation

> **Docs is the source of truth.** `memory/` holds only current state,
> direction, and next steps. Anything *decided* lives here.

## Start here

| If you want to… | Read |
|---|---|
| **Write code, name something, or write a commit** | [[reference/glossary]] — the naming contract. Read this first. |
| **Know what you own and what to hand over** | [[project/team-and-screens]] — five screens, five collaborators |
| **Check what the assignment PDF demands** | [[reference/spec-map]] — indexed, and what we actually use |
| Know what the project is | [[project/charter]] |
| Know what you may touch | [[project/boundaries]] |
| Know what gates a change | [[workflow/roles-and-gates]] |
| See current state and what's next | `../memory/STATE.md` |
| Understand a past decision | [[decisions/decision-log]] |
| See what is built and what is not | [[cycles/README]] |

## Reference

- [[reference/glossary]] — **canonical vocabulary, banned synonyms, enums, ID
  conventions, open word gaps.** Binding on code, screens, tests and docs.
- [[reference/spec-map]] — the 102-page assignment PDF: structure, the 15 RFs,
  8 RNFs, API contract, data model, seed, rubric, lookup index of all 67 steps,
  plus 11 gaps the spec leaves open.
- [[reference/verification-pitfalls]] — ways green checks don't mean it works
- [[reference/known-issues]] — deferred items, open questions

## Project

- [[project/charter]] — mission, goals, non-goals, baseline
- [[project/boundaries]] — scope, safety, writable areas
- [[project/team-and-screens]] — screen assignment, the
  `colaborador responsável por <Screen>` convention, per-screen deliverables,
  shared cross-screen contracts

## Workflow

- [[workflow/roles-and-gates]] — roles, approval model, verification gates,
  review budget (2 rounds), visual gate
- [[workflow/micro-change-lane]] — the lightweight lane + `/microfix`

## Decisions

- [[decisions/product-decisions]] — approved product decisions
- [[decisions/decision-log]] — chronological record

## Cycles

See [[cycles/README]] for the index with status per cycle.

## Conventions

- Every file carries YAML front matter with `title`, `type`, and `tags`.
- One concept, one word. If the word is not in the glossary, it does not go
  into an identifier yet.
- Decision records are kept when superseded, marked superseded with a link —
  reasoning is worth more than conclusions.
- Relative links use `folder/note` form.
