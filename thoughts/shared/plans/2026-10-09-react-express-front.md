# Plano: Back Express + Front React (HelpDesk BQ)

Data: 2026-10-09
Status: aguardando aprovação — NADA implementado ainda.

## 1. Onde estamos

- Back Express esqueleto: `src/app.js`, `server.js`, `routes/authRoutes.js`, `controllers/authController.js`, `services/authService.js`, `middlewares/authMiddleware.js` (placeholders).
- Front vanilla funcional: `public/login.html` + `css/login.css` + `js/login.js` (mock fiel ao print 1).
- Sem `package.json`, sem build, sem banco.

## 2. Arquitetura proposta

```
helpdesk-bq/
  backend/              <- Express atual (mover src/ + middlewares/ + db/ pra cá)
    package.json        <- express, cors, dotenv
    src/app.js          <- configura express + cors + json + static em prod
    src/server.js       <- listen
    src/routes/         <- /api/auth/login (mock 200 por enquanto)
  frontend/             <- Vite + React (novo)
    package.json        <- react, vite, proxy p/ localhost:3001
    src/pages/Login.jsx <- migração do login.html atual
    src/components/LoginCard.jsx, AuthFlow.jsx
    src/styles/login.css (reuso do css atual)
  public/               <- MANTER como está até o React ficar pronto (fallback)
```

- Dev: dois terminais — `backend: npm run dev` (porta 3001) + `frontend: npm run dev` (porta 5173, proxy `/api` -> 3001).
- Prod: `frontend: npm run build` gera `dist/`; Express serve estático + fallback SPA.

## 3. Contrato de API (só contrato, sem auth real agora)

```
POST /api/auth/login
req:  { "email": "aluno@ete", "password": "..." }
res 200: { "token": "mock-jwt", "user": { "email": "..." } }
res 401: { "message": "Credenciais inválidas." }
```

Front chama via `fetch`, back responde mock. Auth real (bcrypt/jwt/banco) fica pra depois.

## 4. Micro-tarefas (ordem)

1. `backend/package.json` + deps + scripts
2. Mover `src/`, `middlewares/`, `db/` pra `backend/` + ajustar `app.js` (cors, json, `/api/health`)
3. Criar `frontend/` via Vite + proxy + scripts
4. Migrar login vanilla -> `Login.jsx` + componentes + css (visual idêntico ao print)
5. Ligar `Login.jsx` no `POST /api/auth/login` (mock) + estados do Fluxo autenticado
6. README com como rodar os dois + o que o back precisa implementar

## 5. O que NÃO entra agora

- Sem auth real, sem banco, sem JWT, sem testes novos.
- Sem deletar `public/` vanilla até o React estar rodando (evita quebrar quem usa o mock atual).
- Sem deploy.

## 6. Decisões pra você

- [ ] Pasta `frontend/` + `backend/` ok, ou prefere `client/` + `server/`?
- [ ] Posso criar os `package.json` e rodar `npm install`?
- [ ] Migro o visual atual 1:1 pro React ou quer ajuste visual junto?
