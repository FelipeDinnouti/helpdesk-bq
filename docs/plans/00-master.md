---
title: Plano-mestre de execução — backend + frontend
type: plano
updated: 2026-10-09
tags: [plano, execucao, backend, frontend]
---

# Plano-mestre — implementar o HelpDesk BQ inteiro

**Decisão do usuário (2026-10-09): usar React.** Isso resolve a G12 por
autoridade: o `frontend/` React+Vite é a interface; o `public/` vanilla vira
referência visual. A linha de stack da QTS fica superada neste ponto, com
registro em `docs/decisions/decision-log.md`.

**Autoridade para preencher lacunas:** o usuário mandou decidir G1–G14 por conta
própria. Cada decisão vai para o registro com fonte e motivo. Nada inventado em
silêncio — inventado em voz alta, com registro.

## Restrições de ambiente (levantadas antes de planejar)

- Node v22.14.0 + npm 10.9.2, com rede (npm funciona).
- **Sem servidor PostgreSQL** nesta máquina. Decisão: SQLite em arquivo via
  `better-sqlite3` para dev/demo/teste, com SQL 100% portátil (sem dialeto) e
  migrações em `db/migrations/` — o Postgres continua sendo o alvo declarado,
  e o schema roda nele sem mudança. Registrado.
- `frontend/` sem `node_modules` — `npm install` pendente.
- Prazo: **hoje**. Velocidade com verificação, sem ouro.

## Os passos

Cada passo tem seu arquivo em `docs/plans/`, é executado, verificado e
anunciado no Telegram. Um passo só começa quando o anterior está verde.

| Passo | Arquivo | O que entrega | Aceite |
|---|---|---|---|
| **00** | `00-master.md` (este) + atualizações em `docs/` | Decisões G1–G14 travadas e registradas; plano-mestre | docs coerentes, sem lacuna sem dono |
| **01** | `01-fundacao-backend.md` | `package.json`, Express, `app.js` sem listen, `server.js`, correlationId, erros, `/api/health` | `npm run dev` sobe; health 200 com envelope |
| **02** | `02-banco.md` | `db.js`, migrações `users/categories/tickets/comments/ticket_history/login_attempts`, seed (3 usuários + 12 chamados) | migrate + seed do zero; 12 chamados contáveis |
| **03** | `03-auth.md` | `POST /api/sessions`, JWT + bcrypt, bloqueio 3/5min→10min (423), `requireAuth` | login válido 200; 3ª falha 423; token inválido 401 |
| **04** | `04-chamados.md` | `POST /api/tickets`, `GET /api/tickets` (filtros + paginação), `GET /api/tickets/:id`, validações | 201 cria; 400 valida; 401 sem token; 403 de outro dono; paginação com totais |
| **05** | `05-status-comentarios.md` | `PATCH /api/tickets/:id/status`, comentários, histórico, regra do crítico, assumir (owner), prioridade, soft delete | matriz de transição + regra do crítico + histórico em cada mudança |
| **06** | `06-relatorios-admin.md` | `GET /api/reports/summary`, CRUD mínimo de categorias e criação de usuário (admin) | totais batem com a lista; vazio correto |
| **07** | `07-testes-backend.md` | unit (transição, bloqueio, validação) + API (supertest), regras críticas 100% | `npm test` verde; mutação das regras inverte |
| **08** | `08-front-base.md` | deps, router, cliente API, contexto de auth, shell/layout, **Login integrado** | login real contra a API; lockout mostra mensagem; redireciona |
| **09** | `09-lista-novo.md` | Lista (filtros, paginação, vazio) + Novo chamado (validação, offline) | fluxos RF09/RF14/RF03–RF05 clicáveis |
| **10** | `10-detalhe.md` | Detalhe (dados, histórico, comentários, ações de status/prioridade) | matriz de transição clicável; 403/404/409 visíveis |
| **11** | `11-dashboard.md` | Dashboard (totais, filtros, período, vazio) + passada 360px + a11y | totais batem; vazio correto; teclado completo |
| **12** | `12-fechamento.md` | seed demo, README final, checagem visual das 5 telas, revisão, commit | demo reproduzível do zero; 5 telas com PASS visual |

## Decisões já tomadas neste plano (detalhe no registro)

- **G12 React** — autoridade do usuário.
- **Banco:** SQLite-arquivo em dev/demo/teste; Postgres é o alvo; SQL portátil.
- **G1 fila:** fila não é tabela — é regra: solicitante vê os seus; técnico vê
  todos (filtráveis); admin vê todos. Categoria pode escopar filas no futuro.
- **G2 responsável:** existe `owner_id` (técnico responsável, anulável). Muda
  com histórico. Técnico "assume" o chamado.
- **G3/G6 categoria:** tabela `categories` (id, name, active). Admin gerencia
  (listar/criar/desativar). Chamado tem `category_id` anulável; aparece no
  formulário e como filtro.
- **G4 comentários:** `POST /api/tickets/:id/comments` + `GET` na mesma rota.
  Máx. 1000. Quem pode: solicitante do chamado, qualquer técnico, admin.
- **G5 login:** `POST /api/sessions` (traz o 423 do bloqueio). O comentário TODO
  no mock será atualizado.
- **G6/G7 exclusão:** **soft delete** (`deleted_at`), só admin, exige
  justificativa, grava histórico. Listas excluem apagados por padrão.
- **G7 paginação:** `page` (1), `pageSize` (10, máx. 50), `order=desc|asc`
  (padrão `desc` por `created_at`). Resposta `{data, page, pageSize, total,
  totalPages}`.
- **G8 reabertura:** `closed → in_progress` permitido para técnico/admin, com
  comentário obrigatório. Fechado não é terminal absoluto; é terminal sem
  justificativa.
- **G9 descrição:** teto 5000.
- **G10 correlationId:** `req_` + 12 hex (`crypto.randomBytes(6)`).
- **G11 estrutura:** `src/` fica (realidade + apostila + plano existente). A
  árvore da QTS fica superada neste ponto.
- **G13 leitor do Dashboard:** todo autenticado; totais respeitam a mesma
  visibilidade da Lista (solicitante vê os seus).
- **G14 nome:** `helpdesk-bq` fica.
- **Auth:** Bearer JWT, expiração 8h, bcrypt custo 10. Criação de usuário: só
  admin (`POST /api/users`), mais seed.
- **Frontend:** `react-router-dom` (única dependência nova), CSS próprio
  reaproveitando a estética do `login.css` existente, sem biblioteca de UI.
  Express serve `frontend/dist` em produção; em dev, Vite com proxy `/api`.

## Verificação por passo (sem exceção)

- `git diff --check` limpo.
- Backend: app sobe, rotas tocadas com smoke (curl), testes do passo verdes.
- Frontend: Vite compila, tela renderiza, fluxo clicável de ponta a ponta.
- Nada de `console.log` de depuração; nenhum segredo; nenhum mock fingindo
  integração.

## Revisão e commits (acordo para o prazo de hoje)

Revisão completa a cada passo inviabilizaria a entrega. O acordo:

- Verificação automatizada **por passo** (acima).
- `code-reviewer` **duas vezes**: depois do backend (passos 01–07) e no
  fechamento (passo 12, tudo).
- **Commits em dois pontos**: backend pronto + revisão PASS; fechamento final +
  revisão PASS. Nada de commit gigante sem revisão.

## Telegram

Uma mensagem por passo, ao **iniciar** cada um (a conclusão do anterior está
implícita no início do próximo). Formato curto, em pt-BR, que se baste no
celular:

```
STEP 03/12: Auth — JWT + bloqueio
POST /api/sessions com lockout 3/5min→10min
```

Mais uma ao fechar o passo 12, com o resumo da entrega. Nada além disso.

## Riscos

- `better-sqlite3` é módulo nativo — se o prebuild falhar, plano B é `node:sqlite`
  (nativo no Node 22) com o mesmo schema. O código isola o acesso em `db.js`.
- `react-router-dom` v7 + React 19 — combinação padrão; se quebrar, plano B é
  roteador por hash de 30 linhas.
- Tempo: os passos 05 e 10 são os mais densos. Se apertar, o CRUD de categorias
  no admin vira só API (sem tela), e o Dashboard perde o seletor de período
  (mantém filtros + totais).