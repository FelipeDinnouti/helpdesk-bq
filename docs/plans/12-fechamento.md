---
title: Passo 12 — fechamento
type: plano
updated: 2026-10-09
tags: [plano, fechamento, revisao, demo]
---

# Passo 12 — fechamento

**Entrega:** aplicação completa, revisada, comitada e demonstrável do zero.

## Escopo

- Atualizar o `README.md` da raiz: o estado "ainda não roda" acabou. Comandos
  reais de instalação, migração, seed, dev (back + front), teste e build.
- Revisão única e completa com `code-reviewer` (back + front). O plano previa
  duas passadas; com o prazo de hoje, uma passada completa preserva a intenção
  (nenhum commit sem revisão) sem inviabilizar a entrega. Registrado aqui.
- Corrigir os achados no ledger deste ciclo.
- Seed fresco + jornada completa de demonstração (solicitante abre, técnico
  atende e resolve, dashboard mostra) rodada uma vez de ponta a ponta.
- Commit único e limpo de tudo que os passos 01–11 construíram.

## Fora de escopo

Funcionalidade nova. A partir daqui, só correção do que a revisão apontar.

## Aceite

- [ ] `npm test` verde; `npm run build` gera `dist/`.
- [ ] Demo do zero (`rm db + migrate + seed + dev`) refeita e gravada em passos.
- [ ] Revisor PASS (uma rodada; segunda só se a primeira achar blocker).
- [ ] Commit com mensagem convencional; árvore limpa.
- [ ] Telegram final com o resumo da entrega.