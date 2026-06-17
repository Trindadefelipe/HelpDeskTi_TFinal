--Tabelas Base

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, --vai guardar o hash do bcrypt
    perfil VARCHAR(20) NOT NULL, --solicitante, tecnico, admin
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS departamentos(
    id_departamento SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    responsavel VARCHAR(100),
    localizacao VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS tecnicos(
    id_tecnico SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    id_departamento INT REFERENCES departamentos(id_departamento)
);

CREATE TABLE IF NOT EXISTS status(
    id_status SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias(
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS chamados(
	id_chamado SERIAL PRIMARY KEY,
	titulo VARCHAR(150) NOT NULL,
	descricao TEXT NOT NULL,
	data_abertura TIMESTAMP NOT NULL DEFAULT NOW(),
	data_fechamento TIMESTAMP,
	id_status INT NOT NULL REFERENCES status(id_status),
	id_tecnico INT REFERENCES tecnicos(id_tecnico),
	id_departamento INT REFERENCES departamentos(id_departamento),
	id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_categoria INT NOT NULL REFERENCES categorias(id_categoria)
);

CREATE TABLE IF NOT EXISTS historico_chamados(
	id_historico SERIAL PRIMARY KEY,
	id_chamado INT NOT NULL REFERENCES chamados(id_chamado),
	status_anterior VARCHAR(50),
	status_novo VARCHAR(50),
	id_tecnico INT REFERENCES tecnicos(id_tecnico),
	data_hora TIMESTAMP NOT NULL DEFAULT NOW(),
	descricao TEXT
);
