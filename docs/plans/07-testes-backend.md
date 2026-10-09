---
title: Passo 07 — testes do backend
type: plano
updated: 2026-10-09
tags: [plano, backend, testes, jest]
---

# Passo 07 — testes do backend

**Entrega:** suíte que prova as regras críticas e o contrato, isolada do banco
de demonstração.

## Escopo

- `tests/setup.js`: `DB_PATH` apontando para banco temporário por worker,
  migrate + seed antes de tudo. **Banco de teste separado** (nunca o de demo).
- `tests/unit/transition.test.js`: matriz `assertTransition` — cada transição
  permitida passa; saltos (`open → closed`, `closed → open`,
  `analysis → resolved`) lançam `INVALID_STATE`; fechar sem comentário lança
  `RESOLUTION_COMMENT_REQUIRED`; `closed → in_progress` por solicitante dá 403.
- `tests/unit/validate.test.js`: limites 9/10/100/101, 29/30, prioridade
  desconhecida, comentário 1001.
- `tests/unit/lockout.test.js`: `lockedUntil` com relógio injetado — 0/1/2
  falhas liberam, a 3ª trava por 10 min, depois libera.
- `tests/api/sessions.test.js`: 200 + token; 401 sem revelar o campo; 423 na
  terceira falha; seguro contra enumeração (e-mail inexistente dá o mesmo 401).
- `tests/api/tickets.test.js`: 201 cria com dono do token; 400 valida; 403 de
  outro dono sem vazar; paginação corta `pageSize`; filtros combinados.
- `tests/api/detail.test.js`: transição válida + histórico com ator/antes/depois;
  regra do crítico; 409 sem comentário; comentário fora de autorização 403;
  soft delete some da lista.
- `tests/api/reports.test.js`: totais batem com a lista; zeros presentes;
  solicitante × técnico divergem quando há chamado alheio.

## Fora de escopo

E2E de interface (passos 08–11 verificam clicando). Teste de desempenho
(RNF01 — medir, não travar; sem ferramenta hoje).

## Aceite

- [ ] `npm test` verde de ponta a ponta, com banco de teste isolado.
- [ ] Regras críticas 100% cobertas: transição, bloqueio, validação, crítico,
      permissão, histórico.
- [ ] Mutação manual: inverter uma regra (ex.: permitir `open → closed`) faz o
      teste correspondente falhar — provado uma vez, registrado aqui.
- [ ] `git diff --check` limpo.