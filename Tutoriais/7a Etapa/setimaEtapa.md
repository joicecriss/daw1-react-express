# Como criar a funcionalidade Buscar Chave

### Backend

- Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para inserir chaves:

```
// Rota para buscar uma chave pelo nome
app.get('/api/buscar-chave/:nome', (req, res) => {
  const nomeChave = req.params.nome;
  const query = 'SELECT * FROM chave WHERE nome = ?';
  connection.query(query, [nomeChave], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar a chave.' });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Retorna a primeira chave encontrada (ou ajuste conforme necessário)
      } else {
        res.status(404).json({ error: 'Chave não encontrada.' });
      }
    }
  });
});
```

### Frontend

- Crie o arquivo BuscarChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from "react";
import axios from "axios";
import App from "../App";

const BuscarChave = () => {
  const [nomeChave, setNomeChave] = useState("");
  const [chaveEncontrada, setChaveEncontrada] = useState(null);

  const buscarChave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/buscar-chave/${nomeChave}`
      );
      setChaveEncontrada(response.data);
    } catch (error) {
      console.error(
        "Erro ao buscar chave:",
        error.response?.data || error.message
      );
      setChaveEncontrada(null);
    }
  };

  return (
    <div>
      <App />
      <h2>Buscar Chave</h2>
      <input
        type="text"
        value={nomeChave}
        placeholder="Digite o nome da chave"
        onChange={(e) => setNomeChave(e.target.value)}
      />
      <button onClick={buscarChave}>Buscar</button>

      {chaveEncontrada && (
        <div>
          <p>Chave Encontrada:</p>
          <p>ID: {chaveEncontrada.id}</p>
          <p>Nome: {chaveEncontrada.nome}</p>
          <p>
            Situação: {chaveEncontrada.situacao ? "Disponível" : "Indisponível"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BuscarChave;

```

# Como criar a funcionalidade Alterar Chave:

### Backend

- Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para buscar chaves:

```
// Rota para alterar uma chave pelo ID
app.put('/api/alterar-chave/:id', (req, res) => {
  const chaveId = req.params.id;
  const { nome, situacao } = req.body;
  const query = 'UPDATE chave SET nome = ?, situacao = ? WHERE id = ?';
  connection.query(query, [nome, situacao, chaveId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao alterar a chave.' });
    } else {
      res.json({ message: 'Chave alterada com sucesso.' });
    }
  });
});
```

### Frontend

- Crie o arquivo AlterarChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from 'react';
import axios from 'axios';
import App from '../App';

const AlterarChave = () => {
  const [chaveId, setChaveId] = useState('');
  const [nome, setNome] = useState('');
  const [situacao, setSituacao] = useState(true);

  const alterarChave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/alterar-chave/${chaveId}`, { nome, situacao });
      alert('Chave alterada com sucesso!');
      // Limpar campos após a alteração
      setChaveId('');
      setNome('');
      setSituacao(true);
    } catch (error) {
      console.error('Erro ao alterar chave:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <App />
      <h2>Alterar Chave</h2>
      <input type="text" placeholder="ID da Chave" value={chaveId} onChange={(e) => setChaveId(e.target.value)} />
      <input type="text" placeholder="Novo Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <label className='checkbox-alterar'>
        <input type="checkbox" checked={situacao} onChange={() => setSituacao(!situacao)} />
        Disponível
      </label>
      <button onClick={alterarChave}>Alterar</button>
    </div>
  );
};

export default AlterarChave;
```

# Como criar a funcionalidade Remover Chave:

### Backend

- Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para alterar chaves:

```
// Rota para remover (desativar) uma chave pelo ID
app.put('/api/remover-chave/:id', (req, res) => {
  const chaveId = req.params.id;
  const query = 'UPDATE chave SET situacao = false WHERE id = ?';
  connection.query(query, [chaveId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao remover a chave.' });
    } else {
      res.json({ message: 'Chave removida com sucesso.' });
    }
  });
});
```

### Frontend

- Crie o arquivo RemoverChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from 'react';
import axios from 'axios';
import App from '../App';

const RemoverChave = () => {
  const [chaveId, setChaveId] = useState('');

  const removerChave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/remover-chave/${chaveId}`);
      alert('Chave removida com sucesso!');
      // Limpar campo após a remoção
      setChaveId('');
    } catch (error) {
      console.error('Erro ao remover chave:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <App />
      <h2>Remover Chave</h2>
      <input type="text" placeholder="ID da Chave" value={chaveId} onChange={(e) => setChaveId(e.target.value)} />
      <button onClick={removerChave}>Remover</button>
    </div>
  );
};

export default RemoverChave;
```

# Criando o menu com as rotas dos components

- Crie o arquivo Home.js dentro da pasta components, que está na pasta src do frontend e coloque este código:

```
import React from 'react';
import App from "../App";

const Home = () => {
  return (
    <div>
        <App />
      <h2>Empréstimo de Chaves</h2>
      <p>Bem-vindo ao sistema de gerenciamento de empréstimo de chaves.
      <br/>
      Organize e controle o acesso de forma eficiente.</p>
    </div>
  );
};

export default Home;

```

- Dentro da pasta src, crie um arquivo App.js e cole este código: (Caso já tenha sido criado pelo react, substitua por este em seguida)

```
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <header>
      <Link to="/listarChaves">Listar Chaves</Link>

      <Link to="/inserirChaves">Inserir Chave</Link>

      <Link to="/buscarChave">Buscar Chave</Link>

      <Link to="/alterarChave">Alterar Chave</Link>

      <Link to="/removerChave">Remover Chave</Link>

      <Link to="/">Início</Link>
    </header>
  );
}

export default App;
```

- Dentro da pasta src, crie o arquivo routes.js e cole este código:

```
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AlterarChaves from "./components/AlterarChave";
import BuscarChave from "./components/BuscarChave";
import InserirChaves from "./components/InserirChaves";
import RemoverChaves from "./components/RemoverChave";
import ListarChaves from "./components/ListarChaves"

function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alterarChave" element={<AlterarChaves />} />
            <Route path="/buscarChave" element={<BuscarChave />} />
            <Route path="/inserirChaves" element={<InserirChaves />} />
            <Route path="/removerChave" element={<RemoverChaves />} />
            <Route path="/listarChaves" element={<ListarChaves />} />
        </Routes>
    );
}

export default MainRoutes;
```

- Atualize o arquivo InserirChaves.js:

```
import React, { useState } from 'react';
import axios from 'axios';
import App from '../App';

function InserirChave({ atualizarChaves }) {
  const [novaChave, setNovaChave] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novaChave.trim() === '') {
      alert('O nome da chave não pode estar em branco.');
      return;
    }

    // Defina a URL da API do backend
    const apiUrl = 'http://localhost:5000'; // Altere a porta para a do seu backend

    // Faça a chamada para a API do backend para listar as chaves disponíveis
    axios.post(apiUrl + '/api/inserir-chave', {
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
        <App />
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

- Atualize o arquivo ListarChaves.js:

```
import React, { useEffect, useState } from "react";
import axios from "axios";
import App from "../App";

function ListarChaves() {
  const [chaves, setChaves] = useState([]);

  useEffect(() => {
    // Defina a URL da API do backend
    const apiUrl = "http://localhost:5000"; // Altere a porta para a do seu backend

    // Faça a chamada para a API do backend para listar as chaves disponíveis
    axios
      .get(apiUrl + "/api/chaves-disponiveis")
      .then((response) => {
        setChaves(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <App />
      <h2>Chaves Disponíveis:</h2>
      <ul>
        {chaves.map((chave) => (
          <li key={chave.id}>{chave.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarChaves;

```

- Atualize o arquivo index.js:
  
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

# Criando a estilização de todo o projeto:

- Crie uma pasta chamada styles dentro da pasta src que está no frontend.
- Excluir os arquivos css que estão na pasta src.
- Dentro do arquivo index.js, retire o import do arquivo css.
  
- Crie o arquivo global.css dentro da pasta styles e coloque o código:
```
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 600px;
    margin: 10rem auto;
    padding: 3rem;

    background-color: #F2D4F3;
    
    border: 5px solid #791A78;
    border-radius: 2rem;
}

header {
    
    margin-bottom: 2rem;
    
    color: #791A78;
    text-decoration:none;
}

header div {
    display: flex;
    justify-content: space-between;
}

header div a {
    text-decoration: none;
}

header div a:hover {
    color: #BC66BC;
    text-decoration: underline;
}

input {
    width: 50%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #791A78;
    border-radius: 0.5rem;
}

input:focus {
    outline: none;
}

button {
    width: 20%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #791A78;
    border-radius: 0.5rem;

    background-color: #791A78;
    color: #FFF;
}

button:hover {
    background-color: #BC66BC;
}

label {
    display: flex;
    justify-content: left;
    margin-bottom: 0.5rem;
    color: #791A78;
}

.checkbox-alterar {
    width: 10%;
}
```

- Importe o css no arquivo App.js:
```
import "./styles/global.css";
```

- Altere o title do projeto para Empréstimo de Chaves, o arquivo index.html está na pasta public. 
