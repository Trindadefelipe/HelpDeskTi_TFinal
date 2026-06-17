const pool = require("../../database/db");

const Chamado = {
    async listarTodos() {
        const sql = `
            SELECT
                c.id_chamado,
                c.titulo,
                c.descricao,
                c.data_abertura,
                s.descricao AS status,
                cat.nome AS categoria,
                u.nome AS solicitante,
                t.nome AS tecnico,
                d.nome AS departamento
            FROM chamados c
            JOIN status s ON s.id_status = c.id_status
            JOIN categorias cat ON cat.id_categoria = c.id_categoria
            JOIN usuarios u ON u.id_usuario = c.id_usuario
            LEFT JOIN tecnicos t ON t.id_tecnico = c.id_tecnico
            LEFT JOIN departamentos d ON d.id_departamento = c.id_departamento
            ORDER BY c.id_chamado DESC
        `;
        const resultado = await pool.query(sql);
        return resultado.rows;
    },

    async buscarPorId(id) {
        const sql = `SELECT * FROM chamados WHERE id_chamado = $1`;
        const resultado = await pool.query(sql, [id]);
        return resultado.rows[0];
    },

    async criar(dados) {
        const sql = `
            INSERT INTO chamados
                (titulo, descricao, id_status, id_categoria, id_usuario, id_tecnico, id_departamento)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id_chamado
        `;
        const valores = [
            dados.titulo,
            dados.descricao,
            dados.id_status,
            dados.id_categoria,
            dados.id_usuario,
            dados.id_tecnico || null,
            dados.id_departamento || null
        ];
        const resultado = await pool.query(sql, valores);
        return resultado.rows[0].id_chamado;
    },

    async atualizar(id, dados) {
        const sql = `
            UPDATE chamados SET
                titulo = $1,
                descricao = $2,
                id_status = $3,
                id_categoria = $4,
                id_usuario = $5,
                id_tecnico = $6,
                id_departamento = $7
            WHERE id_chamado = $8
        `;
        const valores = [
            dados.titulo,
            dados.descricao,
            dados.id_status,
            dados.id_categoria,
            dados.id_usuario,
            dados.id_tecnico || null,
            dados.id_departamento || null,
            id
        ];
        await pool.query(sql, valores);
    },

    async excluir(id) {
        await pool.query("DELETE FROM chamados WHERE id_chamado = $1", [id]);
    },

    async carregarOpcoes() {
        const status = await pool.query("SELECT id_status, descricao FROM status ORDER BY id_status");
        const categorias = await pool.query("SELECT id_categoria, nome FROM categorias ORDER BY nome");
        const usuarios = await pool.query("SELECT id_usuario, nome FROM usuarios ORDER BY nome");
        const tecnicos = await pool.query("SELECT id_tecnico, nome FROM tecnicos ORDER BY nome");
        const departamentos = await pool.query("SELECT id_departamento, nome FROM departamentos ORDER BY nome");
        return {
            status: status.rows,
            categorias: categorias.rows,
            usuarios: usuarios.rows,
            tecnicos: tecnicos.rows,
            departamentos: departamentos.rows
        };
    }
};

module.exports = Chamado;
