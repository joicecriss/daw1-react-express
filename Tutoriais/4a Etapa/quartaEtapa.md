## Como criar o Banco - MariaDB do Sistema

- Entre no maridb (procure na barra de pesquisa), e coloque a senha do root '123' caso seja pedido.

- Acesse o banco que criamos anteriormente com o código:
```
USE emprestimo_chaves;
```

- Crie as tabelas para as entidades do sistema digitando na interface do banco os seguintes comandos:
```
CREATE TABLE chave (
  id        INT AUTO_INCREMENT PRIMARY KEY   NOT NULL,
  nome      VARCHAR(255)                     NOT NULL,
  status    BOOLEAN                          NOT NULL,
  situacao  BOOLEAN                          NOT NULL
);
```

```
CREATE TABLE servidor (
  id          INT AUTO_INCREMENT PRIMARY KEY  NOT NULL,
  nome        VARCHAR(255)                    NOT NULL,
  cpf         VARCHAR(255)                    NOT NULL,
  contato     INT                             NOT NULL,
  nascimento  DATE                            NOT NULL,
  status      BOOLEAN                         NOT NULL
);
```

```
CREATE TABLE emprestimo (
  id                  INT AUTO_INCREMENT PRIMARY KEY  NOT NULL,
  dthr_emprestimo     DATETIME                        NOT NULL,
  dthr_devolucao      DATETIME                        NOT NULL,
  status              BOOLEAN                         NOT NULL,
  chave_id            INT                             NOT NULL,
  servidor_retiraID   INT                             NOT NULL,
  servidor_devolveID  INT                             NOT NULL,
  FOREIGN KEY (chave_id) REFERENCES chave(id),
  FOREIGN KEY (servidor_retiraID) REFERENCES servidor(id),
  FOREIGN KEY (servidor_devolveID) REFERENCES servidor(id)
);
```
