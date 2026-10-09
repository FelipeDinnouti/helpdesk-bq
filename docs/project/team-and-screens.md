---
title: Equipe e telas
type: projeto
updated: 2026-10-09
tags: [projeto, equipe, telas, atribuicao, delegacao]
---

# Equipe e telas

Como o trabalho é delegado e como os colaboradores são dirigidos em documentos,
commits e revisões.

---

## 1. A convenção de endereçamento (leia primeiro)

**Nunca endereçamos um colaborador pelo nome.** São cinco; cada um é responsável
por uma tela; a tela é a identidade.

> **"colaborador responsável por \<Tela\>"**
> *(the collaborator responsible for \<Tela\>)*

| Nome da tela (canônico) | Endereçamento |
|---|---|
| Login | colaborador responsável por **Login** |
| Lista | colaborador responsável por **Lista** |
| Novo chamado | colaborador responsável por **Novo chamado** |
| Detalhe | colaborador responsável por **Detalhe** |
| Dashboard | colaborador responsável por **Dashboard** |

Por que assim, e não o nome ou um cargo:

- Sobrevive a alguém faltar, trocar ou apresentar.
- Desambigua quando duas pessoas mexem no mesmo chamado.
- Mapeia 1:1 nos entregáveis que realmente importam: as cinco telas, seus
  estados, e as verificações de acessibilidade e responsividade.
- Impede que código e apresentação se concentrem numa pessoa só.

**Proibido:** "owner de X", "o do front", "o testador", "designer". Ver
[[reference/glossary]] §2 — `owner` é reservado para `ticket.owner_id`. O
verbo *responsável* é permitido; a forma proibida é o **substantivo** `owner`
aplicado a uma pessoa.

---

## 2. As cinco telas e o que cada um precisa entregar

As telas vêm da seção **"Telas e suas funções"** da QTS. Os cinco
colaboradores são um fato do nosso time; a QTS não diz "cinco".

Cada um é responsável por uma tela **de ponta a ponta**: marcação, todos os
estados, acessibilidade, layout em 360 px e os testes que as regras da tela
merecem. Nada é entregue pela metade.

### 2.1 colaborador responsável por **Login**

| Propriedade | Valor |
|---|---|
| ID da tela | `login` |
| Da QTS | "Tela de Login" · bloco de **Backend**: login com bloqueio |
| Elementos | e-mail · senha · ação de acesso · mensagens de erro ou bloqueio |
| Estado alternativo | **Erro e bloqueio** — três tentativas inválidas em 5 min bloqueiam a conta por 10 min |
| Estados a provar | inicial, enviando, credenciais inválidas, conta bloqueada, erro de rede |
| Acessibilidade | rótulos ligados aos campos, erro anunciado e junto ao campo, foco vai para a mensagem |
| Verificado por | caso de teste do bloqueio, um teste negativo de API, navegação só com teclado |
| Já existe | `public/login.html` + `css/login.css` + `js/login.js` (mock visual; falta ligar na API) |

### 2.2 colaborador responsável por **Lista**

| Propriedade | Valor |
|---|---|
| ID da tela | `list` |
| Da QTS | "Lista de chamados" |
| Elementos | visualizar chamados · filtro por status · filtro por prioridade · combinar filtros · navegar pelos resultados · estado vazio |
| Estado alternativo | **Vazio e carregando** — o estado vazio explica a ausência e oferece ação útil |
| Regras | o solicitante vê seus próprios chamados; o técnico vê a fila autorizada |
| Estados a provar | carregando, com resultados, vazio, vazio com filtro aplicado, sem permissão, erro de rede |
| Acessibilidade | filtros rotulados, estado do filtro anunciado, semântica de tabela, 360 px sem rolagem horizontal |
| Verificado por | testes de filtro (isolado e combinado), teste de permissão negativa, evidência do estado vazio |
| **Bloqueado por** | **G1** (fila indefinida) e **G7** (paginação e ordenação) |

### 2.3 colaborador responsável por **Novo chamado**

| Propriedade | Valor |
|---|---|
| ID da tela | `new-ticket` |
| Da QTS | "Tela de Novo Chamado" |
| Elementos | título · descrição · prioridade |
| Estado alternativo | **Validação e perda de conexão** |
| Regras | título de 10 a 100 caracteres, descrição com pelo menos 30, prioridade baixa/média/alta/crítica |
| Estados a provar | inicial, inválido no cliente, rejeitado pelo servidor, criado, sem conexão, envio duplicado evitado |
| Acessibilidade | resumo de erros, foco no primeiro campo inválido, botão ocupado durante o envio |
| Verificado por | valores-limite 9/10/100/101 e 29/30, prioridade desconhecida rejeitada, 201 + linha persistida |
| **Bloqueado por** | **G5** (rota de login, se a sessão for criada antes do envio) |

### 2.4 colaborador responsável por **Detalhe**

| Propriedade | Valor |
|---|---|
| ID da tela | `detail` |
| Da QTS | "Tela de Detalhes do Chamado" |
| Elementos | dados do chamado · histórico · comentários · alterar status · alterar prioridade conforme permissão · ações permitidas ao perfil |
| Estado alternativo | **Sem permissão** — 403, sem vazar dados |
| Regras | `Aberto → Em análise → Em atendimento → Resolvido → Fechado`; retorno de Resolvido para Em atendimento; chamado crítico não fecha sem comentário de resolução; toda alteração grava autor, data, ação, valor anterior e novo valor |
| Estados a provar | completo, sem permissão (403), não encontrado (404), transição inválida (409), crítico sem comentário de resolução |
| Acessibilidade | status não comunicado só por cor, histórico como lista com datas, botões descrevem a ação |
| Verificado por | matriz de transições (positivas e negativas), asserção de histórico em cada transição, teste de permissão |
| **Bloqueado por** | **G1** (fila), **G2** (responsável), **G4** (endpoint de comentários), **G6** (exclusão), **G8** (reabertura) |

### 2.5 colaborador responsável por **Dashboard**

| Propriedade | Valor |
|---|---|
| ID da tela | `dashboard` |
| Da QTS | "Dashboard / Relatórios" |
| Elementos | quantidade por status · quantidade por prioridade · filtros · período de consulta |
| Estado alternativo | **Sem dados** — estado vazio |
| Regras | os totais respeitam os mesmos filtros da lista; o vazio é compreensível, não em branco |
| Estados a provar | totais, filtrado, vazio, carregando, erro |
| Acessibilidade | cada total rotulado com seu significado, nunca um número solto; filtros rotulados; funciona em 360 px |
| Verificado por | teste do relatório (totais batem com a lista), evidência do estado vazio, verificação visual |
| **Bloqueado por** | **G13** — a apostila (US-10) dá os totais à *gestora*, que não corresponde a nenhum dos três perfis da QTS |

---

## 3. Contratos entre telas (ninguém é dono sozinho)

| Contrato | Telas | Origem |
|---|---|---|
| Estrutura de tela, cabeçalho, navegação, espaçamento/tipografia/cores | as cinco | `specification.md` §3 + RNF02, RNF03 |
| Envelope de erro `{ error: { code, message, correlationId } }` | as cinco | RNF05, apostila Passo 20 |
| Padrão de estado carregando / vazio / erro | as cinco | `specification.md` §3.2, §3.3, §3.5 |
| Mapa enum → rótulo de status e prioridade | Lista, Detalhe, Dashboard | [[reference/glossary]] §3b |
| Eventos de log e `correlationId` | as cinco | RNF07 |
| Linha de base de 360 px | as cinco | RNF02 |

**Regra:** quem precisar de um padrão compartilhado novo na primeira tela
propõe; a direção visual é do `ui-designer`; o PM trava em `docs/` antes da
segunda tela reutilizar.

---

## 4. Checklist de delegação

Antes de passar uma tela para alguém:

1. A linha da QTS daquela tela (elementos + estado alternativo) e o bloco §2
   deste arquivo.
2. Os IDs de requisito que a tela precisa satisfazer.
3. Os contratos de §3, ou o link para eles.
4. A referência de linguagem visual, assim que for travada.
5. Critérios de aceite em forma testável.

Quem recebe devolve: marcação + estados, evidência de acessibilidade e de
360 px, testes focados e um passo a passo que a revisão consiga reexecutar.

---

## 5. Divisão que a QTS propõe

A QTS divide o trabalho em três frentes — **Backend** (`src/`, `middlewares/`,
`db/`), **Frontend** (`public/`) e **Testes** (`tests/`) — e diz que
*"cada integrante trabalhe em uma parte sem interferir nas demais"*. Também
pede branches próprias e integração por pull request.

Adotamos essa organização **por tela**, porque é o que torna a entrega
verificável: cada tela tem um responsável claro do início ao fim. As frentes da
QTS continuam válidas como referência de camada.

O plano em `thoughts/shared/plans/2026-10-09-react-express-front.md` propõe uma
divisão diferente (`backend/` + `frontend/`, com React), que conflita com a
especificação de stack da QTS. Ver [[reference/specification]] §8.1 — está em
decisão, não aplicado.

---

## Relacionados

- [[reference/glossary]] — IDs das telas, mapa enum → rótulo, palavras banidas
- [[reference/specification]] — a QTS, seção por seção
- [[project/charter]] · [[project/boundaries]] · [[workflow/roles-and-gates]]