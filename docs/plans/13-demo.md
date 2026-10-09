---
title: Passo 13 — dívidas da revisão + sala limpa
type: plano
updated: 2026-10-09
tags: [plano, fechamento, dividas, demo]
---

# Passo 13 — dívidas da revisão + sala limpa

**Entrega:** as 4 notas não-bloqueantes da revisão final resolvidas (ou
registradas com motivo) e a demonstração provada do zero.

## Escopo

Dívidas herdadas do PASS com notas (ledger do ciclo 2026-10-09):

1. **SQL em services** (`report-service.js`, `ticket-service.js`,
   `detail-service.js` usam `db.prepare` direto; o acordo de camadas manda SQL
   só em `repositories/`). Mover as consultas para os repositórios
   correspondentes, sem mudar comportamento — a suíte prova.
2. **Login 400 sem `details[]`.** `auth-service.js` lança `VALIDATION_ERROR`
   sem o array; o front não consegue destacar e-mail/senha. Adicionar
   `details: [{field:'email'},{field:'password'}]` conforme o caso. **Toque no
   contrato** (estende o envelope no login), então entra teste de API.
3. **Reativação de usuário.** `createUser` dá 409 em e-mail inativo sem caminho
   de volta. Decisão: **não implementar reativação** — não há desativação de
   usuário em nenhum fluxo (só categoria tem). Registrar o motivo e fechar.
4. **Import duplo no `NewTicket.jsx`.** Duas linhas do mesmo
   `'../components/shell.jsx'` — fundir em uma.

**Sala limpa:** `rm -f db/helpdesk.db* && npm run migrate && npm run seed`,
`npm test` verde, `npm run build` no front, e a jornada completa rodada uma vez
por Chromium contra esse banco fresco: solicitante abre → técnico assume,
comenta e resolve → dashboard reflete → logout/login como técnico funciona.

## Fora de escopo

Funcionalidade nova. Reativação de usuário (decidido acima: não).

## Aceite

- [ ] `npm test` verde após mover o SQL (comportamento idêntico).
- [ ] Login 400 com `details[]` + teste de API cobrindo.
- [ ] Jornada de demonstração rodada do zero, sem erro de JS, com capturas.
- [ ] Revisor PASS + commit + telegram.
- [ ] `git diff --check` limpo.