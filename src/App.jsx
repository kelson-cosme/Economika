import './App.css'
import Rotas from "./componentes/rotas/Rotas"
import UserContext from './componentes/pages/Context'
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ProdutosProvider } from './componentes/contextProdutos/ProdutosContext';

function App() {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <>
      <BrowserRouter>

        <UserContext.Provider value={{carrinho: carrinho, setCarrinho}}>
          <ProdutosProvider>
            < Rotas/>
          </ProdutosProvider>    
        </UserContext.Provider>
        </BrowserRouter>
    </>
  )
}

export default App
