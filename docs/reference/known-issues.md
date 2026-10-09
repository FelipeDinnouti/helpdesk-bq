---
title: Lacunas conhecidas
type: referencia
updated: 2026-10-09
tags: [referencia, problemas, lacunas]
---

# Lacunas conhecidas

Itens em aberto, decisões pendentes e perguntas sem dono. Uma linha cada, com
situação.

## 1. Lacunas entre a QTS, a apostila e o repositório

Detalhadas em [[reference/specification]] §7.

| # | Lacuna | Bloqueia | Situação |
|---|---|---|---|
| G1 | **`fila` / queue não é definida.** A QTS diz que o técnico "visualiza a fila para a qual possui autorização", mas não há tabela, coluna ou regra | Lista, Detalhe | **aberto — precisa de decisão do grupo** |
| G2 | **Os documentos divergem sobre responsável técnico.** A apostila exige histórico quando o responsável muda e lista `owner_id`; a QTS não menciona responsável e lista as migrações sem ele | Detalhe | **aberto** |
| G3 | **`categoria` é entidade nova da QTS**, ausente na apostila. Nenhuma tela da QTS lista categoria como campo | Detalhe, migrações | **aberto** |
| G4 | **Não existe endpoint de comentários.** A tela Detalhe exige comentar e há migração de comentários, mas a QTS só nomeia `/api/reports/summary` | Detalhe | **aberto** |
| G5 | **A rota de login não está travada.** A QTS não nomeia nenhuma. A apostila propõe `POST /api/sessions`; o plano em `thoughts/` e um comentário `TODO(back)` em `public/js/login.js` sugerem `POST /api/auth/login` | integração front/back | **aberto** |
| G6 | **`categoria` não tem dono.** A divisão de trabalho da QTS não lista ninguém para a tabela; o plano em `thoughts/` não a menciona | — | **aberto** |
| G7 | **Exclusão de chamado:** a apostila exige (RF07, só admin, com justificativa e auditoria); a QTS não menciona | Detalhe | **aberto — entra ou sai do escopo** |
| G8 | **Paginação e ordenação nunca especificadas.** A QTS diz "navegar pelos resultados"; a apostila fala em lista paginada. Nem tamanho de página, nem ordem padrão, nem desempate | Lista, Dashboard | **aberto** |
| G9 | **`app.js` e `server.js`:** a QTS põe na raiz; o repositório tem em `src/` (e a apostila também) | estrutura | **aberto** |
| G10 | **`frontend/` é React 19 + Vite**, mas a QTS especifica HTML/CSS/JS servidos de `public/`, com justificativa explícita. As duas versões da tela Login chegaram no mesmo PR #1 | arquitetura do front | **aberto — maior decisão pendente** |
| G11 | **Formato do `correlationId`:** apostila Passo 20/33 usa `req_7f31…`; Passo 27 usa `crypto.randomUUID()` cru | logs, RNF07 | **aberto** |
| G12 | **Nome do repositório / branch de trabalho.** A QTS desenha `HELPDESK-BQ-MAIN/`; o repositório é `helpdesk-bq` e há branches em uso | organização | **aberto, baixo impacto** |

## 2. Itens do projeto

| # | Item | Situação |
|---|---|---|
| 1 | **A tela de Login existe** (`public/login.html` + CSS + JS) com mock do fluxo e um comentário `TODO(back)` com o `fetch` sugerido | feito visualmente, **não integrado** |
| 2 | **Não existe `package.json` na raiz** — a QTS exige que o README traga instruções de execução, e não há como rodar nada ainda | **aberto — bloqueia tudo** |
| 3 | Backend é esqueleto: `src/app.js` e `src/server.js` são comentários; rotas, controller, service e middleware são placeholders | **aberto** |
| 4 | Banco inexistente: `db/migrations/` só tem `.gitkeep` | **aberto** |
| 5 | Nenhum teste. `tests/` só tem `.gitkeep` | **aberto** |
| 6 | Linguagem visual **não estabelecida** — é a tarefa de design de maior alavancagem antes das outras quatro telas | **aberto** |
| 7 | Sem seed de demonstração. Sem ele, Login→Lista→Detalhe→Dashboard aparecem vazios na apresentação | **aberto** |
| 8 | `public/js/login.js` sugere `/api/auth/login` num comentário `TODO(back)`; nada em execução aponta para lá | aberto, dependente de G5 |
| 9 | O `frontend/README.md` é o boilerplate do Vite em inglês, não do projeto | aberto, pertence a quem fez |

## 3. Descartado de propósito

| Item | Motivo |
|---|---|
| Diretórios `evidencias/` e `qualidade/` | evidência mora em `docs/`, métricas no ledger de ciclo |
| Processo da apostila (dois grupos, papéis rotativos, cadência de encontros) | decisão de 2026-10-02 |
| `docs/reference/verification-pitfalls.md` em inglês | **revertido** — traduzido para pt-BR em 2026-10-09, conteúdo mantido |

*Scaffold em 2026-10-02. Apostila lida em 2026-10-02. QTS lida em 2026-10-09.*