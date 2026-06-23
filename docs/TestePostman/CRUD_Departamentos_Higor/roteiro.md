# Roteiro de Testes — CRUD de Departamentos (Higor)

> Base URL: `http://localhost:3000` · enviar campos como `x-www-form-urlencoded`.
> Logar antes (rota protegida + restrita a admin). Admin de teste: `felipe@empresa.com` / `123456`.

> ⚠️ Template — preencher com os testes reais conforme as suas rotas (`/departamentos`).

| # | Objetivo | Método | URL | Body | Resultado esperado |
|---|----------|--------|-----|------|--------------------|
| 1 | Bloqueio sem login | GET | `/departamentos` | — | 302 para `/login` |
| 2 | Login admin | POST | `/login` | `email=...`, `senha=...` | 302; sessão criada |
| 3 | Listar | GET | `/departamentos` | — | 200 com a lista |
| 4 | Criar | POST | `/departamentos/...` | preencher | 302 / criado |
| 5 | Editar | POST | `/departamentos/...` | preencher | 302 / atualizado |
| 6 | Excluir | POST | `/departamentos/...` | — | 302 / removido (ou bloqueio se houver vínculo) |

Salve os prints nesta pasta como evidência.
