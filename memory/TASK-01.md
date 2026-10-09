# TASK-01 — helpdesk-bq

Situação: **Implementação concluída e commitada (passos 00–12). 41 testes
verdes. Falta: demonstrar e entregar.**

Autoridade: `docs/` guarda as decisões; **este arquivo é o plano operante
enquanto aberto.** Retrospectivas vão para o ledger do ciclo na hora, nunca se
acumulam aqui.

## 1. Travado

- A `Documentação QTS - HelpDesk.pdf` define o produto. A apostila complementa e
  nunca contradiz; onde as duas divergem, vira lacuna, não requisito.
- Stack: Node.js + Express, **front React 19 + Vite (`frontend/`)**, SQLite em
  arquivo com schema portátil (Postgres é o alvo), JWT + bcrypt, Jest + Supertest.
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

## 3. Próximo — os 13 passos do plano-mestre

Plano completo em `docs/plans/00-master.md`. Cada passo tem seu arquivo em
`docs/plans/`, sua verificação e seu aviso no Telegram. Ordem:

- [x] **00** — decisões G1–G14 travadas e registradas
- [x] **01** — fundação do backend (`package.json`, Express, `/api/health`)
- [x] **02** — banco (migrações + seed)
- [x] **03** — auth (`POST /api/sessions`, JWT + bcrypt, bloqueio)
- [x] **04** — chamados (CRUD + filtros + paginação)
- [x] **05** — status, comentários, histórico, exclusão lógica
- [x] **06** — relatórios + admin (categorias, usuários)
- [x] **07** — testes do backend (unit + API)
- [x] **08** — front base + Login integrado
- [x] **09** — Lista + Novo chamado
- [x] **10** — Detalhe
- [x] **11** — Dashboard + 360px + a11y
- [x] **12** — fechamento (demo, visual, revisão, commit)

## 4. Perguntas para o grupo

Nenhuma pendência de documentação — G1–G14 decididas. Se o grupo quiser rever
qualquer decisão, o registro está em `docs/decisions/decision-log.md`.

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
- **Não apagar `public/` vanilla nem `thoughts/`** — são trabalho de outro
  colaborador e viraram referência (G12 registrada).