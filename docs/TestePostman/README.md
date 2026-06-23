# Testes Manuais (Postman) — Helpdesk de TI

Esta pasta guarda as evidências de **testes manuais** de cada CRUD do sistema.
Cada integrante tem a sua subpasta com o roteiro e os prints dos testes que executou.

## Organização

```
docs/TestePostman/
├── CRUD_Chamados_Felipe/        # Felipe
├── CRUD_Departamentos_Higor/    # Higor
├── CRUD_Tecnicos_Fernando/      # Fernando
└── CRUD_Categorias_Nicolas/     # Nicolas
```

Em cada pasta:
- `roteiro.md` — passo a passo dos testes (método, URL, body e resultado esperado);
- prints (`.png`) dos testes rodando no Postman como evidência.

## Antes de testar

1. Suba o servidor: `npm run dev`
2. Base URL: `http://localhost:3000`
3. **Faça login primeiro** (todas as rotas internas são protegidas). O Postman guarda o
   cookie de sessão automaticamente, então depois do login os próximos requests já vão autenticados.
   - Usuário admin de teste: `felipe@empresa.com` / `123456`
   - Como o backend usa formulários, envie os dados como **`x-www-form-urlencoded`** (não JSON).
