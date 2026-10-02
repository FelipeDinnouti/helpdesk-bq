---
title: Decision log
type: decision-log
tags: [decisions, chronological]
---

# Decision log

One line per material decision: date + decision + why.

## 2026-10-02 — workflow scaffold

- Replicated tessilion's 3-persona workflow (project-manager / ui-designer /
  code-reviewer) + `/microfix`, adapted: all dirs writable, nothing frozen.
- Review budget tightened 3 → **2 rounds per batch** for the Oct 9 deadline.
- Looks-first: visual PASS mandatory on UI batches; ui-designer first-class.
- Standing commit authority granted: conventional commits whenever a batch is
  green + reviewed.
- Assignment PDF (`Apostila_Operacao_Software_Confiavel.pdf`) deliberately
  unread until the user says so.
- Stack refs generalized (Express `src/` + static `public/` + `db/` +
  `middlewares/`); tessilion's React/Vite/TSL/Java specifics dropped.
