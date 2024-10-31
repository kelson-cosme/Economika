

import { useContext, useId, useState } from "react";
import UserContext from "../pages/Context";
import "./Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection} from "firebase/firestore";
import { Link } from "react-router-dom";


function NavBar({db, app}) {
    const { carrinho, setCarrinho } = useContext(UserContext);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    
    const auth = getAuth(app);
        console.log(carrinho)
    
    function fecharCarrinho() {
        const user = auth.currentUser; // Verifica se há um usuário logado
        
        if (user) {
            // Somente executa a adição ao Firebase se o usuário estiver logado
            const date = new Date();
            addDoc(collection(db, "compras"), {
                data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                produtos: carrinho,
                situacao: false,
                proprietario: user.uid
            });
            console.log("Compra finalizada com sucesso.");
        } else {
            alert("Por favor, faça login para finalizar a compra.");
        }
    }

        // Sair(Deslogar)
    function sair(){
        const auth = getAuth(app)
        signOut(auth).then(() => {
            console.log("Sign-out successful")
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            
          });
    }

    

    function aumentarCarrinho(item, index) {
        // Cria uma nova lista de itens do carrinho com a unidade aumentada para o item selecionado
        const novoCarrinho = carrinho.map((carrinhoItem, i) => 
            i === index ? { ...carrinhoItem, unidade: carrinhoItem.unidade + 1 } : carrinhoItem);
            setCarrinho(novoCarrinho); // Atualiza o estado do carrinho com o novo array
    }

    function diminuirCarrinho(item, index) {
        const novoCarrinho = carrinho.map((carrinhoItem, i) => 
            i === index ? { ...carrinhoItem, unidade: carrinhoItem.unidade - 1 } : carrinhoItem).filter(carrinhoItem => carrinhoItem.unidade > 0); // Remove itens com unidade 0
            setCarrinho(novoCarrinho);
    }

    


    return (
        <>
            <header>
                <div><h1>LOGO</h1></div>
                <nav>
                    <button><Link to={"/login"}>Login</Link></button>

                    <button onClick={() => setCarrinhoVisivel(!carrinhoVisivel)}>
                        Ver carrinho ({carrinho.length})
                    </button>

                    {carrinhoVisivel && (
                        <ul className="carrinho">
                            {carrinho.map((item, index) => (
                                <li key={index}>
                                    
                                    <h3><button onClick={() => diminuirCarrinho(item, index) }>-</button>{item.unidade} Unidades<button onClick={() => aumentarCarrinho(item, index)}>+</button></h3>
                                    
                                    {item.titulo} - R$ {item.preco}
                                </li>
                            ))}
                            <button onClick={fecharCarrinho}>Fechar carrinho</button>
                        </ul>
                    )}

                    <button onClick={sair}>Sair</button>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
