const CategoriaModel = require('../models/CategoriaModel');

const CategoriaController = {
    async listar(req, res) {
        try {
            const categorias = await CategoriaModel.listarTodas();

            res.render('categorias/index', {
                categorias
            });
        } catch (erro) {
            console.error('Erro ao listar categorias:', erro);
            res.status(500).send('Erro ao listar categorias.');
        }
    },

    abrirCadastro(req, res) {
        res.render('categorias/form', {
            categoria: null,
            erro: null
        });
    },

    async cadastrar(req, res) {
        try {
            const { nome, descricao, prioridade } = req.body;

            if (!nome || nome.trim() === '') {
                return res.render('categorias/form', {
                    categoria: { nome, descricao, prioridade },
                    erro: 'O nome da categoria é obrigatório.'
                });
            }

            await CategoriaModel.cadastrar({
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : '',
                prioridade: prioridade || 'Média'
            });

            res.redirect('/categorias');
        } catch (erro) {
            console.error('Erro ao cadastrar categoria:', erro);
            res.status(500).send('Erro ao cadastrar categoria.');
        }
    },

    async detalhes(req, res) {
        try {
            const { id } = req.params;

            const categoria = await CategoriaModel.buscarPorId(id);

            if (!categoria) {
                return res.status(404).send('Categoria não encontrada.');
            }

            res.render('categorias/detalhes', {
                categoria
            });
        } catch (erro) {
            console.error('Erro ao buscar categoria:', erro);
            res.status(500).send('Erro ao buscar categoria.');
        }
    },

    async abrirEdicao(req, res) {
        try {
            const { id } = req.params;

            const categoria = await CategoriaModel.buscarPorId(id);

            if (!categoria) {
                return res.status(404).send('Categoria não encontrada.');
            }

            res.render('categorias/form', {
                categoria,
                erro: null
            });
        } catch (erro) {
            console.error('Erro ao abrir edição da categoria:', erro);
            res.status(500).send('Erro ao abrir edição da categoria.');
        }
    },

    async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, prioridade } = req.body;

            if (!nome || nome.trim() === '') {
                return res.render('categorias/form', {
                    categoria: {
                        id_categoria: id,
                        nome,
                        descricao,
                        prioridade
                    },
                    erro: 'O nome da categoria é obrigatório.'
                });
            }

            await CategoriaModel.atualizar(id, {
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : '',
                prioridade: prioridade || 'Média'
            });

            res.redirect('/categorias');
        } catch (erro) {
            console.error('Erro ao editar categoria:', erro);
            res.status(500).send('Erro ao editar categoria.');
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;

            await CategoriaModel.excluir(id);

            res.redirect('/categorias');
        } catch (erro) {
            console.error('Erro ao excluir categoria:', erro);
            res.status(500).send('Erro ao excluir categoria.');
        }
    }
};

module.exports = CategoriaController;