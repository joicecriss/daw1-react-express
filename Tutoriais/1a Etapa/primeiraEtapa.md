# Intalação das ferramentas e frameworks

### Intalação do Node.js
Digite os comandos no terminal para a instalação do Node.js:

```
sudo apt update
```
```
sudo apt install nodejs npm
```

### Instação do React.js não é necessária, pois ele ocorre na criação da pasta do projeto.

### Instalação do MariaDB
Siga os passos abaixo para ter a instalação em sua máquina do banco de dados:

``` 
sudo apt update

sudo apt install mariadb-server
``` 

Após a instalação, é necessário iniciar os serviços do MariaDB e configurá-lo para
ser executado automaticamente ao ser inicializado:

``` 
sudo systemctl start mariadb

sudo systemctl enable mariadb
``` 

Em seguida, é necessário executar um script de configuração inicial, onde será
possível configurar a senha do usuário root, remover usuários anônimos, desativar login
remoto como root e remover o banco de dados de teste:

```
sudo mysql_secure_installation
``` 

Após a criação e configuração do usuário root, conecte-se ao MariaDB:

```
mysql -u root -p
``` 
