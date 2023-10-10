import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListarChaves() {
  const [chaves, setChaves] = useState([]);

  useEffect(() => {
    axios.get('/api/chaves') // Rota da API no servidor backend
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

export default ListarChaves;