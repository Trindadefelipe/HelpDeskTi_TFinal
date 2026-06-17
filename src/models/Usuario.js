const pool = require('../../database/db');

async function buscarPorEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
}

module.exports = { buscarPorEmail };

