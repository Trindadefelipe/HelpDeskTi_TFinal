const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

function loginForm(req, res) {
    res.render('auth/login', { erro: null });
}

async function login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.buscarPorEmail(email);

    if (!usuario) {
        return res.render('auth/login', { erro: 'E-mail ou senha inválidos.' });
    }

    if (!usuario.ativo) {
        return res.render('auth/login', { erro: 'Usuário inativo. Contate o administrador.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
        return res.render('auth/login', { erro: 'E-mail ou senha inválidos.' });
    }

    req.session.usuario = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    };

    res.redirect('/departamentos');
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

module.exports = { loginForm, login, logout };
