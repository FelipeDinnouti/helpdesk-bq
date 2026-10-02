---
title: Spec map — what the PDF says, and what we use
type: reference
status: source-of-truth
updated: 2026-10-02
tags: [reference, spec, pdf, index, requirements]
---

# Spec map

The assignment PDF is `Apostila_Operacao_Software_Confiavel.pdf` (102 pages,
102/102, "Operação Software Confiável — Do problema ao release", Prof. Paulo
Elana Eloi dos Santos, ETEC Bento Quirino). Read on **2026-10-02**.

**It is a course methodology handbook, not a product spec.** Five parts, 67
numbered steps, 12 printable evidence sheets, a rubric. The actual product
contract is scattered across Parts 01–03.

> **The PDF is gitignored** (`.gitignore`), so this file is the only spec
> reference anyone can open from a clone. Cite it carefully: if a claim here
> matters, it had better be right.

This file is the index: *what does the spec say about X*, and *are we using
it*. Nobody has to re-read 102 pages to find out.

---

## 1. The verdict, in one line

The assignment question is *does the HelpDesk BQ release have enough quality
to go to production?* (translated from Orientation p. 6).

Take the **product** (five screens, 15 functional + 8 non-functional
requirements, the API contract, the data model, the status/priority enums).
Ignore most of the **process** (two groups, rotating roles, per-meeting
check-ins, double-signed gates, the 16-meeting schedule).

The spec's own framing — "small enough for a class to build, rich enough to
force real quality decisions" — is exactly right. Its ceremony is not.

Worth knowing before we over-invest in polish: the rubric has **no line item
for appearance**. The heaviest weights are implementation (20%) and test
techniques (20%). Looks still decide how a live demo reads, but the grade does
not reward them directly — the safest read is that a screen that looks
finished and works beats a prettier screen that does not.

---

## 2. Structure

| Part | Pages | Steps | What it is about |
|---|---|---|---|
| Orientation | 1–10 | — | Journey, the challenge in one page, team split, deliverables |
| **01 Descoberta** | 11–25 | 1–14 | Opening term, stakeholders, personas, journey, stories, backlog, **RF01–RF15**, **RNF01–RNF08**, ambiguity handling |
| **02 Design e arquitetura** | 26–34 | 15–22 | **Low-fi prototype = the five screens**, accessibility, architecture, data model, **API contract**, threat modelling, testability |
| **03 Construção** | 35–52 | 23–39 | Environment, repo layout, Git/review, database, Express bootstrap, routes, services, validation, UI, auth, logs, seed, unit + API tests, CI, code review, code freeze |
| **04 Validação** | 53–71 | 40–57 | Test plan, risk-based testing, equivalence/boundary, decision tables, **state transitions**, exploratory, functional execution, integration, E2E, security, WCAG, performance, responsive, defect reporting, severity, traceability, regression |
| **05 Qualidade e release** | 72–87 | 58–67 | ISO 25010, quality policy, audit, metrics, dashboard, quality gate, cross-audit, surprise event, release committee, AI policy, portfolio, rubric |
| **06 Caderno de evidências** | 88–102 | Sheets 1–12 | Blank forms to print, glossary, references |

---

## 3. What we use

### 3.1 Product — taken verbatim

| # | Requirement | Screen it lands on | Primary screen's collaborator |
|---|---|---|---|
| RF01 | Authenticate an active user with valid credentials | Login | Login |
| RF02 | 3 invalid attempts in 5 min → lock the account for 10 min | Login | Login |
| RF03 | Only an authenticated user may create a ticket | Novo chamado | Novo chamado |
| RF04 | Title 10–100 chars; description ≥ 30 | Novo chamado | Novo chamado |
| RF05 | Priority ∈ baixa, média, alta, crítica | Novo chamado, Lista, Dashboard | Novo chamado |
| RF06 | Requester sees own tickets; technician sees the authorised queue | Lista, Detalhe | Lista |
| RF07 | Only admin may delete, with justification and audit | Detalhe | Detalhe |
| RF08 | Every status / priority / owner change writes history | Detalhe | Detalhe |
| RF09 | Filter by status and priority, alone or combined | Lista, Dashboard | Lista |
| RF10 | Comments up to 1 000 chars on an authorised ticket | Detalhe | Detalhe |
| RF11 | Transitions `open → analysis → in_progress → resolved → closed` | Detalhe | Detalhe |
| RF12 | A critical ticket cannot close without a resolution comment | Detalhe | Detalhe |
| RF13 | Report shows counts by status and priority, honouring filters | Dashboard | Dashboard |
| RF14 | Empty state explains the absence and offers a useful action | Lista, Dashboard | Lista |
| RF15 | API errors carry a code, a safe message and an identifier | all | PM — deliberately not a screen |

| # | Non-functional requirement | How we satisfy it |
|---|---|---|
| RNF01 | 95% of MVP responses ≤ 800 ms with 20 simulated users | measure, don't gate on it |
| RNF02 | Usable from 360 px, no horizontal scroll | every screen, verified |
| RNF03 | Contrast, focus and labels per WCAG 2.2 AA | every screen, verified |
| RNF04 | Strong password hash; secrets out of the repo | `.env.example`, no real secrets |
| RNF05 | Errors never expose stack, SQL, token or personal data | error envelope only |
| RNF06 | ≥ 70% line coverage on the core; 100% of critical rules tested | coverage on rules, not vanity |
| RNF07 | Structured logs: event, time, route, status, correlationId | logging middleware |
| RNF08 | CI runs lint and tests on every pull request | workflow file |

### 3.2 Contract — taken verbatim, because it is already written

Step 20 defines the API. It is the best thing in the PDF: routes, inputs,
outputs, the error envelope, and which status codes mean what. **We adopt it
as-is**, which also removes an entire class of decisions.

| Method + route | Input | Output |
|---|---|---|
| `POST /api/sessions` | email, password | 200 session · 401/423 safe error |
| `POST /api/tickets` | title, description, priority | 201 ticket created |
| `GET /api/tickets` | status?, priority? | 200 paginated list |
| `GET /api/tickets/:id` | id | 200 detail · 403 · 404 |
| `PATCH /api/tickets/:id/status` | status, comment? | 200 + history |
| `GET /api/reports/summary` | filters | 200 totals or empty state |

Error envelope (Step 20) and the status/message table (Passo 30):

| Situation | HTTP | External message |
|---|---|---|
| Invalid payload | 400 | Revise os campos destacados. |
| Unauthenticated | 401 | Autenticação necessária. |
| No permission | 403 | Ação não autorizada. |
| Not found | 404 | Recurso não encontrado. |
| State conflict | 409 | Transição não permitida. |
| Unexpected failure | 500 | Não foi possível concluir. Use o código de suporte. |

Data model (Passo 19 + Passo 26 migration), `users` · `tickets` ·
`comments` · `ticket_history` · `login_attempts`, with the `tickets` CHECK
constraints for title length, description length and the priority enum.

Seed (Passo 34): three fictional users by role
(`admin@exemplo.local`, `tecnico@exemplo.local`, `lia@exemplo.local`) and
**12 tickets** — 3 open, 3 analysis, 3 in progress, 2 resolved, 1 closed, with
priorities spread. Deterministic, labelled as seed. This is our demo dataset
and it is enough for every screen's non-empty state.

### 3.3 Design rules we keep

| Rule | Source | Why |
|---|---|---|
| One primary action per screen | Step 15 | Nothing competes for the click |
| Messages next to the field they describe | Step 15 | Errors you have to hunt for are not read |
| Coherent focus order; do not rely on colour alone | Step 15 | Accessibility and comprehension |
| Test the layout at 360 px | Step 15, RNF02 | RNF02 is a requirement |
| Semantics and layering: interface → routes/controllers → service → repository → db | Passo 17, Passo 24 | Thin controllers, testable services, injectable repository |
| `app.js` never calls `listen`; `server.js` does | Passo 27, Passo 24 | Supertest needs the app without a port |
| Validate at the boundary, rule in the service, stable error codes | Passo 28–30 | Single source of truth for the rules |
| Name tests after behaviour | Passo 35 | Readable failures |

### 3.4 Process — dropped

Two groups and four rotating roles (Step 8, Step 40) · the 16-meeting
schedule with check-in/check-out · double approval on gates · the pass that
expects two signatures · the release committee timings · the surprise-event
exercise · the printable evidence sheets as literal artefacts.

Kept anyway, because it is nearly free and it is graded: commit authorship is
visible, every batch is reviewed by someone who did not write it, no known
defect is hidden, and the demo is reproducible from the README.

---

## 4. Lookup index — the 67 steps

One line each, so "what did the spec say about X?" is a search, not a reread.

### Part 01 — Descoberta (1–14)

| Step | Says |
|---|---|
| 1 | Opening term: problem, objective, users, scope, success, risks |
| 2 | Stakeholders and interviews; separate fact from hypothesis |
| 3 | Personas from evidence — Lia (requester), Rafael (technician), Márcia (manager), Administrator |
| 4 | Problem statement template; weak vs strong example |
| 5 | User journey, current and proposed, with pain points |
| 6 | Story mapping; the MVP must complete one journey, not accumulate half-screens |
| 7 | User stories, "Como [papel], quero [x], para [y]"; ≥ 12 required |
| 8 | Backlog: Must / Should / Could / Won't now |
| 9 | **RF01–RF08** — auth, lockout, create, validation, priority enum, visibility, admin delete, history |
| 10 | **RF09–RF15** — filters, comments, transitions, critical-close rule, report, empty state, error contract |
| 11 | **RNF01–RNF08** — performance, responsive, a11y, secrets, safe errors, coverage, logs, CI |
| 12 | Ambiguity is risk, not defect: list of open questions awaiting decisions |
| 13 | Acceptance criteria as Gherkin examples for the 5 highest-risk rules |
| 14 | Definition of Ready / Definition of Done |

### Part 02 — Design e arquitetura (15–22)

| Step | Says |
|---|---|
| **15** | **Low-fi prototype: the five screens** — Login, Lista, Novo chamado, Detalhe, Dashboard — each with required elements and one alternative state |
| 16 | Accessibility from design: perceivable, operable, understandable, robust |
| 17 | MVP architecture by layer, with what each layer must *not* do |
| 18 | Component flow, where to validate, authorise, log and handle failure |
| 19 | **Data model** — users, tickets, comments, ticket_history, login_attempts |
| **20** | **API contract** + error envelope |
| 21 | Light threat modelling: spoofing, tampering, repudiation, disclosure, DoS, elevation |
| 22 | Designing for testability: observe, control, isolate, reproduce |

### Part 03 — Construção (23–39)

| Step | Says |
|---|---|
| 23 | Environment and npm scripts; a stranger clones and runs it in 10 minutes |
| 24 | Repository tree; `app.js` has no `listen` |
| 25 | Branch, commit, PR, review conventions |
| 26 | Database migration with CHECK constraints and the filter index |
| 27 | Express bootstrap: helmet, JSON limit, correlationId, global error handler |
| 28 | Thin routes/controllers; never trust `requesterId` from the body |
| 29 | Rules in the service: the transition table and `assertTransition` |
| 30 | Validation and safe errors (the status/message table) |
| 31 | Web UI: semantic HTML, busy button, network error handled, focus moved |
| 32 | Authentication and authorisation; never hide a button as authorisation |
| 33 | Structured log events; what to record and what never to record |
| 34 | Seed data and environments — **the 12-ticket seed** |
| 35 | Unit tests, behaviour-named, AAA visible |
| 36 | API tests with Supertest; assert effects, not just status |
| 37 | CI: lint + tests + audit on every PR |
| 38 | Code review dimensions: correctness, security, design, test, data, operation |
| 39 | Sprint review and code freeze; tag `v1.0.0-rc1` |

### Part 04 — Validação (40–57)

| Step | Says |
|---|---|
| 40 | Role swap after code freeze |
| 41 | Test plan sections |
| 42 | Risk-based testing; score = probability × impact |
| 43 | Equivalence partitioning and boundary values (has our exact limit tables) |
| 44 | Decision table for permissions (R1–R6) |
| 45 | State-transition testing — the full allowed/prohibited matrix |
| 46 | Exploratory testing with a charter |
| 47 | Functional execution; minimum output 15 functional, 5 negative, 3 boundary, 3 API, 2 security, 2 a11y, 1 performance |
| 48 | API, integration and persistence assertions — check the database effect |
| 49 | E2E on the four critical journeys |
| 50 | OWASP Top 10 / ASVS applied to scope, ethically |
| 51 | WCAG 2.2 verification: keyboard, forms, contrast, semantics, reflow, automation |
| 52 | Performance with a recorded environment; p95, not average |
| 53 | Responsiveness matrix: 360×800, 768×1024, 1366×768, keyboard, three browsers |
| 54 | Defect report fields |
| 55 | Severity vs priority, and triage questions |
| 56 | Traceability chain: necessity → story → requirement → code → test → defect → fix |
| 57 | Confirmation and regression |

### Part 05 — Qualidade e release (58–67)

| Step | Says |
|---|---|
| 58 | ISO/IEC 25010:2023 — the nine product quality characteristics |
| 59 | One-page quality policy |
| 60 | Technical audit across seven areas; C / NC / OM / NA |
| 61 | Metrics that answer a question (coverage is not quality) |
| 62 | Executive dashboard blocks |
| 63 | Quality gate criteria — the pre-agreed thresholds |
| 64 | Cross audit between the two groups |
| 65 | Surprise event — replan without hiding anything |
| 66 | Release committee: 15 minutes, defended verdict |
| 67 | AI as a responsible copilot; record when AI influenced an artefact |
| — | Final portfolio and grading rubric (weights below) |

### Part 06 — Caderno de evidências (sheets 1–12)

Blank printable forms: opening term · persona and journey · story and
acceptance criteria · audited requirement · architecture decision · risk matrix
· test case · defect report · traceability matrix · audit checklist · quality
gate and verdict · retrospective. **Not used as artefacts**; their field sets
are a good checklist when writing the real documents.

### Grading rubric (spec page 84)

| Criterion | Weight |
|---|---|
| Implementation | 20% |
| Test techniques | 20% |
| Quality and release decision | 15% |
| Discovery and requirements | 10% |
| Design and architecture | 10% |
| Evidence and documentation | 10% |
| Professional collaboration | 10% |
| Individual reflection | 5% |

Plus an individual written question (page 85): *can a system with no known
defects be called a quality system?* — distinguishing test, QC, QA and
quality engineering, with one example each of prevention and detection.

---

## 5. Gaps and contradictions found in the spec

Real problems we must decide, not invent silently. All of these need a line in
[[decisions/decision-log]] before code depends on them.

| # | Gap | Impact | Needed by |
|---|---|---|---|
| G1 | **`ticket.owner_id` is missing from the Passo 26 migration**, though Passo 19 lists it and RF08 requires history when the assignee changes. Passo 48 adds a third sense of *owner* — "owner do token" meaning the **requester** — so `owner` needs one definition before any of it is coded | Detalhe cannot be built | before Detalhe |
| G2 | **"Queue" is never defined.** RF06 and Passo 44 R4/R5 depend on a technician's authorised queue; there is no queue table or column. The Dashboard's role is equally unassigned: US-10 gives the totals to *gestora*/Márcia, who maps to no seeded role, while Passo 44 R6 gives admin "administra + audita" | Permission model is unimplementable as written | before Detalhe |
| G3 | **Two vocabularies for one enum.** RF11 says *aberto / em análise / em atendimento / resolvido / fechado*; the code says `open / analysis / in_progress / resolved / closed`; the seed repeats the prose. Never mapped in the spec. | UI ↔ DB drift | **resolved** — 1:1 map written in glossary §3b |
| G4 | **No comments endpoint.** RF10 and the Detalhe screen need comments; Step 20 defines none. Also no `DELETE` route for RF07. | Two screens are half-built | before Detalhe |
| G5 | **`priority` means two things** — ticket priority (RF05) and defect priority (Passo 55) | Ambiguous code and docs | resolved in glossary §2 |
| G6 | **`requester_id` vs. "common user" vs. "solicitante"** — one role, three names in the spec | Vocabulary drift | resolved in glossary §2 |
| G7 | **Two `correlationId` formats** — `req_7f31…` in the samples, raw `crypto.randomUUID()` in the Passo 27 code | Log search breaks | before logs |
| G8 | **Reopen is undecided.** Passo 29 permits `resolved → in_progress` for any authorised caller; Passo 12 asks who may reopen a *closed* ticket and within what deadline | Untestable rule | before Detalhe |
| G9 | **Deletion is undecided** — physical, logical, or auditable archive? (Passo 12 asks, RF07 assumes yes) | RF07 untestable | before Detalhe |
| G10 | **Pagination size and ordering unspecified.** Passo 20 says "paginated list" and Passo 48 asserts "paginação e ordenação", but no page size, default order or tiebreaker is ever given — the spec leaves it entirely open | Two collaborators will pick differently | before Lista |
| G11 | **Description ceiling of 5 000** appears only in the Passo 30 Zod sample, not in RF04 | Unsourced limit | note it, adopt it |

---

## 6. Structure delta — spec vs this repo

| Spec expects | This repo | Action |
|---|---|---|
| `src/middlewares/` | `middlewares/` at root | Decide once, then be consistent. Root-level is the existing choice. |
| `evidencias/`, `qualidade/` dirs | absent | Skip — evidence lives with `docs/`, metrics in the cycle ledger |
| `/docs/01-termo-abertura.md`, `/docs/02-problema-personas.md` | `docs/` holds workflow docs | Write the real documents when the discovery batch comes |
| PDF at repo root | present | Keep — it is the assignment, not our code |

---

## Related

- [[reference/glossary]] — the vocabulary this file uses
- [[project/team-and-screens]] — who owns which screen
- [[reference/known-issues]] — status of G1–G11
- [[decisions/decision-log]] — where the decisions land
