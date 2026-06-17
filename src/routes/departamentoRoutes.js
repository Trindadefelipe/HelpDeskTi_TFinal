const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/', departamentoController.index);
router.get('/novo', departamentoController.novo);
router.post('/', departamentoController.criar);
router.get('/:id/editar', departamentoController.editar);
router.post('/:id', departamentoController.atualizar);
router.post('/:id/excluir', departamentoController.excluir);

module.exports = router;
