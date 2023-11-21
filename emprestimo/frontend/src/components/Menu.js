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
