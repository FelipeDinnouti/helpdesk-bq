---
title: Passo 03 — autenticação
type: plano
updated: 2026-10-09
tags: [plano, backend, auth, jwt, bloqueio]
---

# Passo 03 — autenticação

**Entrega:** `POST /api/sessions` com JWT + bcrypt + bloqueio de conta, e o
middleware `requireAuth` que os próximos passos usam.

## Escopo

- `src/repositories/user-repository.js`: `findByEmail`, `findById` (sem
  `password_hash` no retorno público). `src/repositories/login-attempt-repository.js`:
  `record(email, success)`, `recentFailures(email, minutes)`, `prune()`.
- `src/services/auth-service.js`: `login({ email, password })`.
  - Usuário inexistente/inativo ou senha errada → registra falha, erro 401
    `INVALID_CREDENTIALS`, mensagem "Credenciais inválidas." — **sem dizer se
    o e-mail existe** (US-01).
  - Conta **bloqueada** → 423 `ACCOUNT_LOCKED`, "Acesso temporariamente
    indisponível." Janela: 3 falhas nos últimos 5 min → 10 min a partir da
    terceira falha (RF02).
  - Sucesso → registra sucesso (zera a contagem por janela), devolve
    `{ token, user: { id, name, email, role } }`. JWT 8h.
- `src/controllers/session-controller.js` + `src/routes/sessions.js`:
  `POST /api/sessions`. Controller fino: lê body, chama o serviço, `201`? Não —
  sessão não é recurso criado no nosso modelo; **200** com `{ data: { token,
  user } }`. Validação mínima: e-mail e senha presentes e string, senão 400.
- `src/middlewares/require-auth.js`: Bearer JWT → `req.user = { id, role }`.
  Ausente/inválido/expirado → 401 `UNAUTHENTICATED`, "Autenticação necessária."
- `GET /api/me` (útil e barato): devolve o usuário do token. 401 sem token.
- Apagar os placeholders `authRoutes.js`/`authController.js`/`authService.js`/
  `authMiddleware.js` — foram substituídos pelos arquivos acima com os nomes
  do glossário.

## Fora de escopo

Registro público de usuário (só admin cria — passo 06). Refresh token. Troca de
senha. Rate-limit por IP (dívida do passo 01).

## Relógio controlável

O serviço recebe `now()` injetável (padrão `Date.now()`), para o teste de
bloqueio avançar o tempo sem esperar 10 minutos.

## Aceite

- [ ] Login válido (`lia@exemplo.local` / `senha123`) → 200 com token + user sem
      `password_hash`.
- [ ] Senha errada 3× em sequência → 1ª e 2ª dão 401, a 3ª dá **423**; a
      resposta do 423 não revela se o e-mail existe.
- [ ] Conta bloqueada + senha certa → continua 423 até a janela passar.
- [ ] `GET /api/me` sem token → 401; com token → 200.
- [ ] Banco nunca contém senha em texto puro (conferir o seed).
- [ ] `git diff --check` limpo.