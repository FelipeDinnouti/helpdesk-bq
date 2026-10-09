---
title: Passo 05 — status, comentários e histórico
type: plano
updated: 2026-10-09
tags: [plano, backend, transicao, comentarios, historico]
---

# Passo 05 — status, comentários e exclusão

**Entrega:** a máquina de estados de verdade (PD-04), comentários (G4),
histórico completo (RF08) e exclusão lógica (G6).

## Escopo

- `src/services/transition-service.js`: tabela `allowed` + `assertTransition`.
  ```js
  open: ['analysis'],
  analysis: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed', 'in_progress'],
  closed: ['in_progress'], // G8: técnico/admin, com comentário obrigatório
  ```
  `assertTransition(from, to, { role, comment })`: salto proibido →
  `INVALID_STATE` 409 "Transição não permitida."; fechar (`→ closed`) sem
  comentário com texto → `RESOLUTION_COMMENT_REQUIRED` 409; `closed →
  in_progress` por solicitante → 403. Chamado **crítico** só fecha com
  comentário de resolução (RF12) — o comentário precisa existir no body da
  requisição e é gravado junto.
- `PATCH /api/tickets/:id/status` `{ status, comment? }`: técnico/admin.
  Transação única: atualiza status + grava comentário (se houver) + grava
  histórico (`ticket.status.changed` com before/after). Solicitante → 403.
- `src/repositories/comment-repository.js`: `add`, `forTicket` (com nome do
  autor, ordem cronológica).
- `POST /api/tickets/:id/comments` `{ body }` + `GET /api/tickets/:id/comments`:
  podem comentar solicitante-dono, técnico, admin; 1000 caracteres.
- `DELETE /api/tickets/:id` `{ justification }`: só admin, justificativa
  obrigatória (400 sem ela), soft delete + histórico (`ticket.deleted` com a
  justificativa em `after`).
- `GET /api/tickets/:id` passa a incluir `history` e `comments`? **Não** —
  mantém o detalhe enxuto; a tela Detalhe chama os três endpoints. (Corte
  consciente: menos acoplamento, mesma informação.)

## Fora de escopo

Relatórios (06). Nada de reabertura por solicitante.

## Aceite

- [ ] Matriz completa: cada transição permitida passa; `open → closed`,
      `closed → open` e `analysis → resolved` dão 409.
- [ ] Fechar sem comentário → 409; fechar crítico com comentário → 200 e o
      comentário existe.
- [ ] `resolved → in_progress` com comentário → 200; `closed → in_progress`
      como solicitante → 403; como técnico com comentário → 200.
- [ ] Comentário com 1001 caracteres → 400; de usuário não autorizado → 403.
- [ ] DELETE sem justificativa → 400; como técnico → 403; como admin → 200, o
      chamado some da lista e dá 404 no detalhe.
- [ ] Cada mudança acima tem linha em `ticket_history` com ator, antes e depois.
- [ ] `git diff --check` limpo.