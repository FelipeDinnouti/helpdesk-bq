# helpdesk-bq

Sistema de Help Desk do Colégio Bento Quirino: abertura, consulta, histórico e
relatório de chamados de suporte técnico.

**A especificação do produto é `Documentação QTS - HelpDesk.pdf`.** A documentação
declarada e as decisões de arquitetura estão em [`docs/`](docs/README.md).

## Stack

JavaScript / Node.js · Express · **React 19 + Vite (`frontend/`)** · SQLite em
arquivo com schema portátil (Postgres é o alvo), migrações em `db/migrations/`
· JWT para sessão e bcrypt para senhas · Jest e Supertest.

Fluxo: `Interface web → Rotas → Controllers → Services → Repositories → Banco`.

## Como rodar

```bash
npm install
cp .env.example .env      # ajustar JWT_SECRET
npm run migrate           # cria o schema
npm run seed              # carga de demonstração (3 usuários + 12 chamados)
npm run dev               # back com recarga em http://localhost:3001
npm test                  # 42 testes (Jest + Supertest)
```

Front em outro terminal:

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173 com proxy /api
npm run build             # gera dist/ (o Express serve em produção)
```

**Contas do seed (senha `senha123`):** `admin@exemplo.local` (admin) ·
`tecnico@exemplo.local` (técnico) · `lia@exemplo.local` (solicitante).

**Ambientes:** desenvolvimento (SQLite em `db/helpdesk.db`, ignorado pelo git),
teste (banco temporário por arquivo, criado pelo `tests/setup.js`).

## Telas

| Tela | ID | Responsável |
|---|---|---|
| Login | `login` | colaborador responsável por **Login** |
| Lista de chamados | `list` | colaborador responsável por **Lista** |
| Novo chamado | `new-ticket` | colaborador responsável por **Novo chamado** |
| Detalhe do chamado | `detail` | colaborador responsável por **Detalhe** |
| Dashboard / Relatórios | `dashboard` | colaborador responsável por **Dashboard** |

## Vocabulário

Um conceito, uma palavra. `ticket` é o termo canônico do conceito de chamado em
todo identificador; **"chamado"** aparece só em strings visíveis ao usuário.
O contrato completo está em [`docs/reference/glossary.md`](docs/reference/glossary.md).

## Documentação

| Documento | O que é |
|---|---|
| [`docs/reference/specification.md`](docs/reference/specification.md) | **A QTS reorganizada** — problema, telas, perfis, stack, estrutura |
| [`docs/reference/glossary.md`](docs/reference/glossary.md) | Vocabulário canônico e palavras proibidas |
| [`docs/project/team-and-screens.md`](docs/project/team-and-screens.md) | Atribuição de telas e entregáveis por tela |
| [`docs/project/charter.md`](docs/project/charter.md) | Missão, objetivos, não objetivos, restrições |
| [`docs/project/boundaries.md`](docs/project/boundaries.md) | Escopo, segurança, áreas graváveis |
| [`docs/reference/known-issues.md`](docs/reference/known-issues.md) | Lacunas abertas, com o que cada uma bloqueia |
| [`docs/reference/spec-map.md`](docs/reference/spec-map.md) | A apostila da disciplina e a rubrica |

## Estado atual

Aplicação completa: API Express com auth JWT, chamados, transições, comentários,
histórico, relatórios e admin; front React com as cinco telas; 42 testes verdes.
Decisões e lacunas em [`docs/reference/known-issues.md`](docs/reference/known-issues.md).