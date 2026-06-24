const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/CategoriaController');

router.get('/', CategoriaController.listar);
router.get('/novo', CategoriaController.abrirCadastro);
router.post('/novo', CategoriaController.cadastrar);
router.get('/detalhes/:id', CategoriaController.detalhes);
router.get('/editar/:id', CategoriaController.abrirEdicao);
router.post('/editar/:id', CategoriaController.editar);
router.post('/excluir/:id', CategoriaController.excluir);

module.exports = router;