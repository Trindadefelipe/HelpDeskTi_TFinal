const pool = require("../../database/db");

const Chamado = {
    async listarTodos() {
        const sql = `
            SELECT
                c.id_chamado,
                c.titulo,
                c.descricao,
                c.prioridade,
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
                (titulo, descricao, prioridade, id_status, id_categoria, id_usuario, id_tecnico, id_departamento)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id_chamado
        `;
        const valores = [
            dados.titulo,
            dados.descricao,
            dados.prioridade || "Media",
            dados.id_status,
            dados.id_categoria,
            dados.id_usuario,
            dados.id_tecnico || null,
            dados.id_departamento || null
        ];
        const resultado = await pool.query(sql, valores);
        const idChamado = resultado.rows[0].id_chamado;

        const statusNovo = await this._descricaoStatus(dados.id_status);
        await this._registrarHistorico(idChamado, null, statusNovo, dados.id_tecnico || null, "Abertura do chamado");

        return idChamado;
    },

    async atualizar(id, dados) {
        const anterior = await this.buscarPorId(id);
        const statusNovo = await this._descricaoStatus(dados.id_status);
        // se o chamado foi resolvido/cancelado, marca a data de fechamento
        const fechado = ["Resolvido", "Cancelado"].includes(statusNovo);

        const sql = `
            UPDATE chamados SET
                titulo = $1,
                descricao = $2,
                prioridade = $3,
                id_status = $4,
                id_categoria = $5,
                id_usuario = $6,
                id_tecnico = $7,
                id_departamento = $8,
                data_fechamento = CASE WHEN $9 THEN COALESCE(data_fechamento, NOW()) ELSE NULL END
            WHERE id_chamado = $10
        `;
        const valores = [
            dados.titulo,
            dados.descricao,
            dados.prioridade || "Media",
            dados.id_status,
            dados.id_categoria,
            dados.id_usuario,
            dados.id_tecnico || null,
            dados.id_departamento || null,
            fechado,
            id
        ];
        await pool.query(sql, valores);

        if (anterior && String(anterior.id_status) !== String(dados.id_status)) {
            const statusAnterior = await this._descricaoStatus(anterior.id_status);
            await this._registrarHistorico(id, statusAnterior, statusNovo, dados.id_tecnico || null, null);
        }
    },

    async _descricaoStatus(idStatus) {
        if (!idStatus) return null;
        const resultado = await pool.query("SELECT descricao FROM status WHERE id_status = $1", [idStatus]);
        return resultado.rows[0] ? resultado.rows[0].descricao : null;
    },

    async _registrarHistorico(idChamado, statusAnterior, statusNovo, idTecnico, descricao) {
        const sql = `
            INSERT INTO historico_chamados
                (id_chamado, status_anterior, status_novo, id_tecnico, descricao)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(sql, [idChamado, statusAnterior, statusNovo, idTecnico, descricao]);
    },

    async listarHistorico(idChamado) {
        const sql = `
            SELECT
                h.id_historico,
                h.status_anterior,
                h.status_novo,
                h.data_hora,
                h.descricao,
                t.nome AS tecnico
            FROM historico_chamados h
            LEFT JOIN tecnicos t ON t.id_tecnico = h.id_tecnico
            WHERE h.id_chamado = $1
            ORDER BY h.data_hora ASC
        `;
        const resultado = await pool.query(sql, [idChamado]);
        return resultado.rows;
    },

    // em vez de apagar, muda o status para "Cancelado" (assim nao perde o historico nem quebra a FK)
    async cancelar(id) {
        const anterior = await this.buscarPorId(id);
        if (!anterior) return;

        const cancelado = await pool.query("SELECT id_status FROM status WHERE descricao = 'Cancelado'");
        if (cancelado.rowCount === 0) return;
        const idCancelado = cancelado.rows[0].id_status;

        // ja esta cancelado, nao faz nada
        if (String(anterior.id_status) === String(idCancelado)) return;

        await pool.query(
            "UPDATE chamados SET id_status = $1, data_fechamento = NOW() WHERE id_chamado = $2",
            [idCancelado, id]
        );

        const statusAnterior = await this._descricaoStatus(anterior.id_status);
        await this._registrarHistorico(id, statusAnterior, "Cancelado", anterior.id_tecnico || null, "Chamado cancelado");
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
