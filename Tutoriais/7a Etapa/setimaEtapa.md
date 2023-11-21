# Como criar a funcionalidade Buscar Chave

### Backend

### Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para inserir chaves:

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

### Crie o arquivo BuscarChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from 'react';
import axios from 'axios';

const BuscarChave = () => {
  const [nomeChave, setNomeChave] = useState('');
  const [chaveEncontrada, setChaveEncontrada] = useState(null);

  const buscarChave = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/buscar-chave/${nomeChave}`);
      setChaveEncontrada(response.data);
    } catch (error) {
      console.error('Erro ao buscar chave:', error.response?.data || error.message);
      setChaveEncontrada(null);
    }
  };

  return (
    <div>
      <h2>Buscar Chave</h2>
      <input type="text" value={nomeChave} onChange={(e) => setNomeChave(e.target.value)} />
      <button onClick={buscarChave}>Buscar</button>

      {chaveEncontrada && (
        <div>
          <p>Chave Encontrada:</p>
          <p>ID: {chaveEncontrada.id}</p>
          <p>Nome: {chaveEncontrada.nome}</p>
          <p>Situação: {chaveEncontrada.situacao ? 'Disponível' : 'Indisponível'}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarChave;
```

# Como criar a funcionalidade Alterar Chave:

### Backend

### Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para buscar chaves:

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

### Crie o arquivo AlterarChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Alterar Chave</h2>
      <input type="text" placeholder="ID da Chave" value={chaveId} onChange={(e) => setChaveId(e.target.value)} />
      <input type="text" placeholder="Novo Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <label>
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

## Backend

### Atualize o arquivo server.js colocando esse código abaixo da funcionalidade de rota para alterar chaves:

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

## Frontend

### Crie o arquivo RemoverChave.js dentro da pasta components, que está na src do frontend e coloque este código:

```
import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Remover Chave</h2>
      <input type="text" placeholder="ID da Chave" value={chaveId} onChange={(e) => setChaveId(e.target.value)} />
      <button onClick={removerChave}>Remover</button>
    </div>
  );
};

export default RemoverChave;
```

# Criando o menu com as rotas dos components

### Crie o arquivo Menu.js dentro da pasta components, na pasta src do frontend e coloque este código:

```
import React from 'react';
import { Link } from 'react-router-dom';

const MenuChaves = () => {
  return (
    <div>
      <Link to="/listar-chaves">Listar Chaves</Link>
      <Link to="/inserir-chave">Inserir Chave</Link>
      <Link to="/buscar-chave">Buscar Chave</Link>
      <Link to="/alterar-chave">Alterar Chave</Link>
      <Link to="/remover-chave">Remover Chave</Link>
    </div>
  );
};

export default MenuChaves;

```

### Dentro da pasta src, crie um arquivo App.js e cole este código: (Caso já tenha sido criado pelo react, substitua por este em seguida)

```
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuChaves from './components/Menu';
import ListarChaves from './components/ListarChaves';
import InserirChaves from './components/InserirChaves';
import BuscarChave from './components/BuscarChave';
import AlterarChave from './components/AlterarChave';
import RemoverChave from './components/RemoverChave';

const App = () => {
  return (
    <Router>
      <div>
        <MenuChaves />

        <Routes>
          <Route path="/listar-chaves" element={<ListarChaves />} />
          <Route path="/inserir-chave" element={<InserirChaves />} />
          <Route path="/buscar-chave" element={<BuscarChave />} />
          <Route path="/alterar-chave" element={<AlterarChave />} />
          <Route path="/remover-chave" element={<RemoverChave />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
``` 