# Criação de um novo projeto com o MariaDB:

Para a criação dessa base de dados, é necessário digitar o comando abaixo:

```
CREATE DATABASE emprestimo_chaves;
``` 

Agora, crie um usuário para o seu projeto e defina suas permissões de acesso ao
banco de dados criado:

``` 
CREATE USER 'seu_usuario'@'localhost' 
IDENTIFIED BY 'sua_senha';

GRANT ALL PRIVILEGES ON emprestimo_chaves.* TO
'seu_usuario'@'localhost';

FLUSH PRIVILEGES;
```

E, por fim, temos uma base de dados já configurada para ser modelada de acordo
com a necessidade do seu projeto.

# Criação de um novo projeto com o React.js será feita em outra etapa.

