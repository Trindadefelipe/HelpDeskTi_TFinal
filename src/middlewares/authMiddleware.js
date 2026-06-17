function requireLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.usuario || req.session.usuario.perfil !== 'admin') {
        return res.status(403).send('Acesso restrito ao administrador.');
    }
    next();
}

module.exports = { requireLogin, requireAdmin };
