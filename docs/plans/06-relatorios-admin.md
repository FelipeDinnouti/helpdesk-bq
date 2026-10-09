---
title: Passo 06 — relatórios e admin
type: plano
updated: 2026-10-09
tags: [plano, backend, relatorios, admin]
---

# Passo 06 — relatórios e admin

**Entrega:** `GET /api/reports/summary` (RF13/RF14) e o mínimo de admin
(categorias + criar usuário).

## Escopo

- `src/services/report-service.js`: `summary(query, user)`.
  - Mesma visibilidade da Lista (G13): solicitante conta só os seus; técnico e
    admin contam todos. Apagados nunca contam.
  - Mesmos filtros da Lista: `status`, `priority`, `category_id`.
  - Resposta: `{ data: { by_status: { open, analysis, in_progress, resolved,
    closed }, by_priority: { low, medium, high, critical }, total } }` — sempre
    com as cinco chaves de status e as quatro de prioridade (zero quando não há
    dado), para o Dashboard nunca receber forma diferente.
  - Estado vazio (RF14) é **`total: 0`** — a tela decide como exibir; a API não
    inventa mensagem.
- `GET /api/reports/summary` com `requireAuth`.
- `src/services/category-service.js` + rotas em `/api/categories`: `GET /`
  (autenticado, só ativas), `POST /` (admin, `{ name }`, 201), `PATCH /:id`
  (admin, `{ active }` para desativar). Nome único, sem vazio.
- `POST /api/users` (admin): `{ name, email, password, role }` → 201 sem
  `password_hash`. E-mail único (409 `EMAIL_TAKEN`), senha mín. 6 (400).
- Montar as rotas em `src/routes/index.js`.

## Fora de escopo

Período de consulta no relatório (a tela filtra por período? **Corte:** a QTS
lista "período de consulta" no Dashboard — entra como `since`/`until` sobre
`created_at` se couber sem atrito; senão vira dívida do passo 11).

## Aceite

- [ ] Totais do seed batem: solicitante vê 12; filtros reduzem; zeros presentes.
- [ ] Técnico e solicitante veem números diferentes quando há chamado de outro
      dono (criar um como admin e comparar).
- [ ] Categoria duplicada → 409; desativar esconde da lista mas não quebra
      chamado antigo.
- [ ] Criar usuário sem ser admin → 403; e-mail repetido → 409.
- [ ] `git diff --check` limpo.