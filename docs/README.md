---
title: Documentação do helpdesk-bq
type: indice
status: fonte-da-verdade
updated: 2026-10-09
tags: [indice, helpdesk-bq, documentacao]
---

# Documentação do helpdesk-bq

> **`docs/` é a fonte da verdade.** `memory/` guarda só estado atual, direção e
> o próximo passo. O que foi *decidido* mora aqui.
>
> **A fonte da verdade do produto é `Documentação QTS - HelpDesk.pdf`.** Se
> qualquer arquivo deste vault divergir da QTS, **a QTS vence**.

## Comece aqui

| Se você quer… | Leia |
|---|---|
| **Escrever código, nomear algo ou escrever um commit** | [[reference/glossary]] — o contrato de nomenclatura. Leia primeiro. |
| **Saber o que você tem a seu cargo e o que passar adiante** | [[project/team-and-screens]] — cinco telas, cinco colaboradores |
| **Saber o que o sistema faz** | [[reference/specification]] — a QTS reorganizada |
| **Saber o que a disciplina pede e como é nota** | [[reference/spec-map]] — a apostila e a rubrica |
| **Saber o que pode ser tocado** | [[project/boundaries]] |
| **Saber o que libera uma mudança** | [[workflow/roles-and-gates]] |
| **Ver o estado atual e o próximo passo** | `../memory/STATE.md` |
| **Entender uma decisão anterior** | [[decisions/decision-log]] |
| **Ver o que está pronto e o que não está** | [[cycles/README]] |

## Referência

- [[reference/glossary]] — **vocabulário canônico, palavras proibidas, enums,
  convenção de IDs e lacunas de palavra em aberto.** Vinculante para código,
  telas, testes e documentos.
- [[reference/specification]] — a QTS: o problema, a entrevista, as cinco telas,
  os três perfis, a stack, a estrutura de pastas, a divisão do trabalho, e as
  **divergências entre a documentação e o repositório**.
- [[reference/spec-map]] — índice da apostila da disciplina: RF01–RF15,
  RNF01–RNF08, contrato de API, modelo de dados, seed, os 67 passos e a
  **rubrica de avaliação**.
- [[reference/known-issues]] — lacunas em aberto, com dono e bloqueio
- [[reference/verification-pitfalls]] — como uma verificação verde ainda pode
  não significar que funciona

## Projeto

- [[project/charter]] — problema, missão, objetivos, não objetivos, restrições
- [[project/boundaries]] — escopo, segurança, áreas graváveis, nomenclatura
- [[project/team-and-screens]] — atribuição de telas, a convenção de
  endereçamento `colaborador responsável por <Tela>`, entregáveis por tela,
  contratos entre telas

## Fluxo de trabalho

- [[workflow/roles-and-gates]] — papéis, modelo de aprovação, gates de
  verificação, orçamento de 2 rodadas, gate visual
- [[workflow/micro-change-lane]] — a via leve + `/microfix`

## Decisões

- [[decisions/product-decisions]] — decisões de produto aprovadas (PD-01…PD-07)
  e a lista do que está em aberto
- [[decisions/decision-log]] — registro cronológico

## Ciclos

Ver [[cycles/README]] para o índice com a situação de cada ciclo.

## Convenções

- Todo arquivo tem front matter YAML com `title`, `type`, `updated` e `tags`.
- Um conceito, uma palavra. Se a palavra não está no glossário, ela ainda não
  entra em identificador.
- Os caminhos dos arquivos continuam em inglês porque são referenciados pelo
  ledger de ciclo e pelo histórico do git; **o conteúdo é pt-BR**.
- Registros de decisão são mantidos quando superados, marcados como superados
  com link — o raciocínio vale mais que a conclusão.
- Links relativos usam a forma `pasta/nota`.