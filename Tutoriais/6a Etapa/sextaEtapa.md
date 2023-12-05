# Como criar a funcionalidade Inserir Chaves

### Backend

- Atualiza o arquivo server.js dentro da pasta backend do projeto, para configurar a inserção da nova chave. Cole o código no arquivo:

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

// Rota para inserir uma nova chave
app.post('/api/inserir-chave', (req, res) => {
    const { nome } = req.body;
  
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'O nome da chave não pode estar em branco.' });
    }
  
    const verificaChaveQuery = 'SELECT * FROM chaves WHERE nome = ?';
    connection.query(verificaChaveQuery, [nome], (err, results) => {
      if (err) {
        console.error('Erro na verificação da chave:', err);
        return res.status(500).json({ error: 'Erro ao verificar a chave.' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ error: 'Já existe uma chave com o mesmo nome.' });
      }
  
      const inserirChaveQuery = 'INSERT INTO chaves (nome, situacao, status) VALUES (?, true, "Disponível")';
      connection.query(inserirChaveQuery, [nome], (err) => {
        if (err) {
          console.error('Erro na inserção da chave:', err);
          return res.status(500).json({ error: 'Erro ao inserir a chave.' });
        }
        res.status(200).json({ message: 'Chave inserida com sucesso' });
      });
    });
  });
  
  

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});


```

### FrontEnd

- Crie crie um arquivo InserirChave.js na pasta components, e coloque o seguinte código:

```
import React, { useState } from 'react';
import axios from 'axios';

function InserirChave({ atualizarChaves }) {
  const [novaChave, setNovaChave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novaChave.trim() === '') {
      alert('O nome da chave não pode estar em branco.');
      return;
    }

    axios.post('http://localhost:5000/api/inserir-chave', {
      nome: novaChave,
    })
      .then((response) => {
        alert(response.data.message);
        setNovaChave('');
        atualizarChaves(); // Atualize a lista de chaves após a inserção
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Inserir Nova Chave</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da chave"
          value={novaChave}
          onChange={(e) => setNovaChave(e.target.value)}
        />
        <button type="submit">Inserir Chave</button>
      </form>
    </div>
  );
}

export default InserirChave;

```

- Abra o arquivo index.js na pasta src, import o arquivo InserirChave e adicione a chamada do arquivo na função, use o exemplo a seguir para aplicar no código. (NÃO COPIE O CÓDIGO, apenas importe o arquivo e mude a chamada na função)

```
import React from 'react';
import ListarChaves from './components/ListarChaves';
import InserirChave from './components/InserirChaves';

function App() {
  return (
    <div className="App">
      <InserirChave />
      <ListarChavesDisponiveis />
    </div>
  );
}

export default App;
```

