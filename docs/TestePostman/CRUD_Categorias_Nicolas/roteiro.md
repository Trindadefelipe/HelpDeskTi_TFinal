# Roteiro de Testes — CRUD de Categorias (Nicolas)

> Base URL: `http://localhost:3000` · enviar campos como `x-www-form-urlencoded`.
> Logar antes (rota protegida). Admin de teste: `felipe@empresa.com` / `123456`.

> ⚠️ Template — preencher com os testes reais quando o CRUD de Categorias estiver pronto.

| # | Objetivo | Método | URL | Body | Resultado esperado |
|---|----------|--------|-----|------|--------------------|
| 1 | Bloqueio sem login | GET | `/categorias` | — | 302 para `/login` |
| 2 | Listar | GET | `/categorias` | — | 200 com a lista |
| 3 | Criar | POST | `/categorias/...` | preencher | 302 / criado |
| 4 | Editar | POST | `/categorias/...` | preencher | 302 / atualizado |
| 5 | Inativar/Excluir | POST | `/categorias/...` | — | 302 / inativado |

Salve os prints nesta pasta como evidência.
