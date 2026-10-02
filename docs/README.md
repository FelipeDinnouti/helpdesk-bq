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
| Know what the project is | [[project/charter]] |
| Know what you may touch | [[project/boundaries]] |
| Know who does what and what gates a change | [[workflow/roles-and-gates]] |
| See the current state and what's next | `../memory/STATE.md` |
| Understand a past decision | [[decisions/decision-log]] |
| See what is built and what is not | [[cycles/README]] |

## Project

- [[project/charter]] — mission, goals, non-goals, baseline
- [[project/boundaries]] — scope, safety, writable areas

## Workflow

- [[workflow/roles-and-gates]] — roles, approval model, verification gates,
  review budget (2 rounds), visual gate
- [[workflow/micro-change-lane]] — the lightweight lane + `/microfix`

## Decisions

- [[decisions/product-decisions]] — approved product decisions
- [[decisions/decision-log]] — chronological record

## Cycles

See [[cycles/README]] for the index with status per cycle.

## Reference

- [[reference/verification-pitfalls]] — ways green checks don't mean it works
- [[reference/known-issues]] — deferred items, open questions

## Conventions

- Every file carries YAML front matter with `title`, `type`, and `tags`.
- Decision records are kept when superseded, marked superseded with a link —
  reasoning is worth more than conclusions.
- Relative links use `folder/note` form.
