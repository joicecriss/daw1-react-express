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
        <div className="buscar-chave">
          <h4>Chave Encontrada:</h4>
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
