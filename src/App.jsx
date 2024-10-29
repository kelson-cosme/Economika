import './App.css'
import Rotas from "./componentes/rotas/Rotas"
import UserContext from './componentes/pages/Context'
import { useState } from 'react';


function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <>
      <UserContext.Provider value={{carrinho: carrinho, setCarrinho}}>
        < Rotas/>
      </UserContext.Provider>
    </>
  )
}

export default App
