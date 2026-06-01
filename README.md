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

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento web, aplicando os conceitos de arquitetura **MVC**, autenticação segura por sessão e banco de dados relacional com **PostgreSQL**.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **Node.js** | Runtime JavaScript no servidor |
| **Express.js** | Framework web para o backend |
| **EJS** | Template engine para renderização das views |
| **PostgreSQL** | Banco de dados relacional (via PgAdmin) |
| **Bootstrap 5** | Estilização e responsividade da interface |
| **express-session** | Gerenciamento de sessões e autenticação |

---

## ✅ Funcionalidades

### 🔐 Autenticação e Controle de Acesso
- Login e logout de usuários
- Controle de acesso por perfil (**Administrador**, **Técnico** e **Solicitante**)
- Proteção de rotas via middleware

### 📋 Gerenciamento de Chamados
- Abertura de chamados com título, descrição, prioridade e categoria
- Atribuição de chamados para técnicos responsáveis
- Alteração de status: `Aberto` → `Em Atendimento` → `Resolvido` / `Cancelado`
- Filtros por status, técnico, departamento e período
- Registro automático de histórico (**log de auditoria**)

### 🏢 CRUD Completo
- Chamados
- Técnicos
- Categorias
- Departamentos

---

## 👥 Perfis de Usuário

| Perfil | Permissões |
|---|---|
| 🛡️ **Administrador** | Acesso total ao sistema — gerencia usuários, chamados e configurações |
| 🔧 **Técnico** | Visualiza e atende os chamados atribuídos a ele |
| 📝 **Solicitante** | Abre novos chamados e acompanha o status dos seus atendimentos |

---

## 🗄️ Banco de Dados

O banco de dados é relacional, gerenciado via **PgAdmin / PostgreSQL**, com as seguintes entidades:

- `usuarios`
- `chamados`
- `tecnicos`
- `categorias`
- `departamentos`
- `status`
- `historico_chamados`

---

## 🧱 Arquitetura MVC

O projeto segue o padrão **Model-View-Controller**, garantindo separação clara de responsabilidades:

```
helpdesk/
├── src/
│   ├── controllers/          # Lógica de negócio e controle das requisições
│   │   ├── authController.js
│   │   ├── chamadoController.js
│   │   ├── tecnicoController.js
│   │   ├── categoriaController.js
│   │   └── departamentoController.js
│   │
│   ├── models/               # Comunicação com o banco de dados (PostgreSQL)
│   │   ├── Usuario.js
│   │   ├── Chamado.js
│   │   ├── Tecnico.js
│   │   ├── Categoria.js
│   │   └── Departamento.js
│   │
│   ├── views/                # Templates EJS renderizados ao usuário
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── chamados/
│   │   ├── tecnicos/
│   │   └── departamentos/
│   │
│   ├── routes/               # Definição das rotas da aplicação
│   │   ├── authRoutes.js
│   │   ├── chamadoRoutes.js
│   │   └── departamentoRoutes.js
│   │
│   └── middlewares/          # Proteção de rotas e validações
│       └── authMiddleware.js
│
├── public/                   # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│   └── js/
│
├── database/
│   └── schema.sql            # Script de criação das tabelas
│
├── app.js                    # Arquivo principal da aplicação
├── .env.example              # Exemplo de variáveis de ambiente
└── package.json
```

---

## ▶️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) / PgAdmin configurado

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/helpdesk.git

# 2. Acesse a pasta do projeto
cd helpdesk

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do PostgreSQL

# 5. Execute o script de criação das tabelas no PgAdmin
# Abra o arquivo database/schema.sql e execute no seu banco de dados

# 6. Inicie o servidor em modo de desenvolvimento
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

### Exemplo de `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=helpdesk
SESSION_SECRET=sua_chave_secreta
PORT=3000
```

---

## 🔐 Autenticação e Segurança

- Autenticação via formulário de login com validação no banco de dados
- Senhas armazenadas com hash utilizando **bcrypt**
- Sessões gerenciadas com **express-session**
- Middleware de autenticação protegendo todas as rotas privadas
- Redirecionamento automático para login caso o usuário não esteja autenticado

---

## 📅 Roadmap

- [x] Setup inicial do projeto
- [x] Configuração do backend e banco de dados (PostgreSQL)
- [ ] Desenvolvimento dos CRUDs principais
- [ ] Sistema de autenticação e controle de perfis
- [ ] Histórico e log de auditoria
- [ ] Entrega final com sistema funcional

---

## ⚠️ Melhorias Futuras

- 💬 Sistema de comentários em chamados
- ⏱️ SLA por nível de prioridade
- 🔒 Permissões mais granulares por perfil
- 📊 Dashboard com gráficos e métricas
- 📧 Notificações por e-mail

---

## 🤖 Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como **ferramenta de apoio** no desenvolvimento do projeto, auxiliando na geração de trechos de código, revisão de lógica e elaboração da documentação. O uso da IA não substituiu o entendimento técnico dos integrantes — todas as decisões de arquitetura, implementação e validação foram realizadas pela equipe.

---

## 👨‍💻 Integrantes

| Nome | GitHub |
|---|---|
| Felipe Trindade | [@Trindadefelipe](https://github.com/Trindadefelipe) |
| Higor Bueno | [@HigorHBO](https://github.com/HigorHBO) |
| Fernando Vinicius | [@FerVini](https://github.com/FerVini) |
| Nicolas Toshio | [@NiToshi1](https://github.com/NiToshi1) |

> 📚 Projeto acadêmico orientado pelo **Professor Alex**.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

