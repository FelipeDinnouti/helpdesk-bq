---
title: Glossary and controlled vocabulary
type: reference
status: source-of-truth
updated: 2026-10-02
tags: [reference, glossary, vocabulary, naming]
---

# Glossary and controlled vocabulary

**This file is the naming contract for the whole project.** Before writing
code, a screen, a test, a document or a commit message, look up the concept
here. If a word is not listed, either it is ordinary English/Portuguese prose
or you have found a vocabulary gap — raise it, don't invent a third word.

Derived from `Apostila_Operacao_Software_Confiavel.pdf` (102 pages, 67 steps,
12 evidence sheets), which itself ends with a *Glossário essencial*. This file
is the operational version: same spirit, plus the **canonical term**, the
**banned synonyms**, and the **per-surface spelling**.

---

## 1. The seven rules

1. **One concept, one canonical term.** Every competing word is either a
   declared alias (§3) or banned (§4). Never two live terms for one thing.
2. **Code surface speaks code.** Identifiers — table, column, route, enum
   value, log event, test name, file name — use the canonical term in ASCII
   `snake_case` (or `kebab-case` in URLs). Never translated, never pluralised
   inconsistently.
3. **Display surface speaks pt-BR.** A user-visible string may use the
   declared pt-BR label (§3). Display strings live in exactly one place per
   surface; they are never reused as identifiers.
4. **Collisions get qualified names.** `ticket.priority` and
   `defect.priority` are different things and are always written qualified.
   Same for `ticket.owner` (a person) vs. any task owner (never "owner" for a
   person — see §2).
5. **IDs are the connective tissue.** One stable ID per artefact, prefixed by
   kind, never reused and never renumbered (§5). A chain
   *necessity → story → requirement → code → test → defect → fix* links by ID
   alone, with no prose.
6. **Never translate mid-chain.** If the ticket is `ticket` in the schema, it
   is `ticket` in the route, the service, the test and the log event. Mixed
   language inside one chain is a defect in the vocabulary, not a style choice.
7. **A term not in this file may not enter an identifier.** New noun → new
   entry here first, with its banned synonyms.

---

## 2. The core nouns

`ticket` is the canonical word for the ticket concept. Every project surface
below is derived from it.

| Concept | Canonical term | Definition (one line, per spec) | Not this |
|---|---|---|---|
| Ticket | **`ticket`** | A request for help, created by a requester, moved through a fixed status path by a technician, with history. | *chamado, registro, issue, ocorrência, solicitação, demanda, pedido* |
| User account | **`user`** | An identity with one role, an e-mail and a password hash; may be blocked. | *conta, cliente, usuário do sistema* |
| Role | **`role`** | One of `requester`, `technician`, `admin` — decides which rules apply. | *perfil, grupo, nível, tipo de usuário* |
| Requester | **`requester`** (`requester_id`) | The user who opened the ticket. Owns nothing after opening. | *solicitante, cliente, dono do ticket, autor, criador, reclamante* |
| Technician | **`technician`** | The user who triages, comments and changes status. | *atendente, suporte, opener, worker* |
| Administrator | **`admin`** | The user who manages roles/categories and deletes with justification. | *superusuário, root, gestor do sistema* |
| Ticket assignee | **`owner`** (`owner_id`) | The technician responsible for the ticket right now. | *assignee, responsável pelo atendimento, atendente, dono* |
| Ticket status | **`status`** | One of `open`, `analysis`, `in_progress`, `resolved`, `closed`. Labels in §3b. | *situação, estado, fase, etapa* |
| Ticket priority | **`priority`** | One of `low`, `medium`, `high`, `critical`. Labels in §3b. | *urgência (wrong: that is defect priority), gravidade, nível* |
| Comment | **`comment`** | Up to 1 000 characters by an authorised user, attached to one ticket. | *mensagem, nota, resposta, observação, reply* |
| History entry | **`history`** | Immutable row: actor, timestamp, action, before value, after value. | *log, auditoria, rastro* — **these are different things, see §4** |
| Audit entry | **`audit`** | A record of a *privileged* action (delete, role change) for accountability. | *log, histórico* |
| Log entry | **`log entry`** | A structured operational record: event, time, route, status, correlation id. | *histórico, auditoria, relatório* |
| Correlation id | **`correlationId`** | One id tying a user-visible failure to its log lines. | *requestId, traceId (no), id da requisição* |
| Screen | **`screen`** | One of five user-facing surfaces: login, list, new-ticket, detail, dashboard. | *página, view, rota (a route is not a screen), tela do banco* |
| Collaborator | **`collaborator`** | One of the five people building the project. | *aluno, membro, dev, participante, autor* |
| Collaborator's assignment | **`colaborador responsável por <Screen>`** | The person responsible for one screen end to end. Never abbreviated to "owner". | *owner, responsável pelo módulo, Maintainer* |
| Evidence file | **`evidence`** | A committed artefact that proves a claim: capture, log, export, report. | *print, anexo, foto, arquivo* |
| Quality gate | **`quality gate`** | Objective criteria agreed *before* the result, that authorise advancing or releasing. | *checkpoint, milestone, gate de homologação, rubrica* |
| Defect | **`defect`** | Divergence from an approved reference, reproducible. | *bug, erro, falha (falha is the symptom), problema, pendência* |
| Failure | **`failure`** | The observed behaviour that a defect produces. | *erro, exceção, crash, defeito* |
| Defect severity | **`severity`** | Technical/user impact of a defect: `critical`, `high`, `medium`, `low`. | *prioridade, gravidade do produto* |
| Defect priority | **`defect.priority`** | Urgency of treatment in the context of this release. | *severidade, urgência (write *urgência* only in prose)* |
| Requirement | **`requirement`** | A verifiable statement, `RF01`–`RF15` or `RNF01`–`RNF08`. | *história, especificação, tarefa, regra* |
| User story | **`story`** | Value statement in *Como [papel], quero [capacidade], para [benefício]*, `US-01`–. | *requisito, user story (write *história de usuário* in prose only)* |
| Test case | **`test case`** | A reproducible verification with id `CT-001`–, one requirement, one main reason to fail. | *teste (bare), cenário, caso, suite* |
| Risk | **`risk`** | `probability (1–5) × impact (1–5)`, guiding test depth. Distinct from defect severity. | *probabilidade, severidade, impacto (bare)* |
| Sprint / cycle | **`cycle`** | A batch of work: implement → verify → review → commit. | *iteração, sprint (use *sprint* only for the class meeting)* |
| Slice | **`slice`** | The smallest coherent unit of change inside a batch. | *tarefa, story, PR* |

Identifiers stay **bare** (`priority`, `owner`) because the table or type name
supplies the context — exactly as the spec writes `tickets.priority`. Rule 4's
qualified form (`ticket.priority`, `defect.priority`) is for **prose**, where
both senses can appear in one sentence.

### Words that are *load-bearing* and must never be used loosely

- **`owner`** — only `ticket.owner_id` the technician on a ticket. An
  owner change lands in `ticket_history` as a `before`/`after` pair (RF08), not as
  a column. Never "the owner of the list screen".
- **`priority`** — always `ticket.priority` or `defect.priority`.
- **`history`** — the ticket's audit-of-record. A log entry is *not* history.
- **`queue`** — see §6, unresolved in the spec.
- **`critical`** — a `ticket.priority` value *and* a `severity` value. Say
  which one.

---

## 3. Declared aliases (the only legal exceptions)

Exactly two aliases exist. Both are **surface-bound** and must not leak.

### 3a. `ticket` → **"chamado"** (pt-BR display + prose)

The spec is Portuguese, the reviewers are Brazilian, and the spec's own product
language is "chamado". So:

| Surface | Spelling |
|---|---|
| Tables, columns, enums, routes, log events, test names, file names | `ticket`, `tickets`, `requester_id`, `ticket_history`, … |
| User-visible pt-BR strings | **Chamado**, **Novo chamado**, **Lista de chamados**, **Chamados por status** |
| Human-readable doc prose | `ticket` or *chamado*, first use per file then `ticket` |

**Forbidden:** mixing the two inside one chain — a `chamado` route, a
`ticket` column comment that calls it a "registro", a UI label "Ticket #12" in
a pt-BR product.

### 3b. Status and priority: enum value, display label

One map, three surfaces, no drift. The enum column is canonical and is what
appears in code, the database, the API and log events. The label column is the
pt-BR display string only.

| Field | Enum value (code, DB, API) | Display label (pt-BR) |
|---|---|---|
| `status` | `open` | Aberto |
| `status` | `analysis` | Em análise |
| `status` | `in_progress` | Em atendimento |
| `status` | `resolved` | Resolvido |
| `status` | `closed` | Fechado |
| `priority` | `low` | Baixa |
| `priority` | `medium` | Média |
| `priority` | `high` | Alta |
| `priority` | `critical` | Crítica |
| `role` | `requester` | Solicitante |
| `role` | `technician` | Técnico |
| `role` | `admin` | Administrador |

Transcribed 1:1 from RF05, RF11, Passo 29's transition table and Passo 34's
seed breakdown — the spec states both forms and never maps them. That mapping
is this table, and nothing else is permitted. Closes gap **G3**.

### 3c. Screens keep their spec names

Step 15 names five screens. Those names are canonical in every surface.

| Screen id | Canonical name (code + docs) | pt-BR display label |
|---|---|---|
| `login` | **Login** | Entrar |
| `list` | **Lista** | Lista de chamados |
| `new-ticket` | **Novo chamado** | Novo chamado |
| `detail` | **Detalhe** | Detalhe do chamado |
| `dashboard` | **Dashboard** | Dashboard |

**Which form goes where:** the **id** (`login`, `new-ticket`) in file names,
routes and test names — ASCII, always. The **name** (*Login*, *Novo chamado*)
in prose, headings and user-visible labels. Never `novo-chamado.html` when
the id is `new-ticket`.

Addressing a person about a screen: **"colaborador responsável por <Screen>"** — e.g. *"o colaborador responsável por Dashboard
confirmou o estado vazio"*. Never *"o owner do dashboard"*.

---

## 4. Banned words

Never write these. If one seems needed, the concept is missing from §2.

`registro` · `issue` · `ocorrência` · `solicitação` · `demanda` · `atendente`
· `suporte` · `cliente` · `criador` · `autor do chamado` · `mensagem` (for
comment) · `nota` · `situação` (for status) · `gravidade` (for severity) ·
`erro` (for defect) · `bug` (in prose; `BUG-` as a defect **id** is fine) ·
`log` (for history) · `auditoria` (for history) · `página` / `view` (for
screen) · `aluno` / `membro` / `dev` (for collaborator) · `owner` (for a
person) · `tarefa` (for slice) · `histórico de auditoria` (neologism).

---

## 5. Identifier conventions

Ids come from the spec (Passo 25 branch/commit examples, Passo 47, p. 10
filename example). One ID per artefact, stable forever, never reused.

| Kind | Pattern | Range in this project |
|---|---|---|
| User story | `US-nn` | `US-01` … (spec requires ≥ 12) |
| Functional requirement | `RFnn` | `RF01`–`RF15` (spec, Passo 9–10) |
| Non-functional requirement | `RNFnn` | `RNF01`–`RNF08` (spec, Passo 11) |
| Test case | `CT-nnn` | `CT-001` … (spec uses `CT-014`) |
| Defect | `BUG-nnn` | `BUG-001` … (spec uses `BUG-007`) |
| Evidence | `EV-nnn` | introduced here; evidence files are named per §5b |
| Git branch | `feat/US-04-criar-chamado`, `fix/BUG-007-status` | spec, Passo 25 |
| Commit | `feat(ticket): valida título e descrição` | conventional commit + scope |
| Release tag | `v1.0.0-rc1` | spec, Passo 39 |

### 5b. Evidence file names

`AAAA-MM-DD_Tipo_ID_Descricao.ext` — from *Entregáveis e convenção de
arquivos*, Orientation **p. 10** (not Step 10). The spec offers two examples,
`Teste` and `Defeito`; the value list below is **introduced here**, and it is
closed:

`Teste` · `Defeito` · `Captura` · `Log` · `Execucao` · `Relatorio` ·
`Auditoria` · `Matriz`

Examples: `2026-10-05_Teste_CT-014_LoginBloqueado.pdf`,
`2026-10-06_Defeito_BUG-007_StatusInvalido.png`.

---

## 6. Unresolved vocabulary (open decisions, not yet law)

Found while reading the spec. These words are **used by the spec but not
defined**. Until decided, they are quarantined — do not put them in an
identifier.

| Word | Where the spec uses it | Problem | Status |
|---|---|---|---|
| **queue** / *fila* | RF06, Passo 12, Passo 44 R4/R5, Passo 3 | "Technician sees the authorised queue", but no queue table or column exists in Passo 19/26. | open — decide before `detail` |
| **owner** vs **requester** | Passo 19 lists `owner_id`; Passo 26's migration omits it | RF08 requires history when the assignee changes, so the column must exist. | open — needed before `detail` |
| **delete** | RF07 "only admin may delete, with justification and audit" | Passo 20 has no `DELETE` route. Passo 12 asks: physical, logical, or auditable archiving? | open |
| **reopen** | Passo 29 allows `resolved → in_progress` for any authorised caller; Passo 12 asks who may reopen and within what deadline | Undecided rule vs. shipped code sample. | open |
| **"common user"** | Orientation p. 6, RF06 | Same role as `requester` (seed uses `requester`). Banned; use `requester`. | resolved here |
| **pagination size / ordering** | Passo 20 says "paginated list"; Passo 48 asserts "paginação e ordenação" | Never specified — not a page size, a default order, nor a tiebreaker. | open |
| **correlation id format** | Passo 20/33 sample `req_7f31…`; Passo 27 code sets a raw `crypto.randomUUID()` | Two formats. | open — pick one, record the choice |

---

## 7. Writing rules that keep the vocabulary honest

- **Name a test after behaviour, not mechanism**. Passo 35's own example is
  `permite resolved -> closed com comentário` — never `test assertTransition 2`.
- **A doc title names the artefact**, not the activity:
  `ticket-status-transitions` over "status stuff".
- **Prose may translate; identifiers may not.** If a sentence needs an English
  word to make sense in an English doc, use the canonical term — the canonical
  terms survive translation, synonyms do not.
- **New noun? New entry.** Adding "board", "task", "issue" or "attachment" to
  the codebase requires an entry here first, with its banned list. (Spec scope
  control, Step 8: attachments, chat and real notifications are *Won't now*.)

---

## Related

- [[project/team-and-screens]] — who is responsible for what, and the convention
- [[reference/spec-map]] — the indexed spec, and the gaps behind §6
- [[reference/known-issues]] — status of each open decision
- [[decisions/decision-log]] — where the vocabulary rules were locked
