# Criação de um novo projeto com o MariaDB:

Para a criação de um novo projeto utilizando o banco de dados MariaDB com o
sistema Linux, é necessário primeiramente verificar se o mesmo se encontra instalado em
sua máquina. Caso não esteja, siga os passos abaixo para ter a instalação em sua
máquina e dar início ao projeto:

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

Após seguir todos os passos, é só continuar com a criação de sua base de dados.
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

# Criação de um novo projeto com o React.js:

Para a criação de um novo projeto utilizando o React.js no sistema Linux, é necessário primeiramente ter instalado o node.js. Caso não tenha instalado, siga os passos da primeira etapa.

Abra o terminal e vá até o diretório onde ficará o projeto e digita o comando para criar uma pasta:
```
mkdir react-express
cd react-express
```
Comando para instalar o Create React App, que é uma ferramenta oficial para criar rapidamente aplicações React sem a necessidade de configurar manualmente o ambiente.
```
npm install -q create-react-app
```

Comando para criar um novo aplicativo react em seu diretório.
```
npx create-react-app .
```

Agora só inicializar o react
```
npm start
```
