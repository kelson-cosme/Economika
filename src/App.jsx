import './App.css';
import Rotas from "./componentes/rotas/Rotas";
import { BrowserRouter } from 'react-router-dom';
import { ProdutosProvider } from './componentes/contextProdutos/ProdutosContext';
import { UserProvider } from './componentes/pages/Context'; // Certifique-se de importar corretamente

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <ProdutosProvider>
                    <Rotas />
                </ProdutosProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
