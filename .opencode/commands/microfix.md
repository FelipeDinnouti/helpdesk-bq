---
description: Apply a small, low-risk adjustment without the full design cycle
agent: project-manager
---
The user requested a micro-change:

$ARGUMENTS

Act as the helpdesk-bq project-manager. First read `memory/STATE.md` and
`docs/README.md`, then restate the requested scope in one sentence and
classify it as a micro-change or a full-workflow change.

Eligible only when explicit, local, reversible, and limited to a small
cohesive file set; no new endpoint, data model, permission, route,
dependency, global theme/architecture change, business behavior, or live
mutation beyond the assignment's normal CRUD. If ambiguous or any criterion
fails, use the normal workflow instead of forcing the lightweight path. A
fix that changes what the component *is* (not just how it looks) is never a
micro-change.

For an eligible micro-change:

1. Inspect the current implementation; name exact files.
2. Make the smallest local change satisfying the request.
3. Run focused checks (plus boot/smoke when rendering or routes affected)
   and `git diff --check`.
4. Quick accessibility/responsive check for UI changes.
5. Full `code-reviewer` gate still required before commit when behavior,
   data, contracts, a11y, shared styles, routes, or several surfaces are
   touched; otherwise commit under standing authority with conventional
   message.
6. Report scope, files changed, evidence, remaining risk. Update `memory/`
   only if state/next steps changed; update `docs/` if a decision, scope,
   contract, or verification state changed.

If `$ARGUMENTS` is empty, ask for a concrete description instead of working.
