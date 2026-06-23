# Roteiro de Testes — CRUD de Chamados (Felipe)

> Base URL: `http://localhost:3000`
> Enviar os campos como **`x-www-form-urlencoded`**.
> O Postman mantém o cookie de sessão sozinho — basta logar uma vez (Teste 2).
> Os IDs abaixo (status, categoria, usuário) seguem o `seed.sql`. Confirme no seu banco se precisar.

| # | Objetivo | Método | URL | Body (x-www-form-urlencoded) | Resultado esperado |
|---|----------|--------|-----|------------------------------|--------------------|
| 1 | Rota protegida bloqueia sem login | GET | `/chamados` | — | **302** redirecionando para `/login` |
| 2 | Login válido | POST | `/login` | `email=felipe@empresa.com`, `senha=123456` | **302** (admin vai para `/departamentos`); cookie de sessão criado |
| 3 | Login inválido | POST | `/login` | `email=felipe@empresa.com`, `senha=errada` | **401** e a página de login com a mensagem de erro |
| 4 | Listar chamados | GET | `/chamados` | — | **200** com a tabela de chamados |
| 5 | Abrir formulário de novo | GET | `/chamados/novo` | — | **200** com o formulário |
| 6 | Criar chamado | POST | `/chamados/novo` | `titulo=PC nao liga`, `descricao=Sem video`, `prioridade=Alta`, `id_status=1`, `id_categoria=1`, `id_usuario=1` | **302** para `/chamados`; cria o chamado e o **histórico de abertura** |
| 7 | Ver histórico (abertura) | GET | `/chamados/{id}/historico` | — | **200**; mostra o registro de abertura (status `Aberto`) |
| 8 | Abrir edição | GET | `/chamados/editar/{id}` | — | **200** com o formulário preenchido |
| 9 | Editar mudando o status | POST | `/chamados/editar/{id}` | `titulo=PC nao liga`, `descricao=Sem video`, `prioridade=Alta`, `id_status=2`, `id_categoria=1`, `id_usuario=1` | **302** para `/chamados`; gera novo registro no histórico (`Aberto > Em Atendimento`) |
| 10 | Ver histórico (mudança) | GET | `/chamados/{id}/historico` | — | **200**; mostra a mudança de status |
| 11 | Cancelar (soft delete) | POST | `/chamados/cancelar/{id}` | — | **302** para `/chamados`; status vira `Cancelado`, `data_fechamento` é preenchida e o histórico é mantido |
| 12 | Logout encerra a sessão | GET | `/logout` | — | **302** para `/login` |
| 13 | Confirma que saiu | GET | `/chamados` | — | **302** para `/login` (sem sessão de novo) |

## Observações
- `id_status`: 1 = Aberto, 2 = Em Atendimento, 3 = Resolvido, 4 = Cancelado (ordem do seed).
- `id_categoria` / `id_usuario`: use os IDs existentes no seu banco.
- Troque `{id}` pelo id do chamado criado no Teste 6.
- **Evidência:** salve os prints de cada teste nesta pasta (ex.: `06-criar-chamado.png`).
