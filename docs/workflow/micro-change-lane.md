---
title: Via de mudança pequena e o comando /microfix
updated: 2026-10-02
type: workflow
tags: [fluxo, microfix]
---

# Via de mudança pequena

Cópia legível. Fonte operacional:
`.opencode/agents/project-manager.md`.

## Quando a via se aplica (todas precisam valer)

- Explícita, local, pequena, reversível; um componente ou um conjunto coeso.
- Visual, texto, espaçamento, alinhamento, a11y ou polimento de interação
  dentro de uma direção já aprovada.
- Sem endpoint, modelo de dados, permissão, rota, dependência, tema global,
  arquitetura ou comportamento de negócio novos.
- Sem mutação viva além do CRUD normal da assignment; sem decisão nova.
- Não muda o que o componente *é*. "Agora é um tipo de coisa diferente" =
  nunca é mudança pequena.

## Execução

1. Escopo em uma frase, confirmando risco baixo. 2. Menor mudança possível.
3. Verificações focadas (+ boot/smoke quando renderização ou rotas forem
   afetadas) + `git diff --check`. 4. Olhada em a11y/responsivo para
   interface. 5. Relatar arquivos + evidência + risco.

## O que ela não pula

- Não exige nova entrada no plano. Registrar em `docs/` quando mudar o estado
  de uma decisão, escopo, contrato ou verificação; em `memory/` quando mudar o
  estado ou o próximo passo.
- O gate completo do revisor continua obrigatório antes do commit quando
  comportamento, dados, contratos, a11y, estilos compartilhados, rotas ou
  várias superfícies forem tocados.
- Nunca burla uma regra de segurança.

## O comando `/microfix`

`.opencode/commands/microfix.md`, `/microfix <descrição>`. Seleciona esta
via, não acrescenta nada. Reiniciar o OpenCode depois de criar ou editar
comandos.
