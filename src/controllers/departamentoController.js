const Departamento = require('../models/Departamento');

async function index(req, res) {
    const departamentos = await Departamento.listarTodos();
    res.render('departamentos/index', { departamentos });
}

function novo(req, res) {
    res.render('departamentos/novo', { erro: null });
}

async function criar(req, res) {
    const { nome, responsavel, localizacao } = req.body;
    if (!nome) {
        return res.redirect('/departamentos/novo');
    }
    const existente = await Departamento.buscarPorNome(nome);
    if (existente) {
        return res.render('departamentos/novo', { erro: 'Já existe um departamento com esse nome.' });
    }
    await Departamento.criar(nome, responsavel, localizacao);
    res.redirect('/departamentos');
}

async function editar(req, res) {
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Id de departamento inválido.');
    }
    const departamento = await Departamento.buscarPorId(req.params.id);
    if (!departamento) {
        return res.status(404).send('Departamento não encontrado.');
    }
    res.render('departamentos/editar', { departamento, erro: null });
}

async function atualizar(req, res) {
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Id de departamento inválido.');
    }
    const { nome, responsavel, localizacao } = req.body;
    if (!nome) {
        return res.redirect(`/departamentos/${req.params.id}/editar`);
    }
    const existente = await Departamento.buscarPorNome(nome, req.params.id);
    if (existente) {
        const departamento = await Departamento.buscarPorId(req.params.id);
        return res.render('departamentos/editar', { departamento, erro: 'Já existe um departamento com esse nome.' });
    }
    await Departamento.atualizar(req.params.id, nome, responsavel, localizacao);
    res.redirect('/departamentos');
}

async function excluir(req, res) {
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Id de departamento inválido.');
    }
    const vinculos = await Departamento.contarVinculos(req.params.id);
    if (vinculos.tecnicos > 0 || vinculos.chamados > 0) {
        return res.status(400).send('Não é possível excluir: existem técnicos ou chamados vinculados a este departamento.');
    }
    await Departamento.excluir(req.params.id);
    res.redirect('/departamentos');
}

module.exports = { index, novo, criar, editar, atualizar, excluir };
