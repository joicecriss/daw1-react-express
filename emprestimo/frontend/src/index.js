import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ListarChaves from './components/ListarChaves';
import reportWebVitals from './reportWebVitals';
import InserirChave from './components/InserirChaves';
import BuscarChave from './components/BuscarChave';
import AlterarChave from './components/AlterarChave';
import RemoverChave from './components/RemoverChave';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InserirChave />
    <ListarChaves />
    <BuscarChave />
    <AlterarChave />
    <RemoverChave />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
