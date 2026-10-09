---
title: Passo 11 — Dashboard, 360px e acessibilidade
type: plano
updated: 2026-10-09
tags: [plano, frontend, dashboard, responsivo, a11y]
---

# Passo 11 — Dashboard, 360px e acessibilidade

**Entrega:** o Dashboard (RF13/RF14) e a passada de responsividade +
acessibilidade nas cinco telas.

## Escopo

**Dashboard (`/dashboard`)** — RF13, RF14, G13:

- Cartões de totais por status (5, com rótulo) + por prioridade (4), total
  geral. Números com `aria-label` ("3 chamados abertos"), nunca número solto.
- Filtros: status, prioridade, categoria + período (`since`/`until` por data —
  a API já aceita; se travar, corta o período e registra).
- Estado vazio ("Sem dados para os filtros atuais." + limpar filtros),
  carregando, erro com retry.
- Prova de igualdade: os totais com os mesmos filtros batem com a Lista
  (conferido no E2E).

**Passada 360px:** viewport 360×800 nas cinco telas — sem rolagem horizontal,
ações alcançáveis, texto legível. Captura da Lista em 360px.

**Passada a11y:** só teclado do login ao dashboard (Tab/Shift+Tab/Enter);
foco visível em tudo (já há `:focus-visible`); rótulos em todos os campos;
erros com `role="alert"`; tabela com `th`; landmarks (`header/nav/main`).

## Fora de escopo

Gráficos (barras/canvas). Totais em texto + cartões bastam para RF13.

## Aceite

- [ ] E2E: totais sem filtro = 12; filtro `critical` mostra os certos; período
      estreito zera e mostra o vazio; totais com filtro batem com a Lista.
- [ ] 360px: cinco telas sem rolagem horizontal (medido, não olhado).
- [ ] Teclado: login → lista → detalhe → comentar sem mouse.
- [ ] Capturas conferidas: dashboard cheio, dashboard vazio, lista em 360px.
- [ ] `git diff --check` limpo.