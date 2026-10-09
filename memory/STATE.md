# helpdesk-bq — Estado e passagem de turno

Atualizado em **2026-10-09**. **QTS lida e documentação reindexada em pt-BR.**
Entrega: **9 de outubro** (hoje).

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
- **Aplicação:**
  - Front: **tela de Login entregue** em `public/login.html` + `css/login.css` +
    `js/login.js`, com mock do fluxo e ganchos `TODO(back)`. **Não integrada.**
  - Back: esqueleto. `src/app.js` e `src/server.js` são comentários; rotas,
    controller, service e middleware são placeholders.
  - **Sem `package.json` na raiz. Sem dependências. Sem banco. Sem testes. Sem
    seed.** Nada roda ainda.
- **Maior decisão pendente:** `frontend/` (React 19 + Vite) contra `public/`
  (vanilla). A QTS especifica vanilla e justifica a escolha; as duas versões
  chegaram no mesmo PR #1. Ver **G10**.
- **Lacunas abertas (G1–G14):** canônicas em `docs/reference/specification.md`
  §7, com o que cada uma bloqueia. As que travam telas: **G1** (fila), **G2**
  (responsável técnico — a apostila exige, a QTS não menciona), **G4** (sem
  endpoint de comentários), **G5** (rota de login — a QTS não nomeia nenhuma),
  **G7** (paginação), **G8** (reabertura de fechado), **G13** (leitor do
  Dashboard). As de arquitetura: **G12** (React × vanilla), **G11**
  (local de `app.js`/`server.js`).

## 3. Próximo

1. **Decidir G10** — `public/` vanilla (QTS) ou `frontend/` React. Isso decide
   a base de todo o resto da interface. Uma decisão, uma linha no registro.
2. **Criar `package.json` na raiz**, com `dev`, `test`, `lint`, `start`,
   `migrate` e `seed`. Sem isso não há como rodar nem demonstrar.
3. **Decidir G5** (rota de login) e ajustar o mock em `public/js/login.js`,
   com um comentário `TODO(back)` que sugere `/api/auth/login`.
4. **Travar a linguagem visual** com o `ui-designer` antes da segunda tela.
5. **Levantar o backend**: migrações (`users`, `tickets`, `comments`,
   `ticket_history`, `login_attempts`, `categories`), login com JWT + bcrypt e
   bloqueio, CRUD de chamados com as validações, transição de status, histórico
   e `/api/reports/summary`.
6. **Seed** com os 12 chamados da apostila, para a demonstração não abrir
   vazia.
7. **Resolver G1, G2, G4, G7, G8** antes de construir Lista, Detalhe e Dashboard.

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