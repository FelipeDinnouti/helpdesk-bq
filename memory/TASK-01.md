# TASK-01 — helpdesk-bq

Situação: **QTS lida, documentação reindexada em pt-BR. Implementação não
começada — a aplicação ainda não roda.**

Autoridade: `docs/` guarda as decisões; **este arquivo é o plano operante
enquanto aberto.** Retrospectivas vão para o ledger do ciclo na hora, nunca se
acumulam aqui.

## 1. Travado

- A `Documentação QTS - HelpDesk.pdf` define o produto. A apostila complementa e
  nunca contradiz; onde as duas divergem, vira lacuna, não requisito.
- Stack: Node.js + Express, **front HTML/CSS/JS de `public/`**, PostgreSQL,
  JWT + bcrypt, Jest + Supertest.
- `ticket` é o substantivo canônico; pt-BR **chamado** só em string visível.
- Cinco telas, cinco colaboradores, dirigidos como *"colaborador responsável por
  &lt;Tela&gt;"*, nunca pelo nome.
- Sequência de status fechada, com retorno de Resolvido para Em atendimento, e
  crítico não fecha sem comentário de resolução.
- Três perfis: `requester`, `technician`, `admin`.
- Fora do produto: chat, anexos, notificações reais, integração externa,
  recuperação por e-mail, SLA automático, auditoria exportável.
- 2 rodadas de revisão por lote; achado DOC agrupado; PASS visual obrigatório em
  interface; autoridade de commit permanente.

## 2. Feito

- [x] `.opencode/agents/{project-manager,code-reviewer,ui-designer}.md`
- [x] `.opencode/commands/microfix.md`
- [x] `docs/` — vault completo
- [x] Leitura e indexação da apostila → `docs/reference/spec-map.md`
- [x] Leitura da QTS e reindexação de todo o vault em pt-BR →
      `docs/reference/specification.md`
- [x] Vocabulário → `docs/reference/glossary.md`
- [x] Base de delegação → `docs/project/team-and-screens.md`
- [x] `README.md` da raiz com stack, telas, comandos e estado

## 3. Próximo, nesta ordem

1. **Decidir G10** — `public/` vanilla (QTS) ou `frontend/` React. Decide a base
   de toda a interface. Uma linha no registro de decisões.
2. **`package.json` na raiz** com `dev`, `test`, `lint`, `start`, `migrate`,
   `seed`, e `.env.example`. Sem isso nada roda.
3. **Decidir G5** (rota de login) e acertar o mock em `public/js/login.js`.
4. **Travar a linguagem visual** com o `ui-designer`.
5. **Backend mínimo**: migrações, login com JWT + bcrypt e bloqueio de 10 min,
   CRUD de chamados com validações, transição de status com histórico,
   `/api/reports/summary`.
6. **Seed** com os 12 chamados.
7. **As cinco telas**, uma por lote: Login (integrar) → Novo chamado → Lista →
   Detalhe → Dashboard.
8. Decidir no caminho: G1 (fila), G2 (responsável), G4 (comentários),
   G6 (exclusão), G7 (paginação), G8 (reabertura), G9 (limite da descrição).

## 4. Perguntas para o grupo

- **G10 é a decisão que mais trava.** Sem ela, metade do front pode ser
  descartada. Quem decide, e até quando?
- `app.js` e `server.js` na raiz (como a QTS mostra) ou em `src/` (como estão)?
- `categoria` entra como tabela, campo do chamado, ou sai? Quem faz?
- A exclusão de chamado (RF07 da apostila) entra ou sai, já que a QTS não
  menciona?

## 5. Inegociáveis

- Nenhum lote sem revisão vai para commit.
- Todo achado ganha linha no ledger do ciclo **antes** do commit que corrige.
- **Afirmar que a edição entrou é obrigatório; confiar cegamente no script, não.**
  Editação roteirizada que casa com nada parece que funcionou — confirmar lendo as
  linhas mudadas.
- Sem segredo em lugar nenhum. Sem reescrita de histórico.
- Substantivo novo só entra no código depois de entrar no glossário.
- **Mock não é integração.** O mock de Login não vale como prova de que o
  login funciona.
- **Não tocar em `frontend/`, `thoughts/` ou no Login de `public/`** sem o
  grupo decidir — é trabalho de outra pessoa.