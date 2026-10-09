---
title: Limites e regras de escopo
type: projeto
updated: 2026-10-09
tags: [projeto, limites, escopo, seguranca]
---

# Limites e regras de escopo

Fonte operacional junto de `.opencode/agents/project-manager.md`.

## Áreas graváveis (nada congelado)

| Caminho | O que é |
|---|---|
| `src/` | Aplicação Express: `app.js`, `server.js`, `routes/`, `controllers/`, `services/`, `repositories/` |
| `public/` | Frontend estático (HTML/CSS/JS) — **a superfície avaliada** |
| `db/migrations/` | Esquema e sementes |
| `middlewares/` | Middlewares do Express |
| `tests/` | Suíte de testes |
| `docs/` + `memory/` | Decisões + estado de trabalho |
| `frontend/` | Projeto React experimental — **fora até a decisão G10** |

## Estrutura de referência

A QTS define a estrutura do projeto (§5.2 de [[reference/specification]]). Vale
a da QTS, com uma divergência já registrada:

| Item | QTS | Repositório | Decisão |
|---|---|---|---|
| `app.js`, `server.js` | na raiz | `src/app.js`, `src/server.js` | **em aberto** — ver §8.2 da especificação |
| Frontend | `public/` (HTML/CSS/JS) | `public/` **e** `frontend/` (React) | **em aberto** — ver §8.1 da especificação |
| Pastas e arquivos | os 12 itens da tabela de funcionalidades | + `frontend/`, `thoughts/`, PDFs | documentado, não removido |

Nenhuma dessas duas divergências foi alterada por esta documentação. Decidir
com o grupo antes de reorganizar qualquer coisa: mexer nisso quebra trabalho de
outra pessoa.

## Escopo

- O escopo de implementação é a aplicação inteira acima. Sem repositórios
  congelados, sem caminhos interditados.
- **Camadas:** SQL em `repositories/`, regra de negócio em `services/`, HTTP em
  `controllers/`/`routes/`. Controller fino.
- Fluxo, conforme a QTS: `Interface web → Rotas → Controllers → Services →
  Repositories → Banco de dados`.
- Mudança de endpoint ou contrato ganha uma linha no registro de decisões. Nada
  de semântica nova em silêncio.

## Ao entrar no produto

- O que a QTS define é obrigatório até ela mudar.
- O que a apostila acrescenta (RNF, contrato de API, RF) entra **desde que não
  contradiga a QTS**. Onde contradiz, é lacuna, não requisito — ver
  [[reference/specification]] §7.
- Trabalho de outra pessoa (`public/`, `frontend/`, `thoughts/`) não é
  descartado nem reescrito sem o grupo decidindo.

## Segurança

- Sem segredo em código, documentos ou memória.
- Migrações reversíveis; sem perda destrutiva de dados no caminho da
  assignment.
- Sem dado fictício vendido como real. Seed determinístico e rotulado.
- Sem reescrita de histórico (sem reset, force-push ou rebase de branch
  compartilhada).
- Commits sob autoridade permanente: quando o lote estiver verde e revisado,
  mensagem convencional (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`,
  `chore:`).

## Referências canônicas

- **`Documentação QTS - HelpDesk.pdf`** — a fonte da verdade do produto.
  Indexada em [[reference/specification]]. **Se um `.md` daqui divergir da QTS,
  a QTS vence.**
- `Apostila_Operacao_Software_Confiavel.pdf` — material da disciplina, com a
  rubrica. Índice em [[reference/spec-map]]. Está no `.gitignore`.
- [[reference/glossary]] — contrato de nomenclatura, vinculante para todo
  identificador.
- [[project/team-and-screens]] — atribuição de telas e entregáveis por tela.
- `src/` + `public/` — a linha de base da implementação.

## Nomenclatura

Qualquer substantivo novo no código ganha entrada em [[reference/glossary]]
antes, com sua lista de proibições. O vocabulário herdado dos documentos é
adotado como está (`ticket`, `requester`, `technician`, `admin`, `comment`,
`status`, `priority`, `history`, `category`); o alias pt-BR **chamado** é a
única exceção declarada e nunca aparece em identificador.