import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Teste from "../pages/Teste"
import Detalhes from "../pages/Detalhes"
import Login from "../pages/Login"

function Rotas(){
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/> } />
                <Route path="/teste" element={<Teste/> } />
                <Route path="/detalhes/:titulo/:id" element={<Detalhes/>} />     
                <Route path="/login" element={<Login/> } />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas