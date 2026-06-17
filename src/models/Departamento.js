const pool = require('../../database/db');

async function listarTodos() {
    const result = await pool.query('SELECT * FROM departamentos ORDER BY id_departamento');
    return result.rows;
}

async function buscarPorId(id) {
    const result = await pool.query('SELECT * FROM departamentos WHERE id_departamento = $1', [id]);
    return result.rows[0];
}

async function criar(nome, responsavel, localizacao) {
    const result = await pool.query(
        'INSERT INTO departamentos (nome, responsavel, localizacao) VALUES ($1, $2, $3) RETURNING *',
        [nome, responsavel, localizacao]
    );
    return result.rows[0];
}

async function atualizar(id, nome, responsavel, localizacao) {
    const result = await pool.query(
        'UPDATE departamentos SET nome = $1, responsavel = $2, localizacao = $3 WHERE id_departamento = $4 RETURNING *',
        [nome, responsavel, localizacao, id]
    );
    return result.rows[0];
}

async function contarVinculos(id) {
    const tecnicos = await pool.query('SELECT COUNT(*) FROM tecnicos WHERE id_departamento = $1', [id]);
    const chamados = await pool.query('SELECT COUNT(*) FROM chamados WHERE id_departamento = $1', [id]);
    return {
        tecnicos: Number(tecnicos.rows[0].count),
        chamados: Number(chamados.rows[0].count)
    };
}

async function excluir(id) {
    await pool.query('DELETE FROM departamentos WHERE id_departamento = $1', [id]);
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, excluir, contarVinculos };
