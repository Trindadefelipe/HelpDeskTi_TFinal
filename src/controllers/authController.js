const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

function loginForm(req, res) {
    res.render('auth/login', { erro: null });
}

async function login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.buscarPorEmail(email);

    if (!usuario) {
        return res.status(401).render('auth/login', { erro: 'E-mail ou senha inválidos.' });
    }

    if (!usuario.ativo) {
        return res.status(403).render('auth/login', { erro: 'Usuário inativo. Contate o administrador.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
        return res.status(401).render('auth/login', { erro: 'E-mail ou senha inválidos.' });
    }

    req.session.usuario = {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    };

    const token = jwt.sign(
        { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
    res.cookie('token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });

    res.redirect('/');
}

function logout(req, res) {
    res.clearCookie('token');
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

module.exports = { loginForm, login, logout };
