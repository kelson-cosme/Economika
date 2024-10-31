import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Teste from "../pages/Teste"
import Detalhes from "../pages/Detalhes"
import Login from "../pages/Login"
import CriarUsuario from "../pages/CriarUsuario"
import ListaCompras from "../pages/ListaCompras"

function Rotas(){
    return(
            <Routes>
                <Route path="/" element={<Home/> } />
                <Route path="/teste" element={<Teste/> } />
                <Route path="/detalhes/:titulo/:id" element={<Detalhes/>} />     
                <Route path="/login" element={<Login/> } />
                <Route path="/criarusuario" element={<CriarUsuario />} />
                <Route path="/compras" element={<ListaCompras />} />
            </Routes>
    )
}

export default Rotas