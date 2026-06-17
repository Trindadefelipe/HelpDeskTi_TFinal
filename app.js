const express = require("express");
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const pool = require("./database/db");
const departamentoRoutes = require('./src/routes/departamentoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { requireLogin, requireAdmin } = require('./src/middlewares/authMiddleware');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req,res) => {
    res.send("<h1>Servidor no ar!</h1>");
})

app.get('/teste', (req,res) => {
    const TITULO = 'HelpDesk de TI';
    res.render('index', {titulo: TITULO});
})

app.use('/', authRoutes);
app.use('/departamentos', requireLogin, requireAdmin, departamentoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});