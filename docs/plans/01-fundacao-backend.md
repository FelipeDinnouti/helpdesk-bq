---
title: Passo 01 — fundação do backend
type: plano
updated: 2026-10-09
tags: [plano, backend, express, fundacao]
---

# Passo 01 — fundação do backend

**Entrega:** a aplicação Express sobe, responde `/api/health` no envelope
padrão, e o contrato de erro + `correlationId` existe de verdade — não em
comentário.

## Escopo (só isto)

- `package.json` na raiz: `express`, `better-sqlite3`, `bcryptjs`, `jsonwebtoken`,
  `dotenv`. Dev: `nodemon`, `jest`, `supertest`. Scripts: `dev`, `start`,
  `test`, `lint` (node --check? não — sem eslint por velocidade; `lint` roda
  `node --check` nos arquivos? Decisão: sem linter externo neste passo; o CI
  futuro usa `npm test`. **Corte consciente pelo prazo.**)
- `.env.example` (`PORT`, `JWT_SECRET`, `DATABASE_URL`/caminho do sqlite,
  `JWT_EXPIRES_IN`). `.gitignore` ganha `.env`, `db/*.db*`, `node_modules`,
  `coverage/`, `frontend/dist`.
- `src/app.js` de verdade: helmet? **sem helmet** (dependência a menos; headers
  de segurança entram se sobrar tempo — registrado como dívida). `express.json`
  com limite 100kb, `correlationId` (`req_` + 12 hex) com header de resposta
  `x-correlation-id`, montagem de `/api`, handler de erro por último. Exporta
  `app` sem `listen`.
- `src/server.js`: importa `app`, chama `listen`.
- `src/middlewares/correlation-id.js`, `src/middlewares/error-handler.js`,
  `src/middlewares/not-found.js` (404 no envelope).
- `src/routes/index.js` + `GET /api/health` → `{ data: { status: "ok" } }`.
- `src/lib/http.js`: helpers `ok(res, data, status)` e o envelope de erro
  `{ error: { code, message, correlationId } }`.

## Fora de escopo

Banco (passo 02), auth (03), qualquer regra de negócio. `middlewares/authMiddleware.js`
placeholder continua intocado até o passo 03.

## Tabela de erro (contrato deste passo)

| Situação | HTTP | `code` | Mensagem externa |
|---|---|---|---|
| Rota inexistente | 404 | `NOT_FOUND` | Recurso não encontrado. |
| Payload inválido (futuro) | 400 | `VALIDATION_ERROR` | Revise os campos destacados. |
| Falha inesperada | 500 | `INTERNAL_ERROR` | Não foi possível concluir. Use o código de suporte. |

Mensagens internas (stack, SQL) só no log do servidor, nunca na resposta.

## Aceite

- [ ] `npm install` completa sem erro.
- [ ] `npm run dev` sobe e `GET /api/health` devolve 200 com `{ data: { status:
      "ok" } }` e header `x-correlation-id: req_…`.
- [ ] `GET /api/nao-existe` devolve 404 no envelope, com `correlationId` igual
      ao do header.
- [ ] `git diff --check` limpo; sem segredo; sem `console.log` de depuração.

## Dívidas registradas (não esquecidas, só adiadas)

- `helmet` e rate-limit no login (o bloqueio por conta existe no passo 03; o
  rate-limit por IP é camada extra).
- Linter (eslint) — adiado pelo prazo; estilo garantido por revisão.