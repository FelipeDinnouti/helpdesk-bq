---
title: Team and screens
type: project
status: source-of-truth
updated: 2026-10-02
tags: [project, team, screens, assignment, delegation]
---

# Team and screens

How work is delegated and how collaborators are addressed in every document,
commit and review.

---

## 1. The addressing convention (read this first)

**We never address a collaborator by name.** There are five of them; each owns
one screen; the screen is the identity.

> **"colaborador responsável por &lt;Screen&gt;"**
> *(the collaborator responsible for &lt;Screen&gt;)*

| Screen name (canonical, §3c of the glossary) | Addressing string |
|---|---|
| Login | colaborador responsável por **Login** |
| Lista | colaborador responsável por **Lista** |
| Novo chamado | colaborador responsável por **Novo chamado** |
| Detalhe | colaborador responsável por **Detalhe** |
| Dashboard | colaborador responsável por **Dashboard** |

Why this and not a name or a job title:

- It survives anyone being absent, swapped, or presenting.
- It is unambiguous when two people touch the same ticket.
- It maps 1:1 onto the deliverables that actually matter here: the five
  screens, their states, and their accessibility and responsiveness checks
  (Step 15, Step 16, Step 53).
- It stops code and presentation concentrating in one person.

**Banned:** "owner of X", "the frontend guy", "the tester", "designer". See
glossary §2 — `owner` is reserved for `ticket.owner_id`. The verb *owns* is
allowed ("owns one screen"); the banned form is the **noun** `owner` applied to
a person.

---

## 2. The five screens and what each collaborator must deliver

Screens come from **Step 15** and are the only thing we took verbatim from
it. Everything else in this section is us deciding what a screen must have —
keep the rules, they are the ones worth keeping.

Each collaborator owns one screen **end to end**: markup, every state,
accessibility, the 360 px layout, and the tests that screen's rules deserve.
Nothing is handed off half-done.

### 2.1 colaborador responsável por **Login**

| Property | Value |
|---|---|
| Screen id | `login` |
| From the spec | Step 15 row 1 · RF01, RF02 · Passo 32 (auth) · Passo 30 error contract |
| Required elements | e-mail, password, submit action, feedback |
| Alternative state | **Error and lockout** — third failure locks for 10 min; the response must not reveal whether the e-mail exists |
| Rules | 3 failures / 5 min → 10 min lock (RF02). Invalid credentials never say which field failed (US-01). |
| States to prove | idle, submitting, wrong credentials, locked (423), network error |
| A11y | labels tied to inputs, error announced and next to the field, focus moves to the message |
| Verified by | CT for lockout, one negative API test, keyboard-only run |

### 2.2 colaborador responsável por **Lista**

| Property | Value |
|---|---|
| Screen id | `list` |
| From the spec | Step 15 row 2 · RF06, RF09 · Passo 48 (pagination + ordering) |
| Required elements | filters (status, priority), status and priority of each row, pagination |
| Alternative state | **Empty and loading** — RF14: explain the absence and offer a useful action |
| Rules | requester sees own tickets; technician sees the authorised queue (RF06 — see the `queue` gap, glossary §6) |
| States to prove | loading, results, empty, empty-with-filters, forbidden, network error |
| A11y | filters labelled, sort/filter state announced, table semantics, 360 px without horizontal scroll |
| Verified by | filter tests (isolated + combined), permission negative test, empty-state evidence |

### 2.3 colaborador responsável por **Novo chamado**

| Property | Value |
|---|---|
| Screen id | `new-ticket` |
| From the spec | Step 15 row 3 · RF03, RF04, RF05 · Passo 30 (Zod) · Passo 31 (submit) |
| Required elements | title, description, priority |
| Alternative state | **Validation and connection loss** |
| Rules | title 10–100 chars, description ≥ 30, priority ∈ low/medium/high/critical. `requester_id` comes from the token, never the body (RF03, Passo 28) |
| States to prove | idle, client invalid, server rejected (400), created (201 + id), offline, double-submit prevented |
| A11y | error summary, focus to first invalid field, busy button during submit (Passo 31) |
| Verified by | boundary values 9/10/100/101 and 29/30, unknown priority rejected, `201` + persisted row |

### 2.4 colaborador responsável por **Detalhe**

| Property | Value |
|---|---|
| Screen id | `detail` |
| From the spec | Step 15 row 4 · RF06, RF08, RF10, RF11, RF12 · Passo 29 (transitions) · Passo 45 (state diagram) |
| Required elements | ticket data, history, comments, actions |
| Alternative state | **Without permission** — 403, and no data leaks |
| Rules | transitions `open → analysis → in_progress → resolved → closed`; `resolved → in_progress` (reopen) allowed; closing requires a comment (RF12); every change writes history (RF08) |
| States to prove | full, no-permission (403), not-found (404), invalid-transition conflict (409), critical-without-resolution-comment |
| A11y | status not conveyed by colour alone, history as a list with timestamps, action buttons describe their action |
| Verified by | full transition matrix (positive + negative), history assertion on every transition, permission test |
| **Blocked on** | `queue` and `owner_id` decisions (glossary §6) |

### 2.5 colaborador responsável por **Dashboard**

| Property | Value |
|---|---|
| Screen id | `dashboard` |
| From the spec | Step 15 row 5 · RF13, RF14 · Passo 62 (blocks) · Passo 61 (metrics) |
| Required elements | totals by status, totals by priority, filters, period |
| Alternative state | **No data** — RF14 |
| Rules | totals respect the same filters as the list; empty is comprehensible, not blank |
| States to prove | totals, filtered, empty, loading, error |
| A11y | each total labelled with its meaning, not a bare number; filters labelled; works at 360 px |
| Verified by | report test (totals match the list), empty-state evidence, visual check |
| **Blocked on** | `queue` and the unassigned Dashboard role (glossary §6, gap **G2**) |

---

## 3. Cross-screen contracts (nobody owns these alone)

These are shared; the PM coordinates, and the named collaborators agree before
implementation:

| Contract | Screens involved | Spec |
|---|---|---|
| Screen shell, header, nav, spacing/type/colour roles | all five | RNF02, RNF03 |
| Error envelope `{ error: { code, message, correlationId } }` | all five | RF15, Passo 20 |
| Loading / empty / error state pattern | all five | RF14, RNF03 |
| Status + priority enum→label map (glossary §3b) | Lista, Detalhe, Dashboard | RF05, RF11 |
| Log events and `correlationId` | all five | RNF07, Passo 33 |
| 360 px baseline | all five | RNF02, Step 53 |

**Rule:** the *first* screen to need a shared
pattern proposes it; ui-designer owns the visual direction; PM locks it in
`docs/` before a second screen reuses it.

---

## 4. Delegation checklist

Before handing a screen to a collaborator, the PM provides:

1. The screen row from Step 15 (elements + alternative state) and this file's
   §2 block for that screen.
2. The requirement IDs the screen must satisfy (RF/RNF).
3. The shared contracts in §3, or a link to them.
4. The visual language reference once locked.
5. Acceptance criteria, in testable form.

The collaborator returns: markup + states, a11y and 360 px evidence, focused
tests, and a walkthrough the reviewer can re-run.

---

## 5. Team model — ours, not the spec's

The spec organises the class into two groups with four rotating roles and a
release committee. **We are not doing that.** Five people, five screens, one
screen each, and the review/discipline work folded into the agent workflow
(`ui-designer` proposes and implements the visual direction, `code-reviewer`
gates every batch, PM owns process and docs).

What we still take from the spec, because it is cheap and it is graded:

- Each student opens or reviews at least one pull request traceable to a story
  (Passo 25).
- Nobody hides a known defect; nothing is called done without evidence
  (Orientation p. 6, challenge rules).

What we drop: the two-group split, role rotation, the pass that expects two
signatures, and the per-meeting ceremony. Details of what is kept per screen
are in [[reference/spec-map#3-what-we-use]].

> **Recorded 2026-10-02:** "five collaborators, one screen each" is ours. The
> spec never says five; its screen list (Step 15) is exact and is what we
> used. Addressing is by screen, never by name.

---

## Related

- [[reference/glossary]] — screen ids, the enum→label map, the addressing
  string, banned words
- [[reference/spec-map]] — the Step 15 row and every requirement behind §2
- [[project/charter]] · [[project/boundaries]] · [[workflow/roles-and-gates]]
