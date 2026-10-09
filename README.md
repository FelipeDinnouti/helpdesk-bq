# helpdesk-bq

Sistema de Help Desk do Colégio Bento Quirino: abertura, consulta, histórico e
relatório de chamados de suporte técnico.

**A especificação do produto é `Documentação QTS - HelpDesk.pdf`.** A documentação
declarada e as decisões de arquitetura estão em [`docs/`](docs/README.md).

## Stack

JavaScript / Node.js · Express · **HTML, CSS e JavaScript servidos de
`public/`** · PostgreSQL com migrações em `db/migrations/` · JWT para sessão e
bcrypt para senhas · Jest e Supertest.

Fluxo: `Interface web → Rotas → Controllers → Services → Repositories → Banco`.

## Como rodar

> **Situação atual (2026-10-09): ainda não roda.** Não existe `package.json`
> na raiz e o banco não foi criado. Os comandos abaixo são o contrato a ser
> cumprido, não o estado de hoje.

```bash
npm install
cp .env.example .env      # ajustar DATABASE_URL e JWT_SECRET
npm run migrate           # cria o schema
npm run seed              # carga de demonstração
npm run dev               # sobe com recarga automática
npm test                  # roda os testes uma vez
npm run lint              # verificação estática
```

**Ambientes:** `development` (programar), `test` (banco isolado e recriável),
`demo` (seed estável para apresentação).

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

Tela de Login entregue e não integrada (`public/`), backend em esqueleto, sem
banco, sem testes, sem seed. As lacunas conhecidas — incluindo o conflito entre
`frontend/` (React) e `public/` (vanilla) — estão registradas em
[`docs/reference/known-issues.md`](docs/reference/known-issues.md).