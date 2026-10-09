---
title: Especificação do HelpDesk BQ
type: referencia
status: fonte-da-verdade
updated: 2026-10-09
tags: [referencia, especificacao, qts, produto, requisitos, telas]
---

# Especificação do HelpDesk BQ

**A fonte da verdade sobre o que este sistema faz é
`Documentação QTS - HelpDesk.pdf`** (11 páginas, escrita pelo grupo). Este
arquivo reorganiza aquele documento em um formato consultável e marca onde ele
se apoia na apostila da disciplina.

Se algum dia este arquivo e a QTS divergirem, **a QTS vence** — este arquivo é
um índice, não uma cópia normativa. Em caso de dúvida, abra o PDF.

- Índice de páginas e consulta rápida à apostila da disciplina:
  [[reference/spec-map]]
- Vocabulário e nomes canônicos: [[reference/glossary]]

---

## 1. O problema

O Colégio Bento Quirino não tem Help Desk integrando professores e equipe de
TI. Três consequências, na ordem em que a QTS as apresenta:

1. **Desorganização na priorização.** Sem separar pedidos por urgência, a
   equipe atende sem ordem clara — uma falha trivial pode ser priorizada em
   detrimento de uma crucial. As aulas são impactadas: quando algo falha em
   sala, o docente não sabe se e em quanto tempo será atendido, e o
   planejamento pedagógico fica comprometido.
2. **Falta de registros formais.** A equipe não sabe quantos problemas existem,
   quais foram solucionados e quais foram esquecidos. Sem dados não há padrão:
   a correção é pontual (sintoma) em vez de causal. A equipe gestora fica sem
   base para dimensionar equipe ou decidir compra de equipamentos.
3. **Sobrecarga da TI.** Interrupções constantes por pedidos informais
   fragmentam o trabalho, desorganizam o cronograma e quase não deixam tempo
   para manutenção preventiva, atualizações e melhorias.

**Conclusão da QTS:** *"... faz-se necessário um sistema de Help Desk que integre a
comunicação entre as duas partes do pedido e colete dados para melhor análise e
maior eficiência."*

---

## 2. A entrevista (origem dos requisitos)

Entrevista **semiestruturada** com um colaborador do setor de TI.

**Achados:**

- A escola **já usa** um sistema de registro e gerenciamento de chamados. O
  processo de encaminhar solicitações à TI está estabelecido; o que falta é
  praticidade.
- **Complexidade de uso.** O caminho para registrar uma solicitação não é
  suficientemente claro para quem não conhece ferramentas de suporte, então
  algumas pessoas não sabem onde nem como registrar o problema.
- **Eficiência.** Quando muitos chamados são atendidos ao mesmo tempo, a
  organização das informações e o acompanhamento tornam o processo ineficiente.
- **Comunicação.** Num ambiente escolar, apoio é pedido por alunos, professores
  e funcionários, sobre computadores, acesso a sistemas, internet,
  equipamentos, contas institucionais, projetores e impressoras.
- **O problema não é só abrir chamado.** É a forma como a informação é
  apresentada e administrada ao longo do atendimento. Usuário que não consegue
  registrar ou não acompanha o andamento gera dúvidas, solicitações repetidas
  e atrito com a TI.

**Conclusão da QTS:** a proposta **não é substituir** o sistema atual, mas
desenvolver uma solução com interface mais simples e intuitiva, atendendo os
dois lados do processo — quem solicita (poucos passos, informação clara) e a
equipe de TI (administrar chamados, atualizar status, ver pendências, manter
histórico).

> **Isto é o argumento de design do projeto, não um detalhe.** A QTS justifica
> a escolha de stack com o mesmo raciocínio: *"A escolha por uma única linguagem
> nas duas pontas simplifica a comunicação entre as equipes e reduz a curva de
> aprendizado do grupo."* Uma tela clara e simples **é requisito**, não
> enfeite.

---

## 3. As cinco telas

Os cinco perfis de tela abaixo vêm da seção "Telas e suas funções" da QTS. São
também as cinco telas de responsabilidade — ver
[[project/team-and-screens]].

### 3.1 Login

**Propósito:** porta de entrada do sistema.

| Campo | Regra |
|---|---|
| E-mail | obrigatório |
| Senha | obrigatória |
| Ação de acesso | botão de envio |
| Mensagens de erro ou bloqueio | **estado alternativo exigido** |

O sistema deve autenticar o usuário e **impedir o acesso quando as credenciais
forem inválidas**. Após **três tentativas inválidas dentro de cinco minutos**, a
conta permanece **bloqueada por dez minutos**.

### 3.2 Lista de chamados

**Propósito:** apresentar os chamados disponíveis para o usuário conforme suas
permissões.

- Visualizar chamados
- Filtrar por status
- Filtrar por prioridade
- Combinar filtros
- Navegar pelos resultados
- Apresentar estado vazio quando não houver registros

**Regra de visibilidade:** o **solicitante visualiza seus próprios chamados**;
o **técnico visualiza a fila para a qual possui autorização**.

> A "fila" aparece aqui como um conceito já assumido, mas **nenhum dos dois documentos define
> tabela, coluna ou regra de fila**. Ver lacuna **G1**.

### 3.3 Novo chamado

**Propósito:** registrar uma nova solicitação.

| Campo | Regra |
|---|---|
| Título | entre **10 e 100 caracteres** |
| Descrição | pelo menos **30 caracteres** |
| Prioridade | **baixa, média, alta ou crítica** |

A tela também deve apresentar **mensagens de validação** e tratar **perda de
conexão durante o envio**.

### 3.4 Detalhe do chamado

**Propósito:** exibir todas as informações relevantes de um chamado e
acompanhar seu atendimento.

- Visualizar os dados do chamado
- Consultar o histórico
- Adicionar comentários
- Alterar status
- Alterar prioridade, conforme permissão
- Executar ações permitidas ao perfil do usuário

**Histórico:** toda alteração é registrada com **autor, data, ação, valor
anterior e novo valor**.

**Sequência de status (controlada):**

```
Aberto → Em análise → Em atendimento → Resolvido → Fechado
```

Também existe a possibilidade de **retornar de Resolvido para Em
atendimento**. Um **chamado crítico não pode ser fechado sem um comentário de
resolução**.

> A QTS **não** menciona responsável técnico pelo chamado, nem exclusão. Ver
> lacunas **G2** e **G7**.

### 3.5 Dashboard / Relatórios

**Propósito:** visão resumida dos chamados.

- Quantidade de chamados por status
- Quantidade por prioridade
- Filtros
- Período de consulta
- Estado vazio quando não existem dados

A API prevê o endpoint **`/api/reports/summary`**, responsável por retornar
esses totais ou **informar corretamente a ausência de dados**.

---

## 4. Funcionalidades por tipo de usuário

A QTS define **três** perfis.

| Perfil (QTS) | Enum (`role`) | O que faz |
|---|---|---|
| **Usuário comum / solicitante** | `requester` | Criar e acompanhar seus chamados |
| **Técnico** | `technician` | Consultar sua fila, priorizar, comentar e alterar o status dos chamados autorizados |
| **Administrador** | `admin` | Administrar permissões e categorias e executar ações administrativas, que **devem ser registradas no histórico** |

`categoria` é uma entidade **nova em relação à apostila** — ver lacuna **G3**.

---

## 5. Como será desenvolvido

### 5.1 Tecnologias (QTS)

| Camada | Tecnologia |
|---|---|
| Linguagem | JavaScript (Node.js) |
| Backend / API | Express |
| **Frontend** | **HTML, CSS e JavaScript**, servidos pela própria aplicação a partir de `public/` |
| Banco de dados | PostgreSQL, com migrações em `db/migrations/` |
| Autenticação | **JWT** para sessão e **bcrypt** para senhas |
| Testes automatizados | Jest e Supertest |
| Controle de versão | Git e GitHub |

### 5.2 Estrutura de pastas (QTS)

```
HELPDESK-BQ-MAIN/
├── db/
│   └── migrations/
├── docs/
├── middlewares/
├── public/
├── src/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   └── services/
├── tests/
├── app.js
├── server.js
├── .gitignore
└── README.md
```

| Pasta / arquivo | Função, como a QTS descreve |
|---|---|
| `db/migrations/` | Migrações responsáveis pela criação e evolução do banco |
| `docs/` | Documentação, decisões técnicas, contratos e demais documentos |
| `middlewares/` | Funções intermediárias no processamento das requisições, como autenticação e tratamento de erros |
| `public/` | Arquivos da interface web: HTML, CSS e JavaScript |
| `src/routes/` | Rotas e endpoints disponibilizados pela API |
| `src/controllers/` | Recebem requisições, chamam os serviços e preparam a resposta HTTP |
| `src/services/` | Regras de negócio, permissões e transições de estado dos chamados |
| `src/repositories/` | Acesso e consultas ao banco de dados |
| `tests/` | Testes automatizados do sistema |
| `app.js` | Configura a aplicação Express, suas rotas e middlewares |
| `server.js` | Inicializa o servidor e a porta de execução |
| `README.md` | Informações gerais e instruções de execução |

> **Diferenças em relação ao repositório atual:** `app.js` e `server.js` estão
> em `src/` no repositório e na raiz na árvore da QTS; e existem `frontend/`
> (React/Vite) e `thoughts/`, que a QTS não prevê. Ver §7.

### 5.3 Arquitetura — fluxo

```
Interface web → Rotas da API → Controllers → Services → Repositories → Banco de dados
```

Exemplo da QTS: quando um usuário cria um chamado, a interface envia os dados
para a API; a rota recebe a requisição, o controller coordena o
processamento, o service verifica as regras de negócio e as permissões, e o
repository realiza a operação no banco.

**Por que assim:** *"Essa separação permite que cada integrante trabalhe em uma
parte sem interferir nas demais e facilita a criação de testes isolados."*

### 5.4 Divisão do trabalho (QTS)

**Backend — `src/`, `middlewares/`, `db/`**

- Configurar o Express (`app.js`) e o servidor (`server.js`).
- Criar as migrações do banco: **usuários, chamados, comentários, histórico e
  categorias**.
- Implementar login com bloqueio de 10 minutos após três tentativas inválidas em
  cinco minutos.
- Implementar o CRUD de chamados, com as validações de título (10 a 100
  caracteres), descrição (mínimo de 30 caracteres) e prioridade (baixa, média,
  alta ou crítica).
- Implementar o controle de status (Aberto → Em análise → Em atendimento →
  Resolvido → Fechado), o retorno de Resolvido para Em atendimento e a regra de
  que chamado crítico só fecha com comentário de resolução.
- Registrar no histórico autor, data, ação, valor anterior e novo valor.
- Controlar permissões por perfil (solicitante, técnico e administrador) em
  middlewares.
- Disponibilizar o endpoint `/api/reports/summary` para o dashboard.

**Frontend — `public/`**

- Desenvolver as cinco telas: Login, Lista de chamados, Novo chamado,
  Detalhes do chamado e Dashboard.
- Implementar filtros por status e prioridade, estados vazios e mensagens de
  validação.
- Tratar falhas, como perda de conexão durante o envio de um chamado.
- Consumir a API do backend e manter uma interface simples e intuitiva,
  conforme apontado na entrevista.

**Testes — `tests/`**

- Testes unitários dos services, cobrindo regras de negócio como transições de
  status e bloqueio de login.
- Testes de integração das rotas da API com Supertest.
- Testes funcionais das telas, validando fluxos completos como criar um
  chamado, filtrar a lista e fechar um chamado crítico.
- **Registro dos casos de teste, com resultado esperado e obtido, na pasta
  `docs/`.**

### 5.5 Organização da equipe (QTS)

O código fica em um repositório no GitHub, com **cada integrante trabalhando em
branches próprias e integrando por pull requests**. A pasta `docs/` reúne a
documentação e as decisões técnicas, e o `README` traz as instruções de
instalação e execução.

---

## 6. Requisitos complementares (vindos da apostila)

A QTS não é exaustiva em regras verificáveis. Estes vêm da apostila da
disciplina e **não contradizem** a QTS; preenchem o que ela deixa implícito.
Tabela completa e indexação da apostila: [[reference/spec-map]] §3.

**Não funcionais:** 95% das respostas ≤ 800 ms com 20 usuários simulados ·
utilizável a partir de 360 px sem rolagem horizontal · contraste, foco e
rótulos conforme WCAG 2.2 AA · senhas com hash forte e segredos fora do
repositório · erros sem stack, SQL, token ou dado pessoal · cobertura de linhas
≥ 70% no núcleo e 100% das regras críticas · logs estruturados com evento,
horário, rota, status e `correlationId` · CI executando lint e testes em todo
pull request.

**Contrato de API** (a QTS só nomeia `/api/reports/summary`):

| Método e rota | Saída principal |
|---|---|
| `POST /api/sessions` | 200 sessão · 401/423 erro seguro |
| `POST /api/tickets` | 201 criado |
| `GET /api/tickets` | 200 lista paginada, com `status?` e `priority?` |
| `GET /api/tickets/:id` | 200 detalhe · 403 · 404 |
| `PATCH /api/tickets/:id/status` | 200 + histórico |
| `GET /api/reports/summary` | 200 totais ou estado vazio |

Envelope de erro:

```json
{ "error": { "code": "ACCOUNT_LOCKED",
             "message": "Acesso temporariamente indisponível.",
             "correlationId": "req_7f31..." } }
```

Mensagens externas por status: 400 *Revise os campos destacados.* · 401
*Autenticação necessária.* · 403 *Ação não autorizada.* · 404 *Recurso não
encontrado.* · 409 *Transição não permitida.* · 500 *Não foi possível
concluir. Use o código de suporte.*

> A QTS **não nomeia nenhuma rota de login**. Duas rotas candidatas existem em
> três lugares do repositório. Ver lacuna **G5** e §8.3.

**Dados:** `users`, `tickets`, `comments`, `ticket_history`, `login_attempts`
(da apostila) mais `categories` (da QTS), com `CHECK` de tamanho de título, de
descrição e de enum de prioridade, e índice sobre `(status, priority)`.

**Seed:** três usuários fictícios por perfil e **12 chamados** — 3 abertos,
3 em análise, 3 em atendimento, 2 resolvidos, 1 fechado, com prioridades
distribuídas. Sem seed, a demonstração mostra telas vazias.

---

## 7. Onde a documentação e o repositório divergem

Conflitos reais, registrados para decisão — nenhum foi resolvido por conta
própria.

| # | Conflito | Onde | Efeito |
|---|---|---|---|
| **G1** | **`fila` / queue não é definida.** A QTS diz que o técnico "visualiza a fila para a qual possui autorização"; não há tabela, coluna ou regra em nenhum dos dois documentos | QTS §3.2 | Lista, Detalhe |
| **G2** | **Os documentos divergem sobre responsável técnico.** A apostila exige histórico quando o responsável muda (RF08) e lista `owner_id` (Passo 19); a QTS **não menciona responsável** e lista as migrações como "usuários, chamados, comentários, histórico e categorias" | QTS §5.4 × apostila RF08 | Detalhe |
| **G3** | **`categoria` é entidade nova da QTS**, ausente na apostila. Nenhuma tela da QTS lista categoria como campo | QTS §4, §5.4 | Detalhe, migrações |
| **G4** | **Não existe endpoint de comentários.** A tela Detalhe exige "adicionar comentários" e há migração de comentários, mas a QTS só nomeia `/api/reports/summary` | QTS §3.4, §5.4 | Detalhe |
| **G5** | **A rota de login não tem nome travado.** A QTS **não nomeia nenhuma rota de login**. A apostila propõe `POST /api/sessions`; o plano em `thoughts/` e o comentário `TODO(back)` em `public/js/login.js` sugerem `POST /api/auth/login` | QTS (ausente) × apostila Passo 20 × repositório | integração front/back |
| **G6** | **Exclusão de chamado: existe e não está definida.** A apostila exige (RF07, só administrador, com justificativa e auditoria); a QTS **não menciona** exclusão. E a apostila em si pergunta o que exclusão é — *"Física, lógica ou arquivamento auditável?"* (Passo 12), sem responder | QTS §4 × apostila RF07, Passo 12 | Detalhe |
| **G7** | **Paginação e ordenação nunca especificadas.** A QTS diz "navegar pelos resultados"; a apostila fala em lista paginada e em "paginação e ordenação" (Passo 48). Nem tamanho de página, nem ordem padrão, nem desempate | QTS §3.2 | Lista, Dashboard |
| **G8** | **Reabertura de chamado *fechado* é uma pergunta em aberto.** A QTS só autoriza o retorno de **Resolvido → Em atendimento**. A apostila pergunta e não responde: *"Pode reabrir um fechado? Somente administrador? Em qual prazo?"* (Passo 12) | QTS §3.4 × apostila Passo 12 | Detalhe |
| **G9** | **Limite máximo da descrição.** RF04 diz "no mínimo 30" e nada mais; o exemplo de Zod da apostila (Passo 30) usa `max(5000)` sem que a origem seja declarada | apostila Passo 30 × RF04 | Novo chamado |
| **G10** | **Formato do `correlationId`:** a apostila usa `req_7f31…` nos exemplos (Passo 20, 33) e `crypto.randomUUID()` cru no código (Passo 27) | apostila Passo 20/27/33 | logs, RNF07 |
| **G11** | **`app.js` e `server.js` na raiz** (QTS) **ou em `src/`** (apostila Passo 24 e repositório) | QTS §5.2 × apostila Passo 24 | estrutura |
| **G12** | **`frontend/` é React 19 + Vite**, mas a QTS especifica HTML/CSS/JS servidos de `public/`, com justificativa explícita. As duas versões da tela Login chegaram no mesmo PR #1 | QTS §5.1 × repositório | **arquitetura do front** |
| **G13** | **A quem pertence a leitura do Dashboard.** A apostila (US-10) dá os totais à *gestusta* — "Como gestora, quero visualizar totais" — e a persona *Márcia, gestora* não corresponde a nenhum dos três perfis da QTS. A QTS **não diz** quem lê o Dashboard | apostila US-10 × QTS §4 | Dashboard |
| **G14** | **Nome do repositório:** a QTS desenha `HELPDESK-BQ-MAIN/`; o repositório é `helpdesk-bq` | QTS §5.2 | organização, baixo impacto |

### Mapa da renumeração (2026-10-02 → 2026-10-09)

O conjunto de lacunas foi renumerado ao reindexar pela QTS. A regra 5 do
glossário diz que IDs "nunca são reutilizados nem renumerados"; a renumeração
aconteceu porque a QTS **acrescentou** lacunas e mudou a numeração. O ledger de
2026-10-02 é histórico e não foi alterado — quem cruzar as duas listas usa esta
tabela:

| ID em 2026-10-02 | ID em 2026-10-09 | Assunto |
|---|---|---|
| G1 | **G1** | fila / queue |
| G2 | **G2** | responsável técnico |
| G3 | — | enum de status sem mapeamento — **resolvido** em 2026-10-02, ver glossário §3b |
| G4 | **G4** | endpoint de comentários e de exclusão |
| G5 | **G5** | formato do `correlationId` |
| G6 | **G6** | "usuário comum" × três nomes — **resolvido** em 2026-10-02 |
| G7 | **G7** | exclusão (existência) |
| G8 | **G8** | reabertura de fechado — *lost in the renumber, now restored* |
| G9 | **G6** | exclusão (semântica) — *agora somada a G7* |
| G10 | **G7** | paginação e ordenação |
| G11 | **G9** | limite da descrição — *lost in the renumber, now restored* |
| — | **G3, G5, G12, G13, G14** | **novas**, vindas da QTS |

---

## 8. Decisões de arquitetura em aberto

Três escolhas que a documentação **não** pode tomar sozinha. Estão registradas
aqui para o grupo decidir; nenhuma foi aplicada.

### 8.1 `frontend/` React × `public/` vanilla — **conflito real**

O PR #1 ("LoginTela") trouxe **as duas** coisas: um `frontend/` em React 19 +
Vite, e a tela `public/login.html` + `css/login.css` + `js/login.js`. O plano
em `thoughts/shared/plans/2026-10-09-react-express-front.md` está marcado
*"aguardando aprovação — NADA implementado ainda"*, mas propõe exatamente a
divisão `backend/` + `frontend/` que a QTS não prevê.

**Decidida em 2026-10-09 por autoridade do usuário: opção (b), React.**
O `frontend/` React 19 + Vite é a interface; o Express serve `frontend/dist`
em produção e o Vite usa proxy `/api` em desenvolvimento. O `public/` vanilla
vira referência visual e não é apagado — é trabalho de outro colaborador. A
linha de stack da QTS (§5.1) fica superada neste ponto, com registro no
`decision-log.md`.

### 8.2 `app.js` e `server.js` na raiz ou em `src/`?

**Decidido: `src/` fica** (realidade + apostila Passo 24 + plano existente). A
árvore da QTS fica superada neste ponto, com registro no `decision-log.md`.

### 8.3 Rota de login

A QTS não nomeia rota de login. As duas opções que existem no repositório:

| Opção | Onde aparece | A favor | Contra |
|---|---|---|---|
| `POST /api/sessions` | apostila, Passo 20 | Traz o status **423** definido para conta bloqueada, e cabe no envelope de erro comum | Não é o que o plano em `thoughts/` propose |
| `POST /api/auth/login` | plano em `thoughts/` e comentário `TODO(back)` em `public/js/login.js` | É o que o código de demonstração já sugere | Não tem status definido para bloqueio |

**A documentação não decide.** As duas estão registradas como **G5** e a escolha é
do grupo. O que precisa mudar junto com a decisão: o comentário `TODO(back)` em
`public/js/login.js` e o contrato em §6, que hoje descreve `/api/sessions`.

---

## Relacionados

- [[reference/glossary]] — vocabulário, enums e nomes de tela
- [[project/team-and-screens]] — as cinco telas e quem responde por cada uma
- [[reference/spec-map]] — índice da apostila e a rubrica de avaliação
- [[reference/known-issues]] — situação de cada lacuna
- [[decisions/product-decisions]] — decisões de produto aprovadas
- [[decisions/decision-log]] — registro cronológico