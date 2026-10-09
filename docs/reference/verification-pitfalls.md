---
title: Armadilhas de verificação
type: referencia
updated: 2026-10-09
tags: [referencia, verificacao, testes, qualidade]
---

# Armadilhas de verificação

Lista herdada do tessilion. O tema: *uma verificação que passou só é evidência
de que aquilo que ela verificou passou.*

1. **Um teste que não consegue falhar é pior do que nenhum.** Testes de
   correção passam por mutação (inverter a correção → o teste tem que falhar).
   Afirme a propriedade em risco, não a impressão digital.
2. **Smoke ≠ visual.** Subir e dar 200 OK nunca prova que a tela está certa.
   Lotes de interface precisam de inspeção renderizada ou veredito do usuário na
   rota exata.
3. **Afirmações negativas com escopo.** "Não mostra X" precisa estar limitado
   ao componente ou rota em teste.
4. **Stub precisa saber produzir o caso.** Um stub que não consegue produzir o
   caso que falha deixa a coisa não verificada — e não verificada não é
   verificada.
5. **Teste excluído não é teste passando.** A configuração do Jest cobre `src/`
   + `tests/` por glob; nunca enumerar diretórios. Conferir a contagem de testes
   quando ela cai.
6. **Comentário não é implementação.** Um comentário descrevendo uma regra não é
   evidência de que a regra roda. Achado DOC é agrupado e não bloqueia sozinho.
7. **Afirmar que a edição entrou.** Edições roteirizadas relatam o que não
   casou; confirmar lendo as linhas mudadas.
8. **Figura sem fonte e data, ou apagada.** Nunca enviar um número inventado.

## Acrescentadas pela QTS

9. **Mock não é integração.** A tela de Login em `public/` tem um mock do fluxo
   autenticado que marca etapas sem chamar a API. Isso prova que o visual
   funciona, não que o login funciona. Os dois precisam ser verificados
   separadamente, e o segundo só depois de existir rota.
10. **Tela sem seed parece quebrada.** Lista, Detalhe e Dashboard abrem vazios
    sem dados de seed. Estado vazio é requisito (RF14), mas demonstração sem
    seed esconde se a tela funciona com conteúdo.
11. **Dois frontends no repositório.** `public/` e `frontend/` têm uma tela de
    Login cada. Verificar a rota errada dá veredito de tela errada.