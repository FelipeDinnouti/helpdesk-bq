---
title: Passo 10 — Detalhe do chamado
type: plano
updated: 2026-10-09
tags: [plano, frontend, detalhe]
---

# Passo 10 — Detalhe do chamado

**Entrega:** a tela mais densa — dados, histórico, comentários e todas as ações
permitidas ao perfil, cada uma com seu estado de erro.

## Escopo

- Rota `/chamados/:id`: carrega em paralelo `GET /:id`, `GET /:id/comments`,
  `GET /:id/history`.
- Bloco de dados: título, descrição, status/prioridade com badge, categoria,
  solicitante, responsável, datas.
- Bloco de ações (só técnico/admin veem; solicitante não vê o bloco):
  - Mudar status: select com **só as transições válidas a partir do atual**
    (vem da matriz do front, espelhando o back) + campo de comentário; ao
    fechar ou reabrir, o comentário é obrigatório e o erro 409 mostra junto
    ao campo.
  - Assumir (define `owner_id` com o próprio usuário) / liberar (null).
  - Mudar prioridade e categoria (selects + salvar).
  - Excluir (só admin): pede justificativa em campo obrigatório, confirma,
    volta para a lista.
- Bloco de comentários: lista cronológica + formulário (1000 máx., erro junto
  ao campo, 403 mostra "sem permissão").
- Bloco de histórico: lista cronológica com ator, data, ação, antes/depois em
  linguagem simples ("Status: Aberto → Em análise, por Rafael").
- Estados: 404 ("Chamado não encontrado."), 403 ("Você não tem permissão para
  ver este chamado."), 409 com mensagem, erro de rede com retry.

## Fora de escopo

Dashboard (11). Edição de título/descrição (não existe na API nem na QTS).

## Aceite

- [ ] E2E como técnico: abrir detalhe, comentar, avançar `análise →
      atendimento`, assumir, mudar prioridade — cada ação reflete na hora.
- [ ] E2E: fechar sem comentário mostra o erro junto ao campo; com comentário
      fecha.
- [ ] E2E como solicitante: vê dados + histórico + comenta; não vê o bloco de
      ações; detalhe alheio dá 403.
- [ ] E2E como admin: exclui com justificativa e cai na lista.
- [ ] Capturas conferidas: detalhe completo, sem permissão, não encontrado.
- [ ] `git diff --check` limpo.