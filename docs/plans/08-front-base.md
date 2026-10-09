---
title: Passo 08 — base do front + Login integrado
type: plano
updated: 2026-10-09
tags: [plano, frontend, react, login]
---

# Passo 08 — base do front + Login integrado

**Entrega:** o React navega, fala com a API de verdade e o Login funciona de
ponta a ponta (sem mock).

## Escopo

- `npm install` em `frontend/` + `react-router-dom` (única dependência nova).
  `vite.config.js` ganha proxy `/api → http://localhost:3001`.
- `src/lib/api.js`: `fetch` com base `/api`, token do `localStorage`, envelope
  `{ data }`/`{ error }`, 401 global → volta para `/login`.
- `src/auth.jsx`: contexto com `{ user, token, login, logout }`; guarda
  `helpdesk.token` + `helpdesk.user`; rota protegida redireciona.
- Rotas: `/login` (pública), `/` → `/lista`, `/lista`, `/novo`, `/chamados/:id`,
  `/dashboard` (protegidas). Nomes de rota em pt-BR curto; IDs de tela
  (`login`, `list`…) continuam nos nomes de arquivo, conforme o glossário.
- `src/styles/base.css`: shell (cabeçalho + navegação + conteúdo), botões,
  campos, cartões, painéis de estado (carregando/vazio/erro), escala única.
  Reaproveita a estética do `login.css` existente — **não redesenha**.
- `Login.jsx`: troca o mock pelo `POST /api/sessions` real. Mantém o visual e
  os três passos do fluxo; erro 401 mostra "Credenciais inválidas.", 423 mostra
  "Conta bloqueada. Tente novamente em alguns minutos." com o `correlationId`
  para suporte. Sucesso → `/lista`.
- Express serve `frontend/dist` em produção (fallback para `index.html`, sem
  quebrar `/api`). Só no `NODE_ENV=production`.

## Fora de escopo

As outras quatro telas (09–11). Ajuste visual junto (o plano em `thoughts/`
pergunta; resposta: não — 1:1 primeiro).

## Aceite

- [ ] `npm run dev` no front + back: login com `lia@exemplo.local`/`senha123`
      entra e cai na Lista; senha errada mostra erro; conta bloqueada mostra o
      estado de bloqueio.
- [ ] Sem token, abrir `/lista` volta para `/login`.
- [ ] `npm run build` gera `dist/`; o Express em produção serve a SPA.
- [ ] `git diff --check` limpo; sem `TODO(back)` restante no Login.