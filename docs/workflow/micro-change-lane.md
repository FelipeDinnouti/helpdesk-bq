---
title: Micro-change lane and the /microfix command
type: workflow
tags: [workflow, microfix]
---

# Micro-change lane

Readable copy. Operative source:
`.opencode/agents/project-manager.md`.

## When the lane applies (ALL must hold)

- Explicit, local, small, reversible; one component or cohesive file set.
- Visual, copy, spacing, alignment, a11y, or minor interaction polish within
  an approved direction.
- No new endpoint, data model, permission, route, dependency, global theme,
  architecture, or business behavior.
- No live mutation beyond the assignment's normal CRUD; no new decision.
- Doesn't change what the component *is*. "Different kind of thing now" =
  never a micro-change.

## Execution

1. One-sentence scope, confirm low risk. 2. Smallest change. 3. Focused
   checks (+ boot/smoke when rendering/routes affected) + `git diff --check`.
   4. A11y/responsive glance for UI. 5. Report files + evidence + risk.

## What it doesn't skip

- No new plan entry required. Record in `docs/` when a decision/scope/
  contract/verification state changes; in `memory/` when state/next steps
  change.
- Full reviewer gate still required before commit when behavior, data,
  contracts, a11y, shared styles, routes, or several surfaces are touched.
- Never bypasses a safety rule.

## The `/microfix` command

`.opencode/commands/microfix.md`, `/microfix <description>`. Selects this
lane, adds nothing. Restart OpenCode after creating/editing commands.
