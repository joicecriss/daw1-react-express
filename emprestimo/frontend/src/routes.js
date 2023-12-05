import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AlterarChaves from "./components/AlterarChave";
import BuscarChave from "./components/BuscarChave";
import InserirChave from "./components/InserirChave";
import RemoverChaves from "./components/RemoverChave";
import ListarChaves from "./components/ListarChaves"

function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alterarChave" element={<AlterarChaves />} />
            <Route path="/buscarChave" element={<BuscarChave />} />
            <Route path="/inserirChaves" element={<InserirChave />} />
            <Route path="/removerChave" element={<RemoverChaves />} />
            <Route path="/listarChaves" element={<ListarChaves />} />
        </Routes>
    );
}

export default MainRoutes;