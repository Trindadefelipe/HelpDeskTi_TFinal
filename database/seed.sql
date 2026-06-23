INSERT INTO status (descricao) VALUES
    ('Aberto'),
    ('Em Atendimento'),
    ('Resolvido'),
    ('Cancelado');

INSERT INTO categorias (nome, descricao) VALUES
    ('Hardware', 'Problemas com equipamentos fisicos'),
    ('Software', 'Erros e instalacao de programas'),
    ('Rede', 'Conectividade e internet'),
    ('Acesso', 'Senhas e permissoes');

INSERT INTO departamentos (nome) VALUES
    ('TI'),
    ('Recursos Humanos'),
    ('Financeiro');

INSERT INTO tecnicos (nome, telefone, email) VALUES
    ('Carlos Souza', '(43) 99999-0001', 'carlos@empresa.com'),
    ('Ana Lima', '(43) 99999-0002', 'ana@empresa.com');

-- senha dos dois usuarios: 123456
INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES
    ('Felipe Trindade', 'felipe@empresa.com', '$2b$10$v0/C4eg06Kityy..Zh/OXeaFUnRW843bbP8VZmDXgOAq/6c/TX5WW', 'admin'),
    ('Maria Oliveira', 'maria@empresa.com', '$2b$10$v0/C4eg06Kityy..Zh/OXeaFUnRW843bbP8VZmDXgOAq/6c/TX5WW', 'comum');
