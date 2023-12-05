import React from "react";
import { Link } from "react-router-dom";
import "./styles/global.css";

function App() {
  return (
    <header>
      <div>
        <Link to="/">Início</Link>
        <Link to="/listarChaves">Listar </Link>
        <Link to="/inserirChaves">Inserir </Link>
        <Link to="/buscarChave">Buscar </Link>
        <Link to="/alterarChave">Alterar </Link>
        <Link to="/removerChave">Remover </Link>        
      </div>
    </header>
  );
}

export default App;