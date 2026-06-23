const Chamado = require("../models/Chamado");

const chamadoController = {
    async listar(req, res) {
        try {
            const chamados = await Chamado.listarTodos();
            res.render("chamados/index", { chamados });
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao carregar os chamados.");
        }
    },

    async formNovo(req, res) {
        try {
            const opcoes = await Chamado.carregarOpcoes();
            res.render("chamados/novo", { opcoes });
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao abrir o formulario.");
        }
    },

    async criar(req, res) {
        try {
            await Chamado.criar(req.body);
            res.redirect("/chamados");
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao salvar o chamado.");
        }
    },

    async formEditar(req, res) {
        try {
            const chamado = await Chamado.buscarPorId(req.params.id);
            if (!chamado) {
                return res.status(404).send("Chamado nao encontrado.");
            }
            const opcoes = await Chamado.carregarOpcoes();
            res.render("chamados/editar", { chamado, opcoes });
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao abrir a edicao.");
        }
    },

    async atualizar(req, res) {
        try {
            await Chamado.atualizar(req.params.id, req.body);
            res.redirect("/chamados");
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao atualizar o chamado.");
        }
    },

    async cancelar(req, res) {
        try {
            await Chamado.cancelar(req.params.id);
            res.redirect("/chamados");
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao cancelar o chamado.");
        }
    },

    async historico(req, res) {
        try {
            const chamado = await Chamado.buscarPorId(req.params.id);
            if (!chamado) {
                return res.status(404).send("Chamado nao encontrado.");
            }
            const historico = await Chamado.listarHistorico(req.params.id);
            res.render("chamados/historico", { chamado, historico });
        } catch (erro) {
            console.error(erro);
            res.status(500).send("Erro ao carregar o historico.");
        }
    }
};

module.exports = chamadoController;
