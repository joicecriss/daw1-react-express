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
