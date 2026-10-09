# 🧾 Plano de Testes

## 1. Login

| Tipo de teste | O que testa / Objetivo | Resultado esperado | O que acontece em caso de erro |
|---|---|---|---|
| Teste unitário | Validar o formato do e-mail informado, considerando o uso de `@` e um domínio válido. | O sistema aceita um e-mail válido e permite continuar o login. | Exibe uma mensagem informando que o e-mail está em formato inválido. |
| Teste unitário | Avaliar se o campo de e-mail foi preenchido. | O sistema permite continuar quando o campo está preenchido corretamente. | Exibe uma mensagem informando que o campo é obrigatório. |
| Teste de integração | Conferir se o e-mail informado está cadastrado no banco de dados. | O sistema localiza a conta correspondente. | Impede a autenticação e apresenta uma mensagem genérica de credenciais inválidas, evitando revelar se a conta existe. |
| Teste de segurança | Analisar a proteção do campo de e-mail contra ataques de SQL Injection. | O sistema trata o conteúdo informado como dado, sem executar comandos SQL indevidos. | Bloqueia a operação suspeita, registra o evento de forma segura e impede comandos não autorizados. |
| Teste unitário | Validar o preenchimento da senha e o cumprimento das regras definidas. | O sistema aceita uma senha que atenda aos requisitos. | Informa que a senha é obrigatória ou não atende aos requisitos. |
| Teste unitário | Avaliar o tamanho mínimo permitido para a senha. | O sistema aceita senhas que respeitem o limite mínimo definido. | Exibe uma mensagem informando que a senha é muito curta. |
| Teste unitário | Testar o botão de mostrar ou ocultar a senha. | O botão alterna a visibilidade da senha sem alterar seu conteúdo. | Corrige-se o evento do botão e o comportamento de exibição. |
| Teste de segurança | Examinar a forma como as senhas são armazenadas no banco de dados. | As senhas são armazenadas utilizando uma função segura de hash com salt, sem manter o texto original. | A falha é tratada como crítica e corrigida antes da disponibilização do sistema. |
| Teste unitário | Avaliar se o botão de login responde ao clique. | O sistema inicia a autenticação quando os campos estão válidos. | Ajusta-se o evento do botão ou sua implementação. |
| Teste unitário | Testar o bloqueio da tentativa de login quando os campos obrigatórios estão vazios. | Nenhuma requisição de autenticação é enviada enquanto os campos obrigatórios não forem preenchidos. | O sistema impede o envio e indica quais campos precisam ser preenchidos. |
| Teste de segurança | Analisar o comportamento do sistema diante de cliques repetidos durante uma requisição. | O botão é temporariamente desabilitado para evitar envios duplicados. | Corrige-se o controle das requisições e implementam-se proteções contra abusos. |
| Teste unitário | Avaliar o funcionamento do módulo de mensagens de resposta. | As mensagens correspondem corretamente ao resultado da operação. | A implementação é revisada para corrigir as respostas exibidas. |
| Teste de usabilidade | Analisar a clareza das mensagens de erro e de sucesso. | As mensagens são compreensíveis e orientam o usuário sobre como prosseguir. | Os textos são reformulados para melhorar a clareza e a acessibilidade. |
| Teste de integração | Testar a autenticação utilizando e-mail, senha e banco de dados. | O acesso é concedido quando as credenciais são válidas. | O acesso é negado e uma mensagem genérica de credenciais inválidas é apresentada. |
| Teste de usabilidade | Avaliar se o processo de login é intuitivo. | O usuário encontra os campos e consegue entrar no sistema sem dificuldades desnecessárias. | O layout, os botões e as instruções são ajustados. |
| Teste de segurança | Avaliar as proteções contra tentativas repetidas de adivinhar senhas (*brute force*). | O sistema aplica limites e restrições temporárias após o número de tentativas definido. | São implementados ou ajustados limites de requisições e mecanismos de monitoramento. |
| Teste de carga | Simular 10, 20, 30 e 40 usuários tentando realizar login simultaneamente. | O sistema permanece dentro dos limites estabelecidos de tempo de resposta e taxa de erros. | São investigados gargalos e otimizados a aplicação, o banco de dados ou a infraestrutura. |
| Teste de estresse | Aumentar o número de logins simultâneos até ultrapassar a capacidade esperada. | São identificados os limites do sistema e sua capacidade de recuperação após a redução da carga. | São corrigidos problemas de estabilidade e garantida a integridade dos dados. |

## 2. Lista de chamados

| Tipo de teste | O que testa / Objetivo | Resultado esperado | O que acontece em caso de erro |
|---|---|---|---|
| Teste unitário | Avaliar a padronização dos nomes de variáveis e identificadores em camelCase, caso essa convenção seja adotada no projeto. | Os identificadores seguem o padrão definido sem alterar os dados apresentados ao usuário. | Os identificadores ou os mecanismos de tratamento de texto são ajustados. |
| Teste unitário | Testar os filtros por prioridade, status e data de criação. | A lista apresenta somente os chamados que correspondem aos critérios selecionados. | A lógica dos filtros é corrigida e cada critério é testado novamente. |
| Teste unitário | Avaliar a aplicação simultânea de vários filtros. | As combinações permitidas retornam os chamados corretos. | A lógica de combinação é revisada e os resultados são corrigidos. |
| Teste unitário | Conferir se a alteração do status é refletida na interface. | O novo status é exibido corretamente. | A atualização é corrigida para evitar a permanência de informações antigas. |
| Teste unitário | Testar a ordenação dos chamados por prioridade. | Os chamados são organizados conforme a regra definida, como apresentar primeiro os de maior prioridade, caso esse seja o requisito. | A ordenação é corrigida e todos os níveis de prioridade são testados. |
| Teste de desempenho | Analisar o consumo de memória e o tempo de processamento com diferentes quantidades de chamados. | Os recursos utilizados permanecem dentro dos limites estabelecidos. | São investigados vazamentos de memória, consultas ineficientes e processamentos desnecessários. |
| Teste de integração | Avaliar a interação entre filtros e paginação. | Os filtros são aplicados corretamente antes da paginação, sem duplicar ou omitir registros. | São corrigidas as consultas, a aplicação dos filtros e a lógica de paginação. |
| Teste de carga | Simular vários usuários acessando e consultando a lista simultaneamente. | O sistema atende à carga prevista sem ultrapassar os limites de desempenho. | São analisadas as consultas e a utilização dos recursos do banco de dados. |
| Teste de estresse | Submeter a lista a uma carga superior à habitual. | Os limites são identificados e o sistema consegue se recuperar após a redução da carga. | São corrigidos os problemas de estabilidade e recuperação. |
| Teste de usabilidade | Avaliar se os usuários conseguem localizar chamados, aplicar filtros e compreender as informações exibidas. | A navegação é simples e as informações são fáceis de interpretar. | Os filtros, os rótulos e a interface são aprimorados. |
| Teste de aceitação | Conferir se a lista atende às necessidades dos usuários finais e apresenta as informações necessárias. | Os usuários conseguem localizar os chamados e consultar os dados relevantes. | Os requisitos são revisados e os ajustes necessários são realizados antes da aprovação. |

## 3. Novo chamado

| Tipo de teste | O que testa / Objetivo | Resultado esperado | O que acontece em caso de erro |
|---|---|---|---|
| Teste unitário | Validar o título do chamado diante de campos vazios, contendo apenas espaços ou com conteúdo inválido. | O sistema aceita somente títulos válidos. | Apresenta uma mensagem informando que o título é obrigatório ou inválido. |
| Teste unitário | Avaliar o tamanho mínimo do título, proposto em 8 caracteres. | O sistema aceita títulos com pelo menos 8 caracteres, caso esse limite seja confirmado nos requisitos. | Informa que o título é muito curto. |
| Teste unitário | Avaliar o tamanho máximo do título, proposto em 40 caracteres. | O título respeita o limite estabelecido. | Impede o excesso de caracteres ou informa o limite permitido. |
| Teste unitário | Validar se a descrição é obrigatória ou opcional, conforme os requisitos. | O campo segue a regra definida para o cadastro de chamados. | A validação é ajustada para corresponder ao requisito. |
| Teste unitário | Avaliar o limite máximo da descrição, proposto em 150 caracteres. | A descrição respeita o tamanho máximo definido. | O sistema impede o excesso de caracteres ou informa o limite permitido. |
| Teste unitário | Testar descrições compostas apenas por espaços. | O sistema rejeita descrições sem conteúdo válido quando o campo é obrigatório. Se for opcional, permite deixá-lo vazio. | Exibe uma mensagem adequada ou bloqueia o envio conforme a regra definida. |
| Teste unitário | Avaliar as regras de preenchimento do título e da descrição, incluindo conteúdos compostos apenas por caracteres especiais, caso sejam proibidos. | O sistema aceita conteúdos válidos e rejeita os que violem as regras estabelecidas. | Apresenta uma mensagem explicativa e impede o envio de informações inválidas. |
| Teste de integração | Conferir se a prioridade é atribuída automaticamente de acordo com o perfil do usuário, como uma prioridade maior para professores do que para estudantes, caso essa seja a regra de negócio. | A prioridade corresponde ao perfil e às regras configuradas. | A lógica de atribuição é corrigida e os diferentes perfis são testados novamente. |
| Teste de integração | Testar o armazenamento do título, da descrição, do autor, da data de criação, do status e da prioridade do chamado. | O registro é salvo corretamente e pode ser recuperado posteriormente. | A gravação é corrigida e são investigados registros incompletos ou duplicados. |
| Teste de usabilidade | Avaliar se os usuários compreendem os campos do formulário. | Os usuários conseguem preencher os campos e identificar quais são obrigatórios ou opcionais. | Os rótulos, as instruções e as mensagens de validação são aprimorados. |
| Teste de carga | Simular a criação de chamados por vários usuários simultaneamente. | O sistema processa as solicitações dentro dos limites estabelecidos, sem perder ou duplicar registros. | São investigados gargalos e realizadas otimizações no banco de dados. |
| Teste de estresse | Submeter o cadastro a um volume de solicitações superior ao habitual. | O sistema lida com a sobrecarga de maneira controlada e mantém a integridade dos dados. | São corrigidos os problemas de estabilidade e recuperação. |

## 4. Detalhes do chamado

| Tipo de teste | O que testa / Objetivo | Resultado esperado | O que acontece em caso de erro |
|---|---|---|---|
| Teste de integração | Recuperar os detalhes do chamado correto, incluindo título, descrição, autor, prioridade, status, data de criação e data de conclusão, quando aplicável. | As informações exibidas correspondem ao registro selecionado. | A consulta ao banco de dados ou a identificação do chamado é corrigida. |
| Teste unitário | Validar o campo de comentário quando estiver vazio ou contiver apenas espaços. | O comportamento respeita a regra definida para comentários obrigatórios ou opcionais. | O sistema apresenta uma mensagem de campo obrigatório ou inválido, conforme o requisito. |
| Teste unitário | Avaliar as regras de conteúdo dos comentários, incluindo casos compostos apenas por caracteres especiais, caso sejam proibidos. | Os comentários válidos são aceitos e os inválidos são rejeitados. | Uma mensagem explicativa é exibida e o envio é bloqueado quando necessário. |
| Teste de integração | Conferir se a alteração do status é registrada no banco de dados. | O novo status permanece salvo após uma nova consulta ao chamado. | A operação de atualização é corrigida e os dados exibidos são comparados aos armazenados. |
| Teste de integração | Testar a exclusão de um chamado. | O chamado correto é excluído ou marcado como excluído, conforme a regra definida, sem afetar outros registros. | A operação é corrigida e os registros relacionados são verificados. |
| Teste de segurança | Avaliar as permissões de visualização, comentário, edição e exclusão de acordo com o perfil do usuário. | Somente operações autorizadas são permitidas. | O acesso indevido é bloqueado, o evento é registrado de forma segura e as permissões são corrigidas. |

## 5. Dashboard

| Tipo de teste | O que testa / Objetivo | Resultado esperado | O que acontece em caso de erro |
|---|---|---|---|
| Teste de compatibilidade | Avaliar a apresentação do dashboard em diferentes navegadores, computadores, celulares e tamanhos de tela. | A interface é exibida corretamente nos ambientes compatíveis. | São corrigidos problemas de renderização, responsividade e compatibilidade. |
| Teste de usabilidade | Analisar se os usuários compreendem os dados, os indicadores e os gráficos apresentados. | As informações relevantes são identificadas e interpretadas com facilidade. | Os títulos, as legendas e a organização visual são aprimorados. |
| Teste unitário | Avaliar o comportamento dos filtros em relação a letras maiúsculas e minúsculas. | O sistema segue a regra definida; se a busca não diferenciar maiúsculas de minúsculas, termos equivalentes retornam resultados equivalentes. | A normalização dos textos ou a comparação utilizada nos filtros é corrigida. |
| Teste unitário | Testar os filtros por prioridade, status e data. | Os indicadores e os resultados consideram somente os registros correspondentes aos critérios selecionados. | A aplicação dos filtros e o recálculo dos indicadores são corrigidos. |
| Teste unitário | Avaliar a aplicação de vários filtros simultaneamente. | As combinações permitidas retornam resultados corretos, enquanto combinações incompatíveis são tratadas conforme os requisitos. | A lógica de combinação é ajustada e as restrições são documentadas, quando necessário. |
| Teste unitário | Conferir os resultados para um intervalo de datas específico, incluindo os limites inicial e final. | O sistema apresenta os registros pertencentes ao período selecionado, respeitando os horários e o fuso horário definidos. | Os limites do intervalo e o tratamento de datas são corrigidos. |
| Teste de integração | Conferir se os gráficos e indicadores do dashboard refletem os dados armazenados no banco de dados. | Os valores apresentados correspondem aos registros e aos cálculos esperados. | As consultas, os cálculos ou a atualização dos dados são corrigidos. |
| Teste de desempenho | Medir o tempo de carregamento e de atualização dos gráficos, indicadores e filtros. | O dashboard permanece dentro dos limites de resposta estabelecidos. | São investigadas consultas lentas, processamento excessivo e problemas de renderização. |
| Teste de carga | Simular vários usuários acessando o dashboard simultaneamente. | O sistema mantém o desempenho e a precisão das informações dentro dos limites definidos. | São identificados gargalos e otimizados as consultas, os processos e a infraestrutura. |
| Teste de estresse | Submeter o dashboard a uma carga superior à habitual. | O comportamento durante a sobrecarga é controlado e a recuperação ocorre após a redução da carga. | São corrigidos os problemas de estabilidade e recuperação. |
| Teste de aceitação | Avaliar se as informações do dashboard atendem às necessidades de acompanhamento dos chamados e da equipe de suporte. | Os usuários confirmam que os indicadores, gráficos e filtros atendem aos requisitos estabelecidos. | Os requisitos são revisados e os ajustes necessários são realizados antes da aprovação final. |

