---
title: Registro de decisões
type: registro-de-decisoes
updated: 2026-10-09
tags: [decisoes, cronologico]
---

# Registro de decisões

Uma linha por decisão material: data + decisão + por quê.

## 2026-10-09 — a QTS vira a fonte da verdade

- **A `Documentação QTS - HelpDesk.pdf` passa a definir o produto.** Por quê:
  ela é o documento do grupo, descreve o problema real do colégio e a entrevista
  que o originou, e é mais específico que a apostila. Índice em
  [[reference/specification]].
- **Toda a documentação deste vault foi reescrita em pt-BR e reindexada pela
  QTS.** Por quê: o documento que o professor lê está em português, e a
  especificação real é a QTS.
- **Stack travada conforme a QTS:** JavaScript/Node.js, Express, **front em
  HTML/CSS/JS servido de `public/`**, PostgreSQL com migrações em
  `db/migrations/`, **JWT** para sessão e **bcrypt** para senhas, Jest e
  Supertest. Por quê: a QTS especifica e justifica a linguagem única nas duas
  pontas.
- **Os caminhos dos arquivos `.md` continuam em inglês.** Por quê: são
  referenciados pelo ledger de ciclo (que é histórico e somente-adição), pelo
  `memory/` e pelo histórico do git. Renomear por estética custaria rastreio sem
  ganho na nota. **O conteúdo é que é pt-BR.**
- **`categoria` entrou no vocabulário** como entidade nova da QTS, com `role`
  `admin` responsável por ela. Por quê: aparece nas migrações e no perfil do
  administrador na QTS. Registrada como lacuna **G3/G6**: nenhuma tela da QTS
  lista categoria como campo, e ela não tem dono.
- **O conjunto de lacunas foi renumerado de G1–G11 para G1–G14** ao reindexar
  pela QTS, e o mapa antigo→novo ficou em `specification.md` §7. Por quê: a QTS
  **acrescentou** lacunas (categoria, rota de login, estrutura, leitor do
  Dashboard) e fundiu duas antigas. A regra 5 do glossário diz que IDs não são
  renumerados — este é o registro explícito da exceção, e o ledger de 2026-10-02
  foi deixado intacto como histórico.
- **`verification-pitfalls.md` traduzido para pt-BR.** Por quê: um arquivo em
  inglês num vault pt-BR é um arquivo que ninguém lê. Conteúdo inalterado, três
  armadilhas acrescentadas a partir da QTS.
- **Conflito `frontend/` React × `public/` vanilla registrado, não resolvido.**
  Por quê: a QTS é explícita sobre a stack, mas o PR #1 entregou as duas
  coisas e há um plano em `thoughts/` propondo a divisão `backend/` + `frontend/`.
  Decisão de arquitetura do grupo, não da documentação. Ver §8.1 da
  especificação.

## 2026-10-02 — vocabulário travado

- **`ticket` é o substantivo canônico** do conceito de chamado, em toda
  superfície de identificador. Por quê: regra do usuário; uma palavra por
  conceito é o que torna delegação e revisão possíveis.
- **Um alias de exibição declarado: `chamado`**, permitido só em strings
  visíveis ao usuário e em prosa, nunca em tabela, coluna, rota, enum, evento
  de log, nome de teste ou nome de arquivo. Por quê: o público e a linguagem de
  produto da QTS são brasileiros; o código continua em inglês. Reversível em uma
  linha se o grupo preferir `ticket` em todo lugar.
- **Colaboradores são dirigidos pela atribuição, nunca pelo nome:** "colaborador
  responsável por &lt;Tela&gt;". `owner` é reservado para `ticket.owner_id`.
  Por quê: sobrevive a falta e troca, é inequívoco em revisão, e força a
  divisão uma tela por pessoa.
- **Cinco telas, cinco colaboradores**, com a lista de telas da QTS.
  Especificação: §3 de [[reference/specification]].
- **RF01–RF15, RNF01–RNF08, contrato de API, modelo de dados e seed adotados
  como escritos** (da apostila). Por quê: são a parte mais bem escrita da
  apostila e adotá-los elimina uma classe inteira de decisões.
- **Processo da apostila descartado:** dois grupos, papéis rotativos, cadência
  de 16 encontros, gates com dupla assinatura, comitê de release, folhas de
  evidência. Mantido: autoria de commit visível, todo lote revisado por quem não
  escreveu, nenhum defeito escondido, demonstração reproduzível. Por quê: a
  turma não pretende seguir as regras da apostila e quer entregar bem no tempo
  disponível.
- **Diretórios `evidencias/` e `qualidade/` não são criados.** Por quê:
  evidência mora com `docs/` e métricas no ledger de ciclo; duas pastas
  adicionais de nível superior só diluiriam o dossiê.

## 2026-10-02 — montagem do fluxo

- Workflow de três personas replicado e adaptado do tessilion. Orçamento de
  revisão apertado de 3 → **2 rodadas por lote** para a entrega de 9 de outubro.
- Prioridade para o visual: PASS visual obrigatório em lotes de interface.
- Autoridade de commit permanente: mensagem convencional sempre que o lote
  estiver verde e revisado.
- PDF da assignment deliberadamente não lido até o usuário liberar. — **superado
  em 2026-10-02** e, depois, em 2026-10-09 pela QTS como fonte do produto.