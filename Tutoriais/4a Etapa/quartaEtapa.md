# Como criar o Banco do Sistema
## Banco - MariaDB

### 1º Passo:
    - Vamos criar o banco de dados para o sistema. Siga estas etapas no MySQL Workbench:

    - Na guia "Navigator" à esquerda, clique com o botão direito do mouse em "Schemas" e escolha "Create Schema..." para criar um novo esquema de banco de dados.
    Dê o nome do banco "emprestimoDB".

### 2º Passo:
    - Com o novo esquema relacional criado, você pode começar a criar tabelas para as entidades do sistema.

    - Digite na interface do banco os seguintes comandos:
```
-- Tabela para Chave
CREATE TABLE chave (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  status BOOLEAN NOT NULL,
  situacao BOOLEAN NOT NULL
);

-- Tabela para Servidor
CREATE TABLE servidor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(255) NOT NULL,
  contato INT NOT NULL,
  nascimento DATE NOT NULL,
  status BOOLEAN NOT NULL
);

-- Tabela para Empréstimo
CREATE TABLE emprestimo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dthr_emprestimo DATETIME NOT NULL,
  dthr_devolucao DATETIME NOT NULL,
  status BOOLEAN NOT NULL,
  chave_id INT NOT NULL,
  servidor_retiraID INT NOT NULL,
  servidor_devolveID INT NOT NULL,
  FOREIGN KEY (chave_id) REFERENCES chave(id),
  FOREIGN KEY (servidor_retiraID) REFERENCES servidor(id),
  FOREIGN KEY (servidor_devolveID) REFERENCES servidor(id)
);
```