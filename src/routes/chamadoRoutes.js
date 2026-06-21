const express = require("express");
const router = express.Router();
const chamadoController = require("../controllers/chamadoController");

router.get("/", chamadoController.listar);
router.get("/novo", chamadoController.formNovo);
router.post("/novo", chamadoController.criar);
router.get("/editar/:id", chamadoController.formEditar);
router.post("/editar/:id", chamadoController.atualizar);
router.post("/excluir/:id", chamadoController.excluir);
router.get("/:id/historico", chamadoController.historico);

module.exports = router;
