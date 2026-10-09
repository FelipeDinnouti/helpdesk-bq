---
title: Papéis, modelo de aprovação e gates de verificação
updated: 2026-10-09
type: workflow
tags: [fluxo, agentes, gates]
---

# Papéis, modelo de aprovação e gates de verificação

Cópia legível. Fontes operacionais: `.opencode/agents/`.

## As três personas

| Persona | Modo | Responsável por | Nunca faz |
|---|---|---|---|
| `project-manager` | principal | Escopo, memória + `docs/`, coordenação, verificação, commits (autoridade permanente) | Commitar um lote não revisado |
| `ui-designer` | colaborador de primeira classe | Auditar telas, propor com evidência, implementar cortes visuais aprovados | Mudar contratos de API/dados, commitar, escrever memória |
| `code-reviewer` | somente leitura | Gate pré-commit: escopo, fiação, alinhamento visual, a11y, higiene | Editar, commitar, redesenhar |

## Modelo de aprovação

- O **usuário desempata gosto**; o PM aprova o que está dentro do plano. "Looks
  good / continue" dentro de um plano acordado é aprovação para seguir.
- O **`code-reviewer` é o gate técnico**: `PASS` / `CHANGES REQUIRED`, antes de
  todo commit.
- **PASS visual é obrigatório em lotes de interface.** Este é *nosso* padrão,
  não o da rubrica: a nota não tem linha de aparência (ver §6 da
  [[reference/spec-map]]), mas uma tela com cara de inacabada lê como inacabada
  na demonstração. Inspeção da tela renderizada ou veredito do usuário na rota
  exata, registrado no ledger do ciclo.
- **Autoridade de commit permanente.** Commitar quando o lote estiver verde e
  revisado, com mensagem convencional. Isso estreita *se é preciso perguntar*,
  nunca *o que libera*: PASS do revisor + verificações + PASS visual (em
  interface) continuam obrigatórios. O lote é a unidade: implementar →
  verificar → revisar → commitar.

## Início de sessão

1. `memory/STATE.md` 2. `memory/TASK-01.md` 3. `docs/README.md` + o arquivo relevante.

## Classificação

Manutenção / refinamento visual / mudança estrutural / mudança de
comportamento ou contrato. Ver [[workflow/micro-change-lane]].

## Verificação (por lote)

- `git diff --check`
- A aplicação sobe + smoke das rotas tocadas
- Verificações focadas da fatia; suíte completa quando existir
- Verificação visual em lotes de interface (captura ou veredito do usuário —
  smoke ≠ visual)
- Veredito do revisor

## Orçamentos (apertados para 9 de outubro)

- **No máximo duas rodadas de revisão por lote.** Se a rodada 2 repete a
  espécie da rodada 1 → mudar o processo, não pedir uma terceira.
- **Achado DOC nunca bloqueia sozinho** (a não ser que seja load-bearing);
  agrupados, limpos numa passada.
- **Testes de correção passam por mutação:** inverter a correção → o teste
  tem que falhar.
- **Afirmar que a edição entrou:** edições roteirizadas relatam falhas;
  confirmar lendo as linhas mudadas.

## Severidade

**BLOCKER** (escopo/quebrado/segurança/falha de a11y/regressão não aprovada/
verificação ausente) · **NON-BLOCKING** (dívida) · **FOLLOW-UP** (depois) ·
**DOC** (prosa; agrupar).

## Escalonamento

Direções plausíveis múltiplas, mudança estrutural não aprovada, contradição de
contrato, endpoint/regra nova que não devo inventar, retorno que briga com uma
decisão travada, risco de verificação que muda o plano, revisão que repete
espécie, ou orçamento de 2 rodadas estourado → parar e perguntar.

## Relacionados

- [[workflow/micro-change-lane]]
- [[project/boundaries]]
- [[reference/specification]] — a QTS, fonte da verdade do produto
