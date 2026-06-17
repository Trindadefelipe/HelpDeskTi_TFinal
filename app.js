const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const pool = require("./database/db");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
    res.render("auth/login");
});

app.get("/", async (req, res) => {
    try {
        const chamados = [];
        const stats = { total: 0, abertos: 0, andamento: 0, resolvidos: 0 };
        res.render("dashboard", { chamados, stats });
    } catch (erro) {
        console.error(erro);
        res.status(500).send("Erro ao carregar o dashboard.");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
