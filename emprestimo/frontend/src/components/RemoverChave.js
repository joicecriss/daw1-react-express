// Componente RemoverChave.js
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