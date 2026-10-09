---
title: Glossário e vocabulário controlado
type: referencia
status: fonte-da-verdade
updated: 2026-10-09
tags: [referencia, glossario, vocabulario, nomenclatura]
---

# Glossário e vocabulário controlado

**Este arquivo é o contrato de nomenclatura do projeto.** Antes de escrever
código, tela, teste, documento ou mensagem de commit, consulte o conceito aqui.
Se a palavra não está na lista, ou é prosa comum, ou você encontrou uma lacuna
de vocabulário — resolva, não invente uma terceira palavra.

Fontes:

- **`Documentação QTS - HelpDesk.pdf`** — fonte da verdade sobre *o que o
  sistema faz*.
- `Apostila_Operacao_Software_Confiavel.pdf` — material da disciplina; fonte de
  requisitos complementares e da rubrica.

---

## 1. As sete regras

1. **Um conceito, um termo canônico.** Toda palavra concorrente é um apelido
   declarado (§3) ou está banida (§4). Nunca dois termos vivos para a mesma
   coisa.
2. **A superfície de código fala inglês.** Identificadores — tabela, coluna,
   rota, valor de enum, evento de log, nome de teste, nome de arquivo — usam o
   termo canônico em ASCII `snake_case` (ou `kebab-case` em URL). Nunca
   traduzidos.
3. **A superfície de exibição fala pt-BR.** Uma string visível ao usuário pode
   usar o rótulo pt-BR declarado (§3). Strings de exibição ficam em um único
   lugar por superfície e nunca são reaproveitadas como identificador.
4. **Colisões ganham nome qualificado.** `ticket.priority` e
   `defect.priority` são coisas diferentes e sempre qualificados.
5. **IDs são o fio condutor.** Um ID estável por artefato, prefixado pelo tipo,
   nunca reutilizado nem renumerado (§5). A cadeia
   *necessidade → história → requisito → código → teste → defeito → correção*
   se liga só por ID, sem prosa.
6. **Nunca traduza no meio da cadeia.** Se o chamado é `ticket` no esquema, é
   `ticket` na rota, no serviço, no teste e no evento de log.
7. **Termo fora deste arquivo não entra em identificador.** Nome novo → entrada
   aqui primeiro, com sua lista de proibições.

---

## 2. Os substantivos centrais

`ticket` é a palavra canônica do conceito de chamado.

| Conceito | Termo canônico | Definição (por linha, conforme a QTS) | Não use |
|---|---|---|---|
| Chamado | **`ticket`** | Solicitação de suporte registrada por um solicitante, movida por um técnico numa sequência de status controlada, com histórico. | *chamado (em código), registro, issue, ocorrência, demanda, pedido* |
| Conta de usuário | **`user`** | Identidade com um perfil, um e-mail e um hash de senha; pode ser bloqueada. | *conta (em código), cliente* |
| Perfil | **`role`** | Um entre `requester`, `technician`, `admin` — decide quais regras se aplicam. | *perfil (em código), grupo, nível, tipo de usuário* |
| Solicitante | **`requester`** (`requester_id`) | Quem abriu o chamado. É o "usuário comum / solicitante" da QTS. | *cliente, dono do ticket, autor, criador, reclamante* |
| Técnico | **`technician`** | Quem consulta a fila autorizada, prioriza, comenta e altera o status. | *atendente, suporte, opener* |
| Administrador | **`admin`** | Quem administra permissões e categorias e executa ações administrativas registradas no histórico. | *superusuário, root, gestor do sistema* |
| Categoria | **`category`** (`category_id`) | Classificação do chamado; administrada pelo `admin`. **Novo em relação à apostila** — ver §6. | *tipo, grupo, etiqueta, tag* |
| Status do chamado | **`status`** | `open`, `analysis`, `in_progress`, `resolved`, `closed`. Rótulos em §3b. | *situação, estado, fase, etapa* |
| Prioridade do chamado | **`priority`** | `low`, `medium`, `high`, `critical`. Rótulos em §3b. | *urgência (isso é prioridade de defeito), gravidade* |
| Comentário | **`comment`** | Texto do atendimento, por usuário autorizado, em um chamado. | *mensagem, nota, resposta, observação* |
| Entrada de histórico | **`history`** | Linha imutável: autor, data, ação, valor anterior, valor novo. | *log, auditoria* — **são coisas diferentes** |
| Entrada de auditoria | **`audit`** | Registro de uma ação privilegiada (permissões, categorias). | *log, histórico* |
| Entrada de log | **`log entry`** | Registro operacional estruturado: evento, horário, rota, status, `correlationId`. | *histórico, auditoria, relatório* |
| ID de correlação | **`correlationId`** | ID que liga uma falha visível ao usuário aos seus registros de log. | *requestId, traceId, id da requisição* |
| Tela | **`screen`** | Uma das cinco superfícies: Login, Lista, Novo chamado, Detalhe, Dashboard. | *página, view, rota (rota não é tela), tela do banco* |
| Colaborador | **`collaborator`** | Uma das cinco pessoas que constroem o projeto. | *aluno, membro, dev, participante, autor* |
| Atribuição do colaborador | **`colaborador responsável por <Tela>`** *(só em prosa — nunca em identificador)* | A pessoa responsável por uma tela, do início ao fim. Nunca abreviado para "owner". | *owner, responsável pelo módulo, Maintainer* |
| Evidência | **`evidence`** | Artefato versionado que prova uma afirmação: captura, log, relatório. | *print, anexo, foto* |
| Quality gate | **`quality gate`** | Critérios objetivos acordados *antes* do resultado, que autorizam avançar ou liberar. | *checkpoint, milestone* |
| Defeito | **`defect`** | Divergência em relação a uma referência aprovada, reproduzível. | *bug, erro, falha (falha é o sintoma), problema* |
| Falha | **`failure`** | Comportamento observado diferente do esperado. | *erro, exceção, crash, defeito* |
| Severidade do defeito | **`severity`** | Impacto técnico/do usuário: `critical`, `high`, `medium`, `low`. | *prioridade* |
| Prioridade do defeito | **`defect.priority`** | Urgência de tratamento neste ciclo. | *severidade* |
| Requisito | **`requirement`** | Afirmação verificável, `RF01`–`RF15` ou `RNF01`–`RNF08`. | *história, especificação, tarefa, regra* |
| História de usuário | **`story`** | *Como [papel], quero [capacidade], para [benefício]* — `US-01`–. | *requisito, história (em código), tarefa* |
| Caso de teste | **`test case`** | Verificação reproduzível com id `CT-001`–, um requisito, um motivo principal de falha. | *teste (isolado), cenário, caso, suíte* |
| Risco | **`risk`** | `probabilidade (1–5) × impacto (1–5)`, guia a profundidade dos testes. | *probabilidade, severidade* |
| Ciclo | **`cycle`** | Um lote de trabalho: implementar → verificar → revisar → commitar. | *iteração* |
| Fatia | **`slice`** | A menor unidade coerente de mudança dentro de um lote. | *tarefa, story, PR* |

### Palavras *de carga* que nunca devem ser usadas de forma solta

- **`owner`** — apenas `ticket.owner_id`. **Atenção:** a QTS **não** menciona
  responsável técnico pelo chamado; ver §6. Nunca "o owner da tela Lista".
- **`priority`** — sempre `ticket.priority` ou `defect.priority`.
- **`history`** — o registro-oficial do chamado. Uma entrada de log não é
  histórico.
- **`fila` / `queue`** — ver §6, indefinido na QTS.
- **`critical`** — valor de `ticket.priority` **e** de `severity`. Diga qual.
- **`categoria`** — substantivo novo introduzido pela QTS. Em código,
  `category`.

Identificadores ficam **sem qualificação** (`priority`, `owner`) porque o nome da
tabela ou do tipo já dá o contexto — exatamente como a apostila escreve
`tickets.priority`. A forma qualificada da regra 4 (`ticket.priority`,
`defect.priority`) é para **prosa**, onde os dois sentidos podem aparecer na
mesma frase.

---

## 3. Apelidos declarados (as únicas exceções legais)

### 3a. `ticket` → **"chamado"** (exibição e prosa)

| Superfície | Grafia |
|---|---|
| Tabelas, colunas, enums, rotas, eventos de log, nomes de teste, arquivos | `ticket`, `tickets`, `requester_id`, `category_id`, … |
| Strings visíveis ao usuário | **Chamado**, **Novo chamado**, **Lista de chamados**, **Detalhe do chamado** |
| Prosa em documentos | `ticket` ou *chamado* |

**Proibido:** misturar as duas dentro de uma mesma cadeia.

### 3b. Status, prioridade e perfil: enum, rótulo

| Campo | Valor no código, banco e API | Rótulo exibido (pt-BR) |
|---|---|---|
| `status` | `open` | Aberto |
| `status` | `analysis` | Em análise |
| `status` | `in_progress` | Em atendimento |
| `status` | `resolved` | Resolvido |
| `status` | `closed` | Fechado |
| `priority` | `low` | Baixa |
| `priority` | `medium` | Média |
| `priority` | `high` | Alta |
| `priority` | `critical` | Crítica |
| `role` | `requester` | Usuário comum / solicitante |
| `role` | `technician` | Técnico |
| `role` | `admin` | Administrador |

A QTS escreve apenas a coluna de rótulos ("Aberto → Em análise → Em
atendimento → Resolvido → Fechado"; "baixa, média, alta ou crítica"). A
coluna de enum vem da apostila. O mapeamento é 1:1 e esta tabela é a única
autorizada.

### 3c. As cinco telas

| ID da tela | Nome canônico | Rótulo exibido |
|---|---|---|
| `login` | **Login** | Entrar no sistema |
| `list` | **Lista** | Lista de chamados |
| `new-ticket` | **Novo chamado** | Novo chamado |
| `detail` | **Detalhe** | Detalhe do chamado |
| `dashboard` | **Dashboard** | Dashboard / Relatórios |

> A QTS usa "Tela de Detalhes do Chamado" no item 4 e "Detalhe do chamado" na
> lista introdutória. **Adotamos "Detalhe"** como nome curto canônico e
> "Detalhe do chamado" como rótulo exibido.

**Qual forma vai onde:** o **ID** (`login`, `new-ticket`) em nomes de arquivo,
rotas e nomes de teste — sempre ASCII. O **nome** (*Login*, *Novo chamado*) em
prosa, títulos e rótulos visíveis. Nunca `detalhe.html` quando o ID é `detail`.

**Como endereçar:** **"colaborador responsável por <Tela>"** — por exemplo
*"o colaborador responsável por Dashboard confirmou o estado vazio"*. Nunca
*"o owner do dashboard"*.

---

## 4. Palavras banidas

`registro` · `issue` · `ocorrência` · `demanda` · `pedido` · `atendente` ·
`suporte` · `cliente` · `criador` · `autor do chamado` · `mensagem` (para
comentário) · `nota` · `situação` (para status) · `gravidade` (para
severidade) · `erro` (para defeito) · `log` (para histórico) · `auditoria`
(para histórico) · `página` / `view` (para tela) · `aluno` / `membro` / `dev`
(para colaborador) · `owner` **e `dono`** (para pessoa) · `designer` (para
colaborador) · `tarefa` (para fatia).

A tradução não escapa da regra: proibir uma palavra em inglês é proibir a ideia em
qualquer idioma.

O verbo *responsável* e *possui* são permitidos ("responsável por uma tela");
a forma proibida é o **substantivo** `owner` aplicado a uma pessoa.

---

## 5. Convenções de identificadores

| Tipo | Padrão | Escopo neste projeto |
|---|---|---|
| História de usuário | `US-nn` | `US-01` … |
| Requisito funcional | `RFnn` | `RF01`–`RF15` (apostila, Passo 9–10) |
| Requisito não funcional | `RNFnn` | `RNF01`–`RNF08` (apostila, Passo 11) |
| Caso de teste | `CT-nnn` | `CT-001` … |
| Defeito | `BUG-nnn` | `BUG-001` … |
| Branch | `feat/US-04-novo-chamado`, `fix/BUG-007-status` | apostila, Passo 25 |
| Commit | `feat(ticket): valida título e descrição` | conventional commit + escopo |

### 5b. Nomes de arquivo de evidência

`AAAA-MM-DD_Tipo_ID_Descricao.ext`, da apostila (*Entregáveis e convenção de
arquivos*, Orientação **p. 10**). A apostila dá dois exemplos, `Teste` e
`Defeito`; a lista abaixo é **introduzida aqui** e é fechada:

`Teste` · `Defeito` · `Captura` · `Log` · `Execucao` · `Relatorio` ·
`Auditoria` · `Matriz`

---

## 6. Vocabulário ainda indefinido (decisões em aberto)

Palavras usadas pela QTS ou pela apostila e **não definidas** em lugar nenhum.
Enquanto não forem decididas, ficam em quarentena: não entram em identificador.

| Palavra | Onde aparece | Problema | Situação |
|---|---|---|---|
| **fila / queue** | QTS "Lista de chamados"; apostila RF06 e Passo 44 R4/R5 | O técnico "visualiza a fila para a qual possui autorização", mas não existe tabela nem coluna de fila em nenhum dos dois documentos | **aberto — bloqueia a tela Detalhe** |
| **responsável técnico (owner)** | apostila RF08 e Passo 19 | A apostila exige histórico quando o responsável muda; a QTS **não menciona responsável**, e sua lista de migrações é "usuários, chamados, comentários, histórico e categorias" — sem responsável e sem fila | **aberto — os dois documentos divergem** |
| **categoria** | QTS, migrações e perfil Administrador | Entidade nova que **não existe** na apostila. Ninguém é dono dela, e nenhuma tela da QTS lista "categoria" como campo | **aberto** |
| **exclusão de chamado** | apostila RF07 | A QTS **não menciona** exclusão; o perfil Administrador fala em permissões e categorias | **aberto — pode ter saído do escopo** |
| **endpoint de comentários** | QTS, tela Detalhe ("adicionar comentários") e migrações | A QTS só nomeia `/api/reports/summary`. Não há rota de comentário especificada em nenhum dos dois documentos | **aberto — bloqueia a tela Detalhe** |
| **rota de login** | a QTS não nomeia nenhuma · apostila: `POST /api/sessions` · plano em `thoughts/` e comentário TODO no mock: `POST /api/auth/login` | Duas rotas candidatas, nenhuma travada | **aberto — travar uma** |
| **paginação e ordenação** | QTS "navegar pelos resultados"; apostila Passo 48 | Nunca especificados: nem tamanho de página, nem ordem padrão, nem desempate | **aberto — bloqueia a tela Lista** |
| **formato do `correlationId`** | apostila Passo 20/33 (`req_7f31…`) vs. Passo 27 (`crypto.randomUUID()`) | Dois formatos | **aberto** |

---

## 7. Regras de escrita que mantêm o vocabulário honesto

- **Nomeie o teste pelo comportamento**, não pelo mecanismo. Exemplo da
  apostila (Passo 35): `permite resolved -> closed com comentário`.
- **O título do documento nomeia o artefato**, não a atividade.
- **Prosa pode traduzir; identificador não.** N substantivo novo entra no
  código sem entrada aqui antes.

---

## Relacionados

- [[project/team-and-screens]] — quem responde por quê e a convenção de
  endereçamento
- [[reference/spec-map]] — a QTS e a apostila indexadas, e as lacunas por trás
  de §6
- [[reference/known-issues]] — situação de cada decisão em aberto
- [[decisions/decision-log]] — onde as decisões são travadas