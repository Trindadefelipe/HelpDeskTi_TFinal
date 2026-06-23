<div align="center">

# 🖥️ Help Desk — Sistema de Gerenciamento de Chamados

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> Aplicação web fullstack para gerenciamento de chamados técnicos, desenvolvida como projeto acadêmico com arquitetura MVC.

</div>

---

## 📌 Sobre o Projeto

O **Help Desk** é um sistema web desenvolvido para modernizar e estruturar o processo de suporte técnico dentro de uma organização. Ele substitui métodos informais como e-mails e planilhas por um fluxo rastreável, com controle de acesso por perfil, registro de histórico e gerenciamento completo de chamados.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento web, aplicando os conceitos de arquitetura **MVC**, autenticação por sessão e banco de dados relacional com **PostgreSQL**.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **Node.js** | Runtime JavaScript no servidor |
| **Express.js** | Framework web para o backend |
| **EJS** | Template engine para renderização das views |
| **PostgreSQL** | Banco de dados relacional (driver `pg`) |
| **Bootstrap 5** | Estilização e responsividade da interface |
| **express-session** | Gerenciamento de sessão e proteção de rotas |
| **bcrypt** | Hash das senhas dos usuários |
| **jsonwebtoken** | Geração de token JWT no login |

---

## ✅ Funcionalidades

### 🔐 Autenticação e Controle de Acesso
- Login e logout de usuários
- Controle de acesso por perfil (**Administrador** e **usuário comum**)
- Proteção de rotas via middleware (sessão)

### 📋 Gerenciamento de Chamados
- Abertura de chamados com título, descrição, **prioridade** e categoria
- Atribuição de chamados a técnicos responsáveis
- Alteração de status: `Aberto` → `Em Atendimento` → `Resolvido` / `Cancelado`
- **Registro automático de histórico** (log de auditoria) a cada abertura e mudança de status
- **Cancelamento** do chamado (preserva o histórico) e preenchimento automático da data de fechamento

### 🏢 Cadastros de Apoio
- Departamentos, Técnicos e Categorias (entidades relacionadas aos chamados)

---

## 📊 Estado dos Módulos

| Módulo | Responsável | Status |
|---|---|---|
| Autenticação (login, sessão, proteção de rotas) | Higor | ✅ Finalizado |
| CRUD de Chamados (+ histórico automático) | Felipe | ✅ Finalizado |
| CRUD de Departamentos | Higor | ✅ Finalizado |
| CRUD de Técnicos | Fernando | 🚧 Em desenvolvimento |
| CRUD de Categorias | Nicolas | 🚧 Em desenvolvimento |
| Dashboard com indicadores | Fernando | 🚧 Em desenvolvimento |

---

## 👥 Perfis de Usuário

| Perfil | Permissões |
|---|---|
| 🛡️ **Administrador** | Acesso total — gerencia chamados e os cadastros de apoio |
| 📝 **Usuário comum** | Abre chamados e acompanha o status dos seus atendimentos |

---

## 🗄️ Modelo de Dados e Relacionamentos

Banco relacional em **PostgreSQL**, com 7 tabelas e integridade por chave estrangeira.

**Tabelas e campos principais:**

- **usuarios** — `id_usuario` (PK), `nome`, `email` (único), `senha_hash`, `perfil`, `ativo`
- **departamentos** — `id_departamento` (PK), `nome`, `responsavel`, `localizacao`
- **tecnicos** — `id_tecnico` (PK), `nome`, `telefone`, `email`, `id_departamento` (FK → departamentos)
- **status** — `id_status` (PK), `descricao` (Aberto, Em Atendimento, Resolvido, Cancelado)
- **categorias** — `id_categoria` (PK), `nome`, `descricao`
- **chamados** — `id_chamado` (PK), `titulo`, `descricao`, `prioridade`, `data_abertura`, `data_fechamento`, `id_status` (FK), `id_categoria` (FK), `id_tecnico` (FK), `id_departamento` (FK), `id_usuario` (FK)
- **historico_chamados** — `id_historico` (PK), `id_chamado` (FK → chamados), `status_anterior`, `status_novo`, `id_tecnico` (FK), `data_hora`, `descricao`

**Relacionamentos (cardinalidade):**

| Relacionamento | Cardinalidade | Descrição |
|---|---|---|
| usuarios → chamados | 1 : N | um usuário (solicitante) abre vários chamados |
| departamentos → chamados | 1 : N | um departamento origina vários chamados |
| departamentos → tecnicos | 1 : N | um departamento tem vários técnicos |
| categorias → chamados | 1 : N | uma categoria classifica vários chamados |
| status → chamados | 1 : N | um status vale para vários chamados |
| tecnicos → chamados | 1 : N | um técnico atende vários chamados |
| chamados → historico_chamados | 1 : N | um chamado acumula várias movimentações no histórico |

> O script completo está em [`database/schema.sql`](database/schema.sql).

---

## 🧱 Arquitetura MVC

O projeto segue o padrão **Model-View-Controller**, com responsabilidades separadas:

```
HelpDeskTi_TFinal/
├── src/
│   ├── controllers/          # Regras de aplicação e controle das requisições
│   │   ├── authController.js
│   │   ├── chamadoController.js
│   │   └── departamentoController.js
│   ├── models/               # Acesso ao banco (PostgreSQL)
│   │   ├── Usuario.js
│   │   ├── Chamado.js
│   │   └── Departamento.js
│   ├── routes/               # Definição das rotas
│   │   ├── authRoutes.js
│   │   ├── chamadoRoutes.js
│   │   └── departamentoRoutes.js
│   ├── views/                # Templates EJS
│   │   ├── auth/ · chamados/ · departamentos/ · partials/
│   └── middlewares/          # Proteção de rotas
│       └── authMiddleware.js
├── database/
│   ├── db.js                 # Conexão (pool)
│   ├── schema.sql            # Criação das tabelas
│   ├── seed.sql              # Dados iniciais
│   └── setup.js              # Cria banco + schema + seed (npm run db:setup)
├── docs/
│   └── TestePostman/         # Roteiros e evidências dos testes manuais
├── public/css/               # Estilos
├── app.js                    # Arquivo principal
├── README.md
└── USO_IA.md
```

> Os módulos de Técnicos e Categorias serão adicionados (model + controller + rotas + views) conforme a tabela de status acima.

---

## 🔗 Rotas Principais

**Autenticação**
| Método | Rota | Descrição |
|---|---|---|
| GET | `/login` | Tela de login |
| POST | `/login` | Autentica e cria a sessão |
| GET | `/logout` | Encerra a sessão |

**Chamados** (rotas protegidas — exigem login)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/chamados` | Lista os chamados |
| GET | `/chamados/novo` | Formulário de novo chamado |
| POST | `/chamados/novo` | Cria o chamado (gera histórico de abertura) |
| GET | `/chamados/editar/:id` | Formulário de edição |
| POST | `/chamados/editar/:id` | Atualiza o chamado (gera histórico na mudança de status) |
| POST | `/chamados/cancelar/:id` | Cancela o chamado (soft delete) |
| GET | `/chamados/:id/historico` | Linha do tempo das movimentações |

**Departamentos** (protegidas — acesso de administrador): CRUD sob `/departamentos`.

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) rodando

### Passo a passo
```bash
# 1. Clone o repositório
git clone https://github.com/Trindadefelipe/HelpDeskTi_TFinal.git
cd HelpDeskTi_TFinal

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com as credenciais do seu PostgreSQL (e os secrets)

# 4. Crie o banco, as tabelas e os dados iniciais (de uma vez só)
npm run db:setup

# 5. Inicie o servidor
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

### 🔑 Login de teste (vem no seed)
| E-mail | Senha | Perfil |
|---|---|---|
| `felipe@empresa.com` | `123456` | Administrador |
| `maria@empresa.com` | `123456` | Comum |

### Exemplo de `.env`
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=helpdesk
SESSION_SECRET=sua_chave_secreta
JWT_SECRET=sua_chave_jwt
PORT=3000
```

---

## 📜 Scripts Disponíveis

| Script | Ação |
|---|---|
| `npm run dev` | Sobe o servidor com nodemon (recarrega ao salvar) |
| `npm run prod` | Sobe o servidor com node |
| `npm run db:setup` | Cria o banco, roda o `schema.sql` e o `seed.sql` |

---

## 🧪 Testes Manuais

Os roteiros de teste (Postman) e as evidências ficam em [`docs/TestePostman/`](docs/TestePostman/), organizados por CRUD/responsável. O roteiro do CRUD de Chamados está em [`docs/TestePostman/CRUD_Chamados_Felipe/roteiro.md`](docs/TestePostman/CRUD_Chamados_Felipe/roteiro.md).

---

## 🔐 Autenticação e Segurança

- Login com validação das credenciais no banco
- Senhas armazenadas com **hash (bcrypt)**, nunca em texto puro
- Sessão gerenciada com **express-session** + token **JWT** gerado no login
- Middleware de autenticação protegendo as rotas internas
- Redirecionamento automático para o login quando o usuário não está autenticado

---

## 🤖 Uso de Inteligência Artificial

A IA foi utilizada como **ferramenta de apoio** (explicação de conceitos, padrão de layout, revisão de código, documentação e testes). O detalhamento está em [`USO_IA.md`](USO_IA.md).

---

## 📅 Roadmap

- [x] Setup inicial do projeto + conexão com PostgreSQL
- [x] Autenticação, sessão e proteção de rotas
- [x] CRUD de Chamados + histórico automático
- [x] CRUD de Departamentos
- [ ] CRUD de Técnicos
- [ ] CRUD de Categorias
- [ ] Dashboard com indicadores
- [ ] Entrega final

---

## ⚠️ Melhorias Futuras

- 🔎 Filtros na listagem (status, técnico, departamento e período)
- 💬 Comentários nos chamados
- ⏱️ SLA por nível de prioridade
- 📊 Dashboard com gráficos e métricas
- 📧 Notificações por e-mail

---

## 👨‍💻 Integrantes

| Nome | CRUD principal | GitHub |
|---|---|---|
| Felipe Trindade | Chamados (+ histórico) | [@Trindadefelipe](https://github.com/Trindadefelipe) |
| Higor Bueno | Departamentos + Autenticação | [@HigorHBO](https://github.com/HigorHBO) |
| Fernando Vinicius | Técnicos | [@FerVini](https://github.com/FerVini) |
| Nicolas Toshio | Categorias | [@NiToshi1](https://github.com/NiToshi1) |

> 📚 Projeto acadêmico — Tópicos Especiais · Professor MSc. Alex Junior Nunes.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---
