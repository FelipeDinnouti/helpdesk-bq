---
title: Known issues
type: reference
updated: 2026-10-02
tags: [reference, issues]
---

# Known issues

Deferred items, follow-ups, open questions. One row each with status.

## Open decisions from the spec

The gaps the assignment PDF leaves open, extracted in
[[reference/spec-map]] §5. Each needs a decision-log line before code depends
on it — none may be invented silently.

| # | Gap | Blocks | Status |
|---|---|---|---|
| G1 | `ticket.owner_id` missing from the Passo 26 migration although RF08 needs it; Passo 48 uses *owner* a third time, for the requester ("owner do token") | Detalhe | open — decide with G2 |
| G2 | "Queue" / *fila* never defined, yet RF06 and Passo 44 depend on it. **Dashboard role unassigned:** US-10 gives the totals to *gestora*/Márcia, who maps to no seeded role; Passo 44 R6 gives admin "administra + audita" | Detalhe **and** Dashboard | open — decide with G1 |
| G3 | Status enum exists in two vocabularies (prose pt-BR vs code enum) | Lista | **resolved** — map written in glossary §3b (1:1 from RF11/Passo 29/Passo 34) |
| G4 | No comments endpoint (RF10) and no delete route (RF07) in Step 20 | Detalhe | open — needs a contract addition + decision-log line |
| G5 | `priority` collides: ticket priority vs defect priority | — | **resolved** in glossary §2 (qualified names) |
| G6 | `requester_id` / "common user" / "solicitante" are one role with three names | — | **resolved** in glossary §2 (`requester` canonical) |
| G7 | Two `correlationId` formats: `req_7f31…` sample vs raw UUID in the Passo 27 code | logs | open — pick one |
| G8 | Reopen of a closed ticket: who, and within what deadline | Detalhe | open — Passo 12 asks, Passo 29 code implies otherwise |
| G9 | Deletion semantics: physical, logical, or auditable archive | Detalhe | open — Passo 12 asks, RF07 assumes it exists |
| G10 | Pagination size and ordering unspecified | Lista | open — two people would guess differently |
| G11 | Description ceiling of 5 000 exists only in the Passo 30 Zod sample | Novo chamado | open — adopt and note, or drop |

## Project

| # | Item | Status |
|---|---|---|
| 1 | Visual language not yet established (highest-leverage early task) | open |
| 2 | Test setup in `tests/` empty (`.gitkeep` only) | open |
| 3 | `middlewares/` at repo root vs the spec's `src/middlewares/` | open — decide once, be consistent |
| 4 | `evidencias/` and `qualidade/` dirs from the spec not created | closed — skipped by decision, evidence lives in `docs/` |
| 5 | ui-designer has never inspected a rendered surface (there is no UI yet) | open — first task of the build phase |
| 6 | G1+G2+G4 together block the Detalhe screen, which is the most complex of the five | open — highest-leverage decision remaining |

*Scaffolded 2026-10-02. Spec read and indexed 2026-10-02.*
