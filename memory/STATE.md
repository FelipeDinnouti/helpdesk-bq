# helpdesk-bq — Estado e passagem de turno

Atualizado em **2026-10-09**. **Aplicação implementada (passos 00–12),
revisada com PASS e commitada.** Entrega: **9 de outubro** (hoje).

> **Princípio:** `docs/` é a fonte da verdade. Este arquivo é estado
> transitório: onde estamos, o que fazer agora, o que não repetir. Decisão mora
> em `docs/`; situação mora aqui.

## 1. Leia nesta ordem

1. **Este arquivo** — onde estamos.
2. **`memory/TASK-01.md`** — o plano operante.
3. **`docs/README.md`**, depois **[[reference/glossary]]** — o contrato de
   nomenclatura — antes de escrever qualquer código, tela, teste ou commit.

## 2. Estado atual

- **Especificação:** `Documentação QTS - HelpDesk.pdf` (11 p., escrita pelo
  grupo) é a **fonte da verdade do produto**. `Apostila_Operacao_Software_
  Confiavel.pdf` (102 p.) é material complementar da disciplina e traz a
  rubrica. Índice em `docs/reference/specification.md`.
- **Vocabulário:** travado. `ticket` é o termo canônico; **"chamado"** só em
  string visível ao usuário, nunca em identificador. `docs/reference/glossary.md`.
- **Equipe:** cinco colaboradores, uma tela cada, dirigidos como
  *"colaborador responsável por &lt;Tela&gt;"*, nunca pelo nome.
  `docs/project/team-and-screens.md`.
- **Aplicação: pronta e verde (commit `b6cf4b5`).**
  - Back: Express com `POST /api/sessions` (JWT + bcrypt + bloqueio 3/5min→10min),
    CRUD de chamados com filtros e paginação, transições com histórico,
    comentários, relatórios e admin. SQLite em arquivo (schema portátil);
    migrações + seed (3 usuários, 12 chamados).
  - Front: React com as 5 telas integradas à API real; E2E por Chromium (login,
    filtros, criar, detalhe, dashboard, 360px, teclado), sem erro de JS.
  - Testes: 41 verdes (Jest + Supertest), banco isolado por arquivo, mutation
    check da transição registrado no ledger.
- **Decidido pelo usuário: React.** `frontend/` é a interface; `public/`
  vanilla vira referência visual. Ver **G12**.
- **Lacunas G1–G14: todas decididas em 2026-10-09** por autoridade do usuário.
  Canônicas em `docs/reference/specification.md` §7, com fonte e motivo.

## 3. Próximo

1. **Dívidas da revisão** (4, pequenas): SQL em services → repositories; 400 do
   login com `details[]`; nota sobre reativação de usuário; import duplo no
   `NewTicket.jsx`. Plano em `docs/plans/13-demo.md`.
2. **Verificação de sala limpa**: `rm db + migrate + seed + dev + build` do zero
   e jornada completa de demonstração rodada uma vez de ponta a ponta.
3. **Revisão + commit** do lote, e demonstração pronta para entrega.

## 4. Restrições

- **A QTS manda.** Se um `.md` divergir do PDF, o PDF vence.
- **Não seguir o processo da apostila.** O produto dela sim, o cerimonial não.
- Orçamento de revisão: 2 rodadas por lote; achado DOC agrupado.
- PASS visual obrigatório em lote de interface.
- Autoridade de commit permanente: mensagem convencional quando verde e revisado.
- Sem segredo em código, documento ou memória. Sem reescrita de histórico.
- Substantivo novo no código → entrada no glossário antes.

## 5. Não repetir

- Nenhum lote sem revisão vai para commit.
- Todo achado ganha linha no ledger do ciclo **antes** do commit que corrige.
- **Afirmar que a edição entrou é obrigatório; confiar cegamente no script, não.**
  Editação roteirizada que casa com nada parece que funcionou — confirmar lendo as
  linhas mudadas.
- Teste de correção passa por mutação.
- Smoke ≠ visual; suíte verde ≠ funciona.
- **Mock ≠ integração:** o mock de Login prova o visual, não o login.

## 6. Mapa do repositório

| Caminho | O que é |
|---|---|
| `docs/README.md` | índice da documentação — comece aqui |
| `docs/reference/specification.md` | **a QTS reorganizada** |
| `docs/reference/glossary.md` | **contrato de nomenclatura — leia antes de codar** |
| `docs/project/team-and-screens.md` | as cinco telas e seus responsáveis |
| `docs/reference/spec-map.md` | a apostila e a rubrica |
| `docs/reference/known-issues.md` | lacunas G1–G12 e itens abertos |
| `docs/decisions/decision-log.md` | cada decisão travada, uma linha |
| `docs/decisions/product-decisions.md` | decisões de produto PD-01…PD-07 |
| `memory/STATE.md` | este arquivo — porta de entrada |
| `memory/TASK-01.md` | plano operante |
| `.opencode/agents/` | personas — autoridade do fluxo |
| `.opencode/commands/` | `/microfix` — a via de mudança pequena |
| `src/` `public/` `db/` `middlewares/` `tests/` | a aplicação |
| `frontend/` `thoughts/` | material de outro colaborador — não tocar sem decisão |