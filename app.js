//importando dependencias
const express = require("express");
const app  = express();
const port = 3000;
const { pool } = require("../database/db");
//configuração dos servidor para poder utilizar o EJS como view engine
app.set('view engine', 'ejs');
//configuração opcional - informando ao express aonde ele deve procurar as views
app.set('views', './src/views');


app.get('/', (req,res) => {
    res.send("<h1>Servidor no ar!</h1>");
})

app.get('/teste', (req,res) => {
    const TITULO = 'HelpDesk de TI';
    res.render('index', {titulo: TITULO});
})

//inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});