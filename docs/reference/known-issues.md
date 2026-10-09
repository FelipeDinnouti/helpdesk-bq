---
title: Lacunas conhecidas
type: referencia
updated: 2026-10-09
tags: [referencia, problemas, lacunas]
---

# Lacunas conhecidas

Itens em aberto, decisões pendentes e perguntas sem dono. Uma linha cada, com
situação. **Todas as lacunas G1–G14 foram decididas em 2026-10-09** por
autoridade do usuário; a lista canônica com fonte e motivo está em
[[reference/specification]] §7 e no registro de decisões.

## 1. Lacunas G1–G14 — todas decididas

| # | Lacuna e decisão | Situação |
|---|---|---|
| G1 | `fila` é regra, não tabela: solicitante vê os seus; técnico vê todos; admin vê todos | decidido — implementar no passo 04 |
| G2 | Existe `owner_id` (técnico responsável, anulável); muda com histórico | decidido — implementar no passo 05 |
| G3 | Tabela `categories` (id, name, active); admin gerencia; chamado tem `category_id` anulável | decidido — implementar no passo 02 |
| G4 | `POST` + `GET /api/tickets/:id/comments`, máx. 1000; comentam solicitante do chamado, técnico, admin | decidido — implementar no passo 05 |
| G5 | `POST /api/sessions`; o comentário TODO no mock será atualizado | decidido — implementar no passo 03 |
| G6 | Soft delete (`deleted_at`), só admin, com justificativa e histórico | decidido — implementar no passo 05 |
| G7 | `page` (1), `pageSize` (10, máx. 50), `order=desc\|asc`; `{data, page, pageSize, total, totalPages}` | decidido — implementar no passo 04 |
| G8 | `closed → in_progress` para técnico/admin, com comentário obrigatório | decidido — implementar no passo 05 |
| G9 | Descrição com teto de 5000 | decidido — implementar no passo 04 |
| G10 | `correlationId` = `req_` + 12 hex | decidido — implementar no passo 01 |
| G11 | `src/` fica; a árvore da QTS fica superada neste ponto | decidido |
| G12 | **React** (`frontend/`); `public/` vanilla vira referência visual | decidido pelo usuário |
| G13 | Dashboard para todo autenticado; totais respeitam a visibilidade da Lista | decidido — implementar no passo 06 |
| G14 | Nome `helpdesk-bq` fica | decidido |

## 2. Itens do projeto

| # | Item | Situação |
|---|---|---|
| 1 | Tela de Login em `public/` com mock e comentário `TODO(back)` com o `fetch` sugerido | feito visualmente, **não integrado** — integra no passo 08 |
| 2 | Sem `package.json` na raiz; nada roda ainda | **em execução no passo 01** |
| 3 | Backend em esqueleto: `app.js` e `server.js` são comentários; resto é placeholder | **em execução nos passos 01–06** |
| 4 | Banco inexistente: `db/migrations/` só tem `.gitkeep` | **em execução no passo 02** |
| 5 | Nenhum teste. `tests/` só tem `.gitkeep` | **em execução no passo 07** |
| 6 | Linguagem visual não estabelecida | passo 08, com o `ui-designer` |
| 7 | Sem seed de demonstração | **em execução no passo 02** |
| 8 | `frontend/README.md` é o boilerplate do Vite em inglês, não do projeto | aberto, pertence a quem fez |

## 3. Descartado de propósito

| Item | Motivo |
|---|---|
| Diretórios `evidencias/` e `qualidade/` | evidência mora em `docs/`, métricas no ledger de ciclo |
| Processo da apostila (dois grupos, papéis rotativos, cadência de encontros) | decisão de 2026-10-02 |
| Front vanilla em `public/` como interface | superado pela decisão React (G12); mantido como referência visual |

*Scaffold em 2026-10-02. Apostila lida em 2026-10-02. QTS lida em 2026-10-09.
Lacunas decididas em 2026-10-09.*
