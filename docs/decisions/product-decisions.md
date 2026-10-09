---
title: Decisões de produto
type: decisoes
updated: 2026-10-09
tags: [decisoes, produto]
---

# Decisões de produto

Cada seção: decisão, justificativa, data, situação. Estas são decisões **de
produto** — o que o sistema faz. Decisões de processo e vocabulário estão em
[[decisions/decision-log]].

---

## PD-01 — O produto é definido pela QTS

**Decisão:** `Documentação QTS - HelpDesk.pdf` é a fonte da verdade sobre o que
o sistema faz. A apostila da disciplina só complementa, e nunca contradiz.

**Justificativa:** a QTS descreve o problema real do colégio, a entrevista que o
originou e as funcionalidades escolhidas pelo grupo. A apostila é um manual de
metodologia de curso, com o produto espalhado por oito páginas de 102.

**Data:** 2026-10-09 · **Situação:** vigente

---

## PD-02 — Cinco telas, cinco responsáveis

**Decisão:** o sistema tem exatamente as cinco telas da seção "Telas e suas
funções" da QTS — Login, Lista de chamados, Novo chamado, Detalhe do chamado,
Dashboard / Relatórios — e cada uma tem um colaborador responsável,
dirigido pelo nome da tela.

**Justificativa:** as telas são a unidade de entrega verificável da QTS. Uma
tela por pessoa torna cada entrega auditável e evita que uma pessoa concentra
código e apresentação.

**Data:** 2026-10-09 · **Situação:** vigente

---

## PD-03 — Stack única, front servido de `public/`

**Decisão:** JavaScript/Node.js com Express no back; front em **HTML, CSS e
JavaScript**, servidos pela própria aplicação a partir de `public/`; PostgreSQL
com migrações em `db/migrations/`; JWT para sessão e bcrypt para senhas; Jest e
Supertest para testes.

**Justificativa:** é o que a QTS especifica, com justificativa explícita —
*"A escolha por uma única linguagem nas duas pontas simplifica a comunicação
entre as equipes e reduz a curva de aprendizado do grupo."*

**Consequência:** o `frontend/` React+Vite diverge. Ver
[[reference/specification]] §8.1.

**Data:** 2026-10-09 · **Situação:** vigente, com a pendência da G10

---

## PD-04 — Sequência de status é fechada

**Decisão:** `Aberto → Em análise → Em atendimento → Resolvido → Fechado`, com
retorno permitido de **Resolvido → Em atendimento**. Chamado crítico não fecha
sem comentário de resolução. Toda alteração grava autor, data, ação, valor
anterior e novo valor.

**Justificativa:** está escrito assim na QTS e coincide com RF11 e RF12 da
apostila. É a regra de maior risco do sistema e a que mais testes pede.

**Data:** 2026-10-09 · **Situação:** vigente

---

## PD-05 — Interface simples é requisito, não enfeite

**Decisão:** estados vazios, mensagens de validação junto ao campo, tratamento de
perda de conexão e layout em 360 px são critérios de aceite de cada tela, não
melhorias posteriores.

**Justificativa:** a entrevista que originou o projeto apontou **complexidade de
uso** como o principal problema do sistema atual. A QTS conclui que a proposta
*"não consiste apenas em substituir o sistema atualmente utilizado"*, mas em
resolver a dificuldade de uso. Uma tela clara e simples é o produto.

**Data:** 2026-10-09 · **Situação:** vigente

---

## PD-06 — Três perfis

**Decisão:** exatamente três perfis — **usuário comum / solicitante**
(`requester`), **técnico** (`technician`) e **administrador** (`admin`). O
administrador administra permissões e categorias, e suas ações administrativas
vão para o histórico.

**Justificativa:** a QTS define três tipos principais e nada sugere um quarto.
"Usuário comum" e "solicitante" são o mesmo perfil — a QTS escreve os dois
nomes na mesma linha.

**Data:** 2026-10-09 · **Situação:** vigente

---

## PD-07 — O que **não** está no produto

**Decisão:** ficam fora, sem previsão de volta: chat em tempo real, anexos,
notificações reais, integração com serviço externo, recuperação de senha por
e-mail, auditoria exportável, SLA automático.

**Justificativa:** recorte de MVP da apostila (Passo 6, story mapping) e a
própria QTS, que não menciona nenhum deles. Manter a lista explícita evita
discussão recorrente.

**Data:** 2026-10-09 · **Situação:** vigente

---

## Em aberto — precisa de decisão do grupo

Nenhuma destas foi aplicada. Detalhes em [[reference/specification]] §7 e
§8.

| Lacuna | Decisão que falta |
|---|---|
| **G1** fila / queue | O que é a fila do técnico? Tabela, coluna, ou é a categoria? |
| **G2** responsável técnico | A apostila exige histórico de responsável (RF08); a QTS não menciona. Existe coluna `owner_id`? |
| **G3** categoria | Entidade nova da QTS: entra como tabela, campo do chamado, ou sai? |
| **G4** endpoint de comentários | A tela Detalhe exige comentar e há migração, mas nenhuma rota foi especificada. |
| **G5** rota de login | A QTS não nomeia nenhuma. `POST /api/sessions` (apostila) ou `POST /api/auth/login` (plano e comentário no mock)? |
| **G6** exclusão | A apostila exige (RF07); a QTS não menciona. E a apostila em si pergunta se é física, lógica ou arquivamento auditável. Entra ou sai, e de que tipo? |
| **G7** paginação e ordenação | Tamanho de página, ordem padrão e desempate nunca foram definidos. |
| **G8** reabertura de fechado | Quem reabre um chamado **fechado**, e em que prazo? A QTS só autoriza o retorno de Resolvido para Em atendimento. |
| **G9** limite da descrição | RF04 só diz "mínimo 30". O exemplo de Zod da apostila usa `max(5000)` sem origem declarada. |
| **G10** `correlationId` | `req_7f31…` (exemplos) ou UUID cru (código)? |
| **G11** estrutura | `app.js` e `server.js` na raiz (QTS) ou em `src/` (apostila e repositório)? |
| **G12** `frontend/` React | A QTS vence e o React vira referência visual, ou a documentação é atualizada para o React? |
| **G13** leitor do Dashboard | A apostila dá os totais à *gestora*; a QTS não diz quem lê. São os três perfis? |
| **G14** nome do repositório | `HELPDESK-BQ-MAIN/` (QTS) ou `helpdesk-bq` (repositório)? |

A lista canônica, com a fonte dos dois lados e o que cada uma bloqueia, está em
[[reference/specification]] §7.
