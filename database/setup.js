const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME || "helpdesk";

const baseConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

async function runSqlFile(client, fileName) {
    const fullPath = path.join(__dirname, fileName);
    if (!fs.existsSync(fullPath)) {
        console.log(`${fileName} nao encontrado - pulando.`);
        return;
    }
    const sql = fs.readFileSync(fullPath, "utf8");
    await client.query(sql);
    console.log(`${fileName} executado.`);
}

async function main() {
    const admin = new Client({ ...baseConfig, database: "postgres" });
    await admin.connect();

    const existe = await admin.query("SELECT 1 FROM pg_database WHERE datname = $1", [DB_NAME]);
    if (existe.rowCount === 0) {
        await admin.query(`CREATE DATABASE "${DB_NAME}"`);
        console.log(`Banco "${DB_NAME}" criado.`);
    } else {
        console.log(`Banco "${DB_NAME}" ja existe.`);
    }
    await admin.end();

    const db = new Client({ ...baseConfig, database: DB_NAME });
    await db.connect();
    await runSqlFile(db, "schema.sql");
    await runSqlFile(db, "seed.sql");
    await db.end();

    console.log("Banco pronto.");
}

main().catch((erro) => {
    console.error("Erro ao preparar o banco:", erro.message);
    process.exit(1);
});
