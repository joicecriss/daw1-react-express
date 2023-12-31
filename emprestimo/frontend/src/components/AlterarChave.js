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