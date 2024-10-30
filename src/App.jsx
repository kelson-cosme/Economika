import './App.css'
import Rotas from "./componentes/rotas/Rotas"
import UserContext from './componentes/pages/Context'
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';


function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <>
        <BrowserRouter>

      <UserContext.Provider value={{carrinho: carrinho, setCarrinho}}>
        < Rotas/>
      </UserContext.Provider>
      </BrowserRouter>

    </>
  )
}

export default App
