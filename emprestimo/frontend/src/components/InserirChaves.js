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
