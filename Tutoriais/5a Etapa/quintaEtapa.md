# Como criar a funcionalidade Listar Chaves Disponíveis

### Backend

### Crie uma pasta para o seu projeto e navegue até ela no terminal. (use cd para isso)

### Inicialize um projeto Node.js e instale as dependências:

```
mkdir backend
cd backend
npm init -y
npm install express mysql2
npm install cors
```

### Crie um arquivo server.js dentro da pasta backend do projeto, para configurar o servidor Express. Cole o código no arquivo:

```
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors'); // Importe o módulo cors
const port = 5000;

// Configuração do CORS para permitir solicitações do frontend
const corsOptions = {
    origin: 'http://localhost:3000', // A URL do seu frontend
};
app.use(cors(corsOptions));

// Configuração da conexão com o banco de dados MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'emprestimo_chaves',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados MariaDB estabelecida.');
});

// Rota para listar chaves disponíveis
app.get('/api/chaves-disponiveis', (req, res) => {
  const query = 'SELECT * FROM chave WHERE situacao = true';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao listar chaves disponíveis.' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});

```

### Execute o servidor backend

```
node server.js
```

## FrontEnd

### Agora crie o projeto React dentro do diretório do projeto seguindo os próximos passos:

### Em uma nova janela do terminal, navegue até a pasta raiz do seu projeto.

### Inicialize um novo projeto React:

```
npx create-react-app frontend
cd frontend
```

### Instale a biblioteca axios para fazer chamadas à API do backend:

```
npm install axios
```

### Crie um arquivo ListarChavesDisponiveis.js na pasta src do seu projeto frontend, e coloque o seguinte código:

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListarChavesDisponiveis() {
  const [chaves, setChaves] = useState([]);

  useEffect(() => {
    // Defina a URL da API do backend
    const apiUrl = 'http://localhost:5000'; // Altere a porta para a do seu backend

    // Faça a chamada para a API do backend para listar as chaves disponíveis
    axios.get(apiUrl + '/api/chaves-disponiveis')
      .then((response) => {
        setChaves(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Chaves Disponíveis:</h2>
      <ul>
        {chaves.map((chave) => (
          <li key={chave.id}>{chave.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarChavesDisponiveis;

```

### Abra o arquivo index.js na pasta src, import o arquivo ListarChaves e Altere a chamada do arquivo na função para ListarChaves, use o exemplo a seguir para aplicar no código. (NÃO COPIE O CÓDIGO, apenas importe o arquivo e mude a chamada na função)

```
import React from 'react';
import ListarChavesDisponiveis from './ListarChavesDisponiveis';

function App() {
  return (
    <div className="App">
      <ListarChavesDisponiveis />
    </div>
  );
}

export default App;
```

### Execute o frontend

```
npm start
```

