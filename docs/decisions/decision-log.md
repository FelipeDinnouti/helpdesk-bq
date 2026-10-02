---
title: Decision log
updated: 2026-10-02
type: decision-log
tags: [decisions, chronological]
---

# Decision log

One line per material decision: date + decision + why.

## 2026-10-02 — vocabulary locked

- **`ticket` is the single canonical noun** for the ticket concept, in every
  identifier surface. Why: the user set this rule; one word per concept is what
  makes delegation and review possible.
- **One declared display alias: `chamado`**, allowed only in pt-BR
  user-visible strings and prose, never in a table, column, route, enum, log
  event, test name or file name. Why: the audience and the spec's product
  language are Brazilian; the code stays English. Reversible in one line if
  the team prefers `ticket` everywhere.
- **Collaborators are addressed by assignment, never by name:** "collaborador
  responsável por *Login*". `owner` is reserved for `ticket.owner_id`. Why:
  survives absence and rotation, unambiguous in reviews, enforces the one
  person-one screen split.
- **Five screens, five collaborators**, screen list taken verbatim from Step 15
  (Login, Lista, Novo chamado, Detalhe, Dashboard). The spec never says five;
  our class has five. Why: it is our staffing decision, not a spec requirement.
- **The API contract, RF01–RF15, RNF01–RNF08, data model and seed are adopted
  as written.** Why: they are the best-written part of the PDF and adopting
  them deletes a whole class of decisions.
- **Spec process is dropped**: two groups, rotating roles, 16-meeting schedule,
  double-signed gates, release-committee timings, printable evidence sheets.
  Kept: visible commit authorship, every batch reviewed by a non-author, no
  hidden defects, reproducible demo. Why: the class does not want the PDF's
  rules followed and wants the work done well in the time available.
- **Dropped `evidencias/` and `qualidade/` directories** (*Entregáveis e convenção
  de arquivos*, Orientation p. 10). Why: evidence lives with `docs/` and metrics live in the cycle
  ledger; two more top-level folders would only dilute the dossier.

## 2026-10-02 — workflow scaffold

- Replicated tessilion's 3-persona workflow (project-manager / ui-designer /
  code-reviewer) + `/microfix`, adapted: all dirs writable, nothing frozen.
- Review budget tightened 3 → **2 rounds per batch** for the Oct 9 deadline.
- Looks-first: visual PASS mandatory on UI batches; ui-designer first-class.
- Standing commit authority granted: conventional commits whenever a batch is
  green + reviewed.
- Assignment PDF (`Apostila_Operacao_Software_Confiavel.pdf`) deliberately
  unread until the user says so.
  — **superseded 2026-10-02**: the user released it and it has been read and
  indexed in [[reference/spec-map]]; see the vocabulary-locked block above.
- Stack refs generalized (Express `src/` + static `public/` + `db/` +
  `middlewares/`); tessilion's React/Vite/TSL/Java specifics dropped.
