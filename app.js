const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const chamadoRoutes = require("./src/routes/chamadoRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
    res.render("auth/login");
});

app.use("/chamados", chamadoRoutes);

app.get("/", (req, res) => {
    res.redirect("/chamados");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
