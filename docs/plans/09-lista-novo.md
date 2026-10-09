---
title: Passo 09 — Lista e Novo chamado
type: plano
updated: 2026-10-09
tags: [plano, frontend, lista, novo-chamado]
---

# Passo 09 — Lista e Novo chamado

**Entrega:** as duas telas funcionando de ponta a ponta contra a API.

## Escopo

**Lista (`/lista`)** — RF06, RF09, RF14:

- Filtros: status, prioridade, categoria (carrega de `/api/categories`) —
  isolados e combinados; paginação com anterior/próxima + "página X de N";
  `pageSize` fixo em 10.
- Tabela: título (link para o detalhe), status e prioridade com `badge`,
  categoria, solicitante, atualizado em. Técnico/admin veem coluna de
  solicitante; solicitante vê só os seus (a API já garante — a tela não
  refiltra).
- Estados: carregando, erro com retry + código de suporte, **vazio** ("Nenhum
  chamado por aqui." + botão "Abrir chamado"), vazio com filtro ("Nada com
  esses filtros." + botão "Limpar filtros").
- Filtros na URL (`?status=&priority=`) para o estado ser compartilhável.

**Novo chamado (`/novo`)** — RF03, RF04, RF05:

- Título, descrição, prioridade (select com Baixa/Média/Alta/Crítica),
  categoria (select, opcional).
- Validação cliente espelhando o servidor (10–100, 30–5000); erro do servidor
  mostra `details` junto ao campo.
- Botão ocupado durante o envio (anti-duplo); erro de rede ("Verifique sua
  conexão.") com os dados preservados; sucesso → detalhe do chamado criado
  com o ID visível.

## Fora de escopo

Detalhe (10), Dashboard (11). Exclusão aparece só no Detalhe.

## Aceite

- [ ] E2E: filtrar `crítica` mostra só críticas; combinar `resolvido+alta`;
      limpar filtros volta ao total; paginação anda.
- [ ] E2E: criar com título de 9 mostra erro no campo; criar válido cai no
      detalhe; sem conexão (derrubar o back) mostra erro e preserva o texto.
- [ ] Vazio real (usuário novo sem chamado) mostra o estado vazio com ação.
- [ ] Capturas conferidas: lista cheia, lista vazia, formulário com erro.
- [ ] `git diff --check` limpo.