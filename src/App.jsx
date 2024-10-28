import './App.css'
import Rotas from './assets/componentes/rotas/Rotas'
import UserContext from './assets/componentes/pages/Context'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('Usuário Padrão');

  return (
    <>
      <UserContext.Provider value={{user: user, setUser}}>
        < Rotas/>
      </UserContext.Provider>
    </>
  )
}

export default App
