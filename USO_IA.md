# Relatório de Uso de Inteligência Artificial — Helpdesk de TI

Este documento registra de forma transparente como a Inteligência Artificial foi utilizada
como **ferramenta de apoio** no desenvolvimento do **Sistema Helpdesk de TI**, aplicação web
fullstack em arquitetura MVC (Node.js, Express, EJS e PostgreSQL).

A IA foi usada como apoio técnico e documental — para explicar conceitos, revisar código,
interpretar erros, organizar a estrutura do projeto, gerar o padrão visual das telas a partir
dos protótipos e apoiar a documentação e os testes. **A lógica dos CRUDs (models, controllers
e rotas) é de autoria da equipe**, e todas as decisões de modelagem, regras de negócio e
validações finais foram tomadas pelos integrantes humanos.

---

## 1. Ferramentas de IA utilizadas

| Ferramenta | Modelo / Versão | Quem utilizou |
|---|---|---|
| **Claude** | Claude Opus 4.7 (Felipe, Higor) · Opus 4.5 (Fernando) | Felipe, Higor, Fernando |
| **ChatGPT** | GPT-5.5 Instant (versão gratuita) | Higor, Fernando, Nicolas |

---

## 2. Principais finalidades de uso

A IA foi empregada como apoio, sempre sob revisão humana antes de incorporar qualquer coisa ao projeto:

- **Explicação de conceitos:** arquitetura MVC, middlewares no Express, controle de sessão,
  hash de senha com bcrypt, JWT no login, integridade referencial (chaves estrangeiras) e
  versionamento com branches no Git.
- **Geração do padrão de layout (front-end):** a partir dos protótipos feitos no Figma, a IA
  montou o padrão visual base do sistema (sidebar, tela de login, dashboard, CSS e componentes
  como botões, badges, cards, tabelas e formulários) para ser **reaproveitado em todas as telas**
  pelos integrantes.
- **Revisão de código:** leitura crítica de trechos escritos pela equipe, sugestões de melhoria
  e identificação de possíveis problemas (ex.: exclusão física quebrando a chave estrangeira do
  histórico).
- **Explicação de erros:** interpretação de mensagens de erro do Node, do Express e do PostgreSQL
  durante o desenvolvimento.
- **Estrutura e organização do projeto:** orientação sobre a separação de pastas MVC (models,
  controllers, routes, views, middlewares) e onde cada responsabilidade deve ficar.
- **Testes manuais:** apoio na elaboração de um roteiro de testes manuais no **Postman** para
  validar as rotas do sistema (login, CRUD de chamados, histórico e proteção de rotas).
- **Apoio à documentação:** organização do README, deste `USO_IA.md` e da estruturação do escopo.

---

## 3. Exemplos de prompts utilizados

### Prompt 1 — Geração do padrão de layout a partir do Figma
> "A partir destes prints do nosso protótipo no Figma, monte um **padrão de layout reutilizável**
> para o sistema (sidebar + topo + tela de login + dashboard) usando EJS, Bootstrap 5 e CSS.
> Crie componentes de UI (botões, badges, cards, tabela e formulário) que eu possa **aplicar em
> todas as telas** do Helpdesk (chamados, técnicos, categorias e departamentos), mantendo o mesmo
> visual. Não precisa fazer a lógica — só o padrão visual que a equipe vai reutilizar."

**Resumo da resposta:** a IA gerou os arquivos de layout base (`partials/layout-start`,
`partials/sidebar`, `auth/login`, `dashboard`) e um `style.css` com o sistema de design (cores,
botões, badges, tabela e formulários). A equipe revisou e aplicou esse padrão nas telas de cada CRUD.

### Prompt 2 — Explicação de conceito / dúvida técnica
> "Me explique, com linguagem acadêmica simples, como funciona a proteção de rotas por middleware
> de autenticação no Express e por que as senhas devem ser guardadas com hash (bcrypt) e nunca em
> texto puro."

**Resumo da resposta:** a IA explicou o fluxo de sessão/login, o papel do middleware que bloqueia
acesso não autenticado e o motivo de usar hash. A equipe usou a explicação para entender e
implementar a parte de autenticação.

### Prompt 3 — Roteiro de testes manuais no Postman
> "Monte um roteiro de testes manuais no Postman para validar as rotas do Helpdesk: login,
> criação/edição/listagem de chamados, registro de histórico e bloqueio de rotas quando o usuário
> não está logado. Diga o método, a URL, o corpo e o resultado esperado de cada teste."

**Resumo da resposta:** a IA descreveu os casos de teste (método, endpoint, body e retorno
esperado). A equipe executou os testes e usou os resultados como evidência de funcionamento.

---

## 4. O que foi aceito, adaptado ou recusado

| Sugestão da IA | Decisão | Justificativa |
|---|---|---|
| Padrão de layout/design gerado a partir do Figma | **Aceito** | Atendeu ao protótipo e padronizou as telas; a equipe aplicou e ajustou em cada CRUD. |
| Estrutura de DER com 4 entidades principais + tabelas de apoio (Status, Histórico, Usuário) | **Aceito** | Enriqueceu o modelo e aproximou de um helpdesk real para utilizar como portifólio (Pensamento inicial da equipe). |
| Lista inicial de requisitos mais ampla que o escopo | **Adaptado** | A equipe revisou e ajustou os requisitos ao escopo fechado do projeto. |
| Incluir SLA e comentários no chamado já no escopo atual | **Recusado** | Mantido o núcleo de CRUDs com qualidade; SLA e comentários ficaram como melhorias futuras. |

---

## 5. Reflexão crítica

O uso da IA acelerou bastante as etapas de organização da documentação, padronização do layout e
esclarecimento de conceitos. Por outro lado, percebemos que a IA tende a sugerir mais do que o
necessário (funcionalidades fora do escopo), o que exigiu filtragem e discussão entre os integrantes
a cada incorporação.

Outro aprendizado foi o cuidado com a tentação de simplesmente colar respostas prontas. A equipe
definiu que a IA serviria para **explicar, revisar e padronizar**, enquanto a lógica dos CRUDs seria
escrita e compreendida pelos integrantes — justamente porque cada aluno precisa **defender o seu CRUD
na banca**. Também ficou claro que a qualidade do resultado depende muito do prompt: comandos vagos
geram respostas superficiais; comandos com contexto e restrições explícitas geram respostas úteis.

Por fim, a IA não substituiu a discussão entre os colegas nem a orientação do professor. As decisões
finais sobre escopo, modelagem e regras de negócio foram sempre da equipe.

---

## 6. Cuidados adotados para evitar cópia sem compreensão

- A lógica dos CRUDs foi escrita e revisada pela equipe; trechos recebidos da IA foram tratados como
  referência e reescritos/entendidos antes de entrar no projeto.
- Cada integrante é responsável por dominar e defender tecnicamente o seu próprio CRUD.
- Toda sugestão da IA passou por revisão humana antes de ser incorporada.
- Erros e dúvidas foram usados como oportunidade de aprendizado, não apenas como "resposta pronta".

---

*USO_IA.md — Sistema Helpdesk de TI · Equipe: Felipe Trindade, Higor Bueno, Fernando Vinicius e Nicolas Toshio*
