import React, { useEffect, useState } from 'react';
import axios from 'axios';
import App from '../App';

function ListarChaves() {
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