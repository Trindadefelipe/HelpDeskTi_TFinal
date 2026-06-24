// importando dependências
const express = require("express");

const app = express();
const port = 3000;

// importando rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");

// configurando o EJS como view engine
app.set("view engine", "ejs");

// informando onde ficam as views
app.set("views", "./src/views");

// configurando o Express para receber dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rota inicial
app.get("/", (req, res) => {
    res.send(`
        <h1>Servidor no ar!</h1>
        <a href="/categorias">Acessar CRUD de Categorias</a>
    `);
});

// rota de categorias
app.use("/categorias", categoriaRoutes);

// rota de teste
app.get("/teste", (req, res) => {
    const TITULO = "HelpDesk de TI";
    res.render("index", { titulo: TITULO });
});

// inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse: http://localhost:${port}/categorias`);
});