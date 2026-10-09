---
title: Apostila da disciplina — índice de consulta
type: referencia
updated: 2026-10-09
tags: [referencia, apostila, disciplina, requisitos, rubrica]
---

# Apostila da disciplina — índice de consulta

`Apostila_Operacao_Software_Confiavel.pdf` (102 páginas, "Operação Software
Confiável — Do problema ao release", Prof. Paulo Elana Eloi dos Santos, ETEC
Bento Quirino). Lida em 2026-10-02. **O PDF está no `.gitignore`**, então este
arquivo é a única referência legível a partir de um clone.

> **O que este arquivo é:** um índice para *consulta rápida* da apostila.
> **O que define o produto é** [[reference/specification]], que vem da
> `Documentação QTS - HelpDesk.pdf`. Quando os dois divergirem, vale a QTS.

---

## 1. O veredito, em uma linha

A apostila é um **manual de metodologia de curso**, não uma especificação de
produto: cinco partes, 67 passos numerados, 12 folhas de evidência, uma rubrica.
O contrato de produto está espalhado por oito páginas.

**Tomamos o produto** (telas, RF01–RF15, RNF01–RNF08, contrato de API, modelo
de dados, seed) **e ignoramos o processo** (dois grupos, papéis rotativos,
cadência de encontros, gates com dupla assinatura, comitê de release). Os
motivos estão no registro de decisões.

---

## 2. Estrutura

| Parte | Páginas | Passos | Assunto |
|---|---|---|---|
| Orientação | 1–10 | — | Jornada, o desafio, divisão da turma, entregáveis |
| **01 Descoberta** | 11–25 | 1–14 | Termo de abertura, stakeholders, personas, jornada, histórias, backlog, **RF01–RF15**, **RNF01–RNF08**, ambiguidade |
| **02 Design e arquitetura** | 26–34 | 15–22 | **Protótipo = as cinco telas**, acessibilidade, arquitetura, modelo de dados, **contrato de API**, ameaças, testabilidade |
| **03 Construção** | 35–52 | 23–39 | Ambiente, estrutura do repositório, Git/revisão, banco, bootstrap Express, rotas, serviços, validação, interface, auth, logs, seed, testes, CI, code freeze |
| **04 Validação** | 53–71 | 40–57 | Plano de testes, risco, equivalência/limite, tabela de decisão, **transições**, exploratório, funcional, integração, E2E, segurança, WCAG, desempenho, responsividade, defeitos, rastreabilidade, regressão |
| **05 Qualidade e release** | 72–87 | 58–67 | ISO 25010, política, auditoria, métricas, dashboard, quality gate, auditoria cruzada, release, IA, portfólio, rubrica |
| **06 Caderno de evidências** | 88–102 | Folhas 1–12 | Formulários em branco, glossário, referências |

---

## 3. Requisitos que usamos

### 3.1 Funcionais — RF01 a RF15

| ID | Requisito | Tela |
|---|---|---|
| RF01 | Autenticar usuário ativo com credenciais válidas | Login |
| RF02 | Após 3 tentativas inválidas em 5 min, bloquear a conta por 10 min | Login |
| RF03 | Somente usuário autenticado pode criar chamado | Novo chamado |
| RF04 | Título de 10 a 100 caracteres; descrição, no mínimo 30 | Novo chamado |
| RF05 | Prioridade baixa, média, alta ou crítica | Novo chamado, Lista, Dashboard |
| RF06 | Solicitante vê seus chamados; técnico vê a fila autorizada | Lista, Detalhe |
| RF07 | Somente administrador pode excluir, com justificativa e auditoria | Detalhe — **ver G7** |
| RF08 | Toda mudança de status, prioridade ou responsável gera histórico | Detalhe — **ver G2** |
| RF09 | Filtrar chamados por status e prioridade, isolados ou combinados | Lista, Dashboard |
| RF10 | Permitir comentários em chamado autorizado | Detalhe — **ver G4** |
| RF11 | Transições: aberto → em análise → em atendimento → resolvido → fechado | Detalhe |
| RF12 | Chamado crítico não pode ser fechado sem comentário de resolução | Detalhe |
| RF13 | Relatório mostra quantidade por status e prioridade conforme filtros | Dashboard |
| RF14 | Estado vazio explica a ausência de dados e oferece ação útil | Lista, Dashboard |
| RF15 | A API responde erros com código, mensagem segura e identificador | todas |

> RF06, RF08 e RF10 estão **em conflito ou incompletos** frente à QTS. Ver
> [[reference/specification]] §7.

### 3.2 Não funcionais — RNF01 a RNF08

| ID | Critério | Como tratamos |
|---|---|---|
| RNF01 | 95% das respostas em até 800 ms com 20 usuários simulados | medir, não usar como gate |
| RNF02 | Interface utilizável a partir de 360 px sem rolagem horizontal | toda tela, verificado |
| RNF03 | Contraste, foco e rótulos conforme WCAG 2.2 AA | toda tela, verificado |
| RNF04 | Senhas com hash forte; segredos fora do repositório | `.env.example`, sem segredo real |
| RNF05 | Erros não expõem stack trace, SQL, token ou dado pessoal | envelope de erro |
| RNF06 | Cobertura de linhas ≥ 70% no núcleo; 100% das regras críticas | cobertura de regra, não de vaidade |
| RNF07 | Logs estruturados com evento, horário, rota, status e `correlationId` | middleware de log |
| RNF08 | CI executa lint e testes em todo pull request | arquivo de workflow |

---

## 4. Regras de design que valem

| Regra | Passo | Por quê |
|---|---|---|
| Uma ação primária por tela | 15 | Nada disputa o clique |
| Mensagens junto ao campo que descrevem | 15 | Erro que se precisa caçar não é lido |
| Ordem de foco coerente; não depender só de cor | 15 | Acessibilidade e compreensão |
| Layout testado em 360 px | 15, RNF02 | RNF02 é requisito |
| Interface → rotas/controllers → serviço → repositório → banco | 17, 24 | Controller fino, serviço testável |
| `app.js` não chama `listen`; `server.js` chama | 27 | Supertest precisa da app sem porta |
| Validar na fronteira, regra no serviço, código de erro estável | 28–30 | Uma fonte de verdade |
| Nomear testes pelo comportamento | 35 | Falha legível |

---

## 5. Índice de consulta — os 67 passos

Uma linha cada, para "o que a apostila diz sobre X?" ser busca, não releitura.

### Parte 01 — Descoberta (1–14)

| Passo | Diz |
|---|---|
| 1 | Termo de abertura: problema, objetivo, usuários, escopo, sucesso, riscos |
| 2 | Stakeholders e entrevistas; separar fato de hipótese |
| 3 | Personas com evidência — Lia (solicitante), Rafael (técnico), Márcia (gestora), Administrador |
| 4 | Enunciado do problema; exemplo fraco × forte |
| 5 | Jornada do usuário, atual e proposta, com pontos de dor |
| 6 | Story mapping; o MVP completa uma jornada, não acumula telas pela metade |
| 7 | Histórias de usuário; mínimo 12 |
| 8 | Backlog Must / Should / Could / Won't now |
| 9 | **RF01–RF08** |
| 10 | **RF09–RF15** |
| 11 | **RNF01–RNF08** |
| 12 | Ambiguidade é risco, não defeito: lista de perguntas em aberto |
| 13 | Critérios de aceite como exemplos Gherkin |
| 14 | Definition of Ready / Definition of Done |

### Parte 02 — Design e arquitetura (15–22)

| Passo | Diz |
|---|---|
| **15** | **Protótipo de baixa fidelidade: as cinco telas**, com elementos obrigatórios e um estado alternativo |
| 16 | Acessibilidade desde o design: perceptível, operável, compreensível, robusto |
| 17 | Arquitetura em camadas, e o que cada camada **não** deve fazer |
| 18 | Fluxo de componentes; onde validar, autorizar, logar e tratar falha |
| 19 | **Modelo de dados** — users, tickets, comments, ticket_history, login_attempts |
| **20** | **Contrato da API** + envelope de erro |
| 21 | Modelagem de ameaças leve |
| 22 | Desenhar para testabilidade: observar, controlar, isolar, reproduzir |

### Parte 03 — Construção (23–39)

| Passo | Diz |
|---|---|
| 23 | Ambiente e scripts npm; um estranho clona e roda em 10 minutos |
| 24 | Árvore do repositório; `app.js` sem `listen` |
| 25 | Branch, commit, pull request, revisão |
| 26 | Migração com `CHECK` e índice de filtro |
| 27 | Bootstrap Express: helmet, limite de JSON, `correlationId`, handler global |
| 28 | Rotas/controllers finos; nunca confiar em `requesterId` do body |
| 29 | Regras no serviço: tabela de transição e `assertTransition` |
| 30 | Validação e erros seguros (tabela de status e mensagem) |
| 31 | Interface web: HTML semântico, botão ocupado, erro de rede, foco movido |
| 32 | Autenticação e autorização; esconder botão não é autorização |
| 33 | Eventos de log estruturados; o que registrar e o que nunca registrar |
| 34 | Seed e ambientes — **os 12 chamados** |
| 35 | Testes unitários, nomeados por comportamento, AAA visível |
| 36 | Testes de API com Supertest; afirmar efeitos, não só status |
| 37 | CI: lint + testes + auditoria em todo PR |
| 38 | Dimensões de revisão: correção, segurança, design, teste, dados, operação |
| 39 | Sprint review e code freeze; tag `v1.0.0-rc1` |

### Parte 04 — Validação (40–57)

| Passo | Diz |
|---|---|
| 40 | Troca de papéis após o code freeze |
| 41 | Seções do plano de testes |
| 42 | Teste baseado em risco; pontuação = probabilidade × impacto |
| 43 | Partição de equivalência e valores-limite |
| 44 | Tabela de decisão de permissões (R1–R6) |
| 45 | **Teste de transição de estados** — matriz completa |
| 46 | Teste exploratório com charter |
| 47 | Execução funcional; saída mínima 15 funcionais, 5 negativos, 3 limite, 3 API, 2 segurança, 2 a11y, 1 desempenho |
| 48 | API, integração e persistência — conferir o efeito no banco |
| 49 | E2E nas quatro jornadas críticas |
| 50 | OWASP Top 10 / ASVS, dentro do escopo e com ética |
| 51 | Verificação WCAG 2.2: teclado, formulário, contraste, semântica, reflow, automação |
| 52 | Desempenho com ambiente registrado; p95, não média |
| 53 | Matriz de responsividade: 360×800, 768×1024, 1366×768, mais teclado e outros navegadores |
| 54 | Campos do relatório de defeito |
| 55 | Severidade × prioridade, e perguntas de triagem |
| 56 | Cadeia de rastreabilidade: necessidade → história → requisito → código → teste → defeito → correção |
| 57 | Confirmação e regressão |

### Parte 05 — Qualidade e release (58–67)

| Passo | Diz |
|---|---|
| 58 | ISO/IEC 25010:2023 — as nove características de qualidade |
| 59 | Política de qualidade de uma página |
| 60 | Auditoria técnica em sete áreas; C / NC / OM / NA |
| 61 | Métricas que respondem uma pergunta (cobertura não é qualidade) |
| 62 | Blocos do dashboard executivo |
| 63 | Critérios do quality gate, acordados antes do resultado |
| 64 | Auditoria cruzada entre os dois grupos |
| 65 | Evento surpresa — replanejar sem esconder nada |
| 66 | Comitê de liberação: 15 minutos, parecer defendido |
| 67 | IA como copiloto responsável; registrar quando a IA influenciou um artefato |

### Parte 06 — Caderno de evidências (folhas 1–12)

Formulários em branco: termo de abertura · persona e jornada · história e
critérios · requisito auditado · decisão de arquitetura · matriz de risco · caso
de teste · relatório de defeito · matriz de rastreabilidade · checklist de
auditoria · quality gate e parecer · retrospectiva. **Não usados como
artefatos**; os campos são um bom checklist para os documentos reais.

### Glossário da apostila (p. 101)

Defeito · Falha · Teste · QA · QC · Risco · Severidade · Prioridade ·
Regressão · Quality Gate · CI/CD · DevSecOps. A versão operacional, com sinônimos
proibidos, está em [[reference/glossary]].

---

## 6. Rubrica de avaliação (p. 84)

| Critério | Peso |
|---|---|
| Implementação | 20% |
| Técnicas de teste | 20% |
| Qualidade e decisão de release | 15% |
| Descoberta e requisitos | 10% |
| Design e arquitetura | 10% |
| Evidência e documentação | 10% |
| Colaboração profissional | 10% |
| Reflexão individual | 5% |

**Não existe linha de aparência.** Os pesos mais altos são implementação e
técnica de teste. Aparência decide como a demonstração ao vivo é lida, não a
nota — a leitura segura é que uma tela que parece acabada **e funciona** vence
uma tela mais bonita que não funciona.

Além da rubrica, há uma pergunta individual (p. 85): *um sistema sem defeitos
conhecidos pode ser considerado um sistema de qualidade?* — diferenciando teste,
QC, QA e engenharia da qualidade, com um exemplo de prevenção e um de detecção.

---

## Relacionados

- [[reference/specification]] — a QTS, que define o produto
- [[reference/glossary]] — vocabulário operacional
- [[reference/known-issues]] — lacunas em aberto
- [[decisions/decision-log]] — o que foi adotado e o que foi deixado de fora