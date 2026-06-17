const express = require("express");
const path = require("path");
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const pool = require("./database/db");
const departamentoRoutes = require('./src/routes/departamentoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const chamadoRoutes = require("./src/routes/chamadoRoutes");
const { requireLogin, requireAdmin } = require('./src/middlewares/authMiddleware');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/', authRoutes);
app.use("/chamados", chamadoRoutes);
app.use('/departamentos', requireLogin, requireAdmin, departamentoRoutes);

app.get("/", (req, res) => {
    res.redirect("/chamados");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
