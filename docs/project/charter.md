---
title: Documento de abertura do projeto
type: projeto
updated: 2026-10-09
tags: [projeto, abertura, escopo, objetivo]
---

# Documento de abertura do projeto

## Missão

Construir o sistema de Help Desk do Colégio Bento Quirino descrito na
`Documentação QTS - HelpDesk.pdf`: uma aplicação web que integra professores e
a equipe de TI, organiza chamados por urgência e registra histórico suficiente
para gerar dados. **Entrega: 9 de outubro.**

A pergunta de decisão da disciplina é: *"A versão do sistema HelpDesk BQ possui
qualidade suficiente para entrar em produção?"* (apostila, Orientação p. 6).

## Problema

Sem Help Desk, três coisas acumulam (QTS, "Descrição do problema"):

1. **Desorganização na priorização** — a equipe atende sem ordem clara, e uma
   falha trivial pode passar na frente de uma crucial. As aulas são impactadas:
   o docente não sabe se nem em quanto tempo será atendido.
2. **Falta de registros formais** — ninguém sabe quantos problemas existem, o
   que foi resolvido e o que foi esquecido. Sem dado não há padrão, e a correção
   é do sintoma, não da causa. A equipe gestora fica sem base para dimensionar
   equipe ou decidir compras.
3. **Sobrecarga da TI** — pedidos informais fragmentam o trabalho e quase não
   sobra tempo para manutenção preventiva e melhorias.

## Objetivos

- **Fluxo principal funcionando:** login → abrir → priorizar → atender →
  fechar → reportar.
- **As cinco telas** da QTS, cada uma com seus estados e seu estado alternativo:
  Login, Lista, Novo chamado, Detalhe, Dashboard.
- **Toda tela coerente:** uma estrutura, um cabeçalho/navegação, cartões,
  tabelas, botões, formulários e painéis de estado consistentes.
- **Toda tela honesta:** estados de carregando, vazio e erro. Nenhum número
  inventado, nenhuma tela em branco por falha.
- **Padrão pequeno e reaproveitado** — não reinventado por tela.
- **Decisão de release sustentada por evidência**, não por opinião.

## Não objetivos

- **Não seguimos o processo da apostila.** Dois grupos, papéis rotativos,
  cadência de encontros, gates com dupla assinatura, comitê de release: fora.
  A QTS é o nosso documento; ver [[decisions/decision-log]].
- Sem matriz de funcionalidades exaustiva. Completar o fluxo é mais importante
  que amplitude.
- Sem redesenho global no meio da sprint, depois que a linguagem visual travar.
- Sem dados fictícios vendidos como reais — seed determinístico e rotulado
  como seed é bem-vindo.
- Sem endurecimento de produção além do escopo: sem pipeline de deploy, sem
  operação multi-ambiente.

## Restrições técnicas

Vindas da QTS, que é a fonte da verdade do produto:

- **JavaScript / Node.js** no back, **Express**.
- **Front em HTML, CSS e JavaScript**, servidos pela própria aplicação a partir
  de `public/`. A QTS justifica: *"A escolha por uma única linguagem nas duas
  pontas simplifica a comunicação entre as equipes e reduz a curva de
  aprendizado do grupo."*
- **PostgreSQL**, com migrações em `db/migrations/`.
- **JWT** para sessão, **bcrypt** para senhas.
- **Jest e Supertest** para testes.
- **Git e GitHub**, branches próprias, integração por pull request.

## Linha de base

No momento da reindexação (2026-10-09):

- **Back:** esqueleto. `src/app.js` e `src/server.js` são comentários;
  `src/routes/authRoutes.js`, `src/controllers/authController.js`,
  `src/services/authService.js` e `middlewares/authMiddleware.js` existem como
  placeholders. **Sem `package.json` na raiz, sem dependências, sem banco.**
- **Front em `public/`:** tela de Login completa em HTML/CSS/JS, com mock do
  fluxo autenticado e um comentário `TODO(back)` com o `fetch` sugerido.
- **`frontend/`:** projeto React 19 + Vite, também com a tela de Login. Conflita
  com a stack da QTS — ver [[reference/specification]] §8.1, em decisão.
- **`docs/`:** este vault.
- **Banco:** nada. `db/migrations/` só tem `.gitkeep`.

## Padrão de entrega

Um lote de interface só é commitado depois de: verificações passando,
`code-reviewer` com PASS e **PASS visual** (inspeção da tela renderizada ou
veredito do usuário na rota exata). Um smoke test passando não é aprovação
visual.

## Relacionados

- [[reference/specification]] — a QTS reorganizada
- [[project/team-and-screens]] — as telas e seus responsáveis
- [[project/boundaries]] — o que pode ser tocado
- [[reference/spec-map]] — a apostila e a rubrica
- [[reference/known-issues]] — lacunas em aberto