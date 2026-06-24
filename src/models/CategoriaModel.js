const pool = require('../../database/db');

const CategoriaModel = {
    async listarTodas() {
        const resultado = await pool.query(`
            SELECT id_categoria, nome, descricao, prioridade
            FROM categorias
            ORDER BY id_categoria ASC
        `);

        return resultado.rows;
    },

    async buscarPorId(id) {
        const resultado = await pool.query(`
            SELECT id_categoria, nome, descricao, prioridade
            FROM categorias
            WHERE id_categoria = $1
        `, [id]);

        return resultado.rows[0];
    },

    async cadastrar(dados) {
        const { nome, descricao, prioridade } = dados;

        await pool.query(`
            INSERT INTO categorias (nome, descricao, prioridade)
            VALUES ($1, $2, $3)
        `, [nome, descricao, prioridade]);
    },

    async atualizar(id, dados) {
        const { nome, descricao, prioridade } = dados;

        await pool.query(`
            UPDATE categorias
            SET nome = $1,
                descricao = $2,
                prioridade = $3
            WHERE id_categoria = $4
        `, [nome, descricao, prioridade, id]);
    },

    async excluir(id) {
        await pool.query(`
            DELETE FROM categorias
            WHERE id_categoria = $1
        `, [id]);
    }
};

module.exports = CategoriaModel;