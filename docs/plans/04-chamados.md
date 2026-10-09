---
title: Passo 04 — chamados (CRUD, filtros, paginação)
type: plano
updated: 2026-10-09
tags: [plano, backend, tickets, crud]
---

# Passo 04 — chamados

**Entrega:** criar, listar com filtros e paginação, ver detalhe — com a regra
de visibilidade G1 e validação G9.

## Escopo

- `src/lib/validate.js`: validadores que devolvem `[{ field, message }]` em
  pt-BR. Regras: título 10–100, descrição 30–5000 (G9: teto 5000), prioridade no
  enum, categoria existente e ativa quando informada.
- Erro 400 carrega `details` no envelope: `{ error: { code:
  "VALIDATION_ERROR", message: "Revise os campos destacados.", correlationId,
  details: [{ field, message }] } }`. **Extensão documentada** do envelope —
  a interface precisa do erro por campo.
- `src/repositories/ticket-repository.js`: `create`, `findById` (com nomes de
  solicitante/responsável/categoria por JOIN), `list({ status, priority,
  category_id, scopeUser, scopeRole, page, pageSize, order })` com exclusão de
  `deleted_at` por padrão, `updateFields`, contagem de total.
- `src/services/ticket-service.js`:
  - `create`: qualquer autenticado (RF03); `requester_id` vem do token, nunca
    do body (Passo 28); valida; 201.
  - `list` (G1 + G7): solicitante vê só os seus; técnico e admin veem todos.
    Filtros `status`, `priority`, `category_id`, isolados ou combinados.
    `page` 1, `pageSize` 10 máx. 50, `order` desc|asc por `created_at`.
  - `getById`: solicitante só o seu (senão 403); técnico/admin qualquer um;
    apagado dá 404 para não-admin.
  - `update`: técnico/admin. `priority` no enum; `owner_id` precisa ser técnico
    ativo ou null; `category_id` precisa existir e estar ativa. Cada mudança
    grava histórico (RF08) — via `history-repository` criado aqui e reusado no
    passo 05.
- `src/repositories/history-repository.js`: `add({ ticket_id, actor_id, event,
  before, after })`.
- Rotas em `src/routes/tickets.js`: `POST /`, `GET /`, `GET /:id`,
  `PATCH /:id`. Todas com `requireAuth`.

## Fora de escopo

Transição de status (passo 05, rota própria), comentários (05), exclusão (05).

## Aceite

- [ ] Criar válido → 201 com status `open` e `requester_id` do token, mesmo que
      o body tente mandar outro.
- [ ] Título com 9 e 101, descrição com 29, prioridade `urgente` → 400 com
      `details` por campo.
- [ ] Lista: solicitante vê só os seus; técnico vê todos; filtro combinado
      `status+priority` funciona; `pageSize=200` é cortado para 50; resposta
      traz `{data, page, pageSize, total, totalPages}`.
- [ ] Detalhe de outro dono como solicitante → 403 **sem vazar dados**.
- [ ] Técnico muda prioridade e assume (`owner_id` próprio) → 200 + histórico.
- [ ] `git diff --check` limpo.