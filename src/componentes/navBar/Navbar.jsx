

import { useContext, useId, useState } from "react";
import UserContext from "../pages/Context";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import Menos from "../../assets/menos.png"
import Mais from "../../assets/mais.png"


function NavBar({db, app}) {
    const { carrinho, setCarrinho } = useContext(UserContext);
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const auth = getAuth(app);
    function fecharCarrinho() {
        const user = auth.currentUser; // Verifica se há um usuário logado
        
        if (user && carrinho.length > 0) {
            // Somente executa a adição ao Firebase se o usuário estiver logado
            const date = new Date();
            addDoc(collection(db, "compras"), {
                data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                produtos: carrinho,
                situacao: false,
                proprietario: user.uid
            });
            alert("Compra finalizada com sucesso.");
        } else {
            alert("Carrinho vazio ou usuário não Autenticado");
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
                <div> <Link to={"/"}>LOGO</Link></div>
                <nav className="navegacao">
                    <button onClick={() => navigate("/login")} className="buttonUser">
                        <div className="user"></div>
                        <p>Login</p>
                    </button>

                    <button className="buttonSair" onClick={sair}>
                        <div className="sair"></div>
                        <p>Sair</p>
                    </button>

                    <button className="buttonCarrinho" onClick={() => setCarrinhoVisivel(!carrinhoVisivel)}>
                        <div className="cart"></div>                       
                        <p>Carrinho <strong>({carrinho.length})</strong> </p> 
                    </button>

                    {carrinhoVisivel && (
                        <ul className="carrinho">
                            {carrinho.map((item, index) => (
                                <li key={index}>
                                    
                                    <h3><button onClick={() => diminuirCarrinho(item, index) }> <img src={Menos} alt="" /> </button>{item.unidade} Unidades<button onClick={() => aumentarCarrinho(item, index)}> <img src={Mais} alt="" /> </button></h3>
                                    
                                    {item.titulo} - R$ {item.preco}
                                </li>
                            ))}

                            {carrinho.length > 0 ? <button className="fecharCarrinho" style={{display: "block"}} onClick={fecharCarrinho}>Fechar carrinho</button> : <button style={{display: "none"}} onClick={fecharCarrinho}>Fechar carrinho</button>}
                            
                        </ul>
                    )}

                    <button onClick={() => navigate("/compras")} className="buttonBag">
                        <div className="bag"></div>    
                        <p>Compras</p>
                    </button>
               
                </nav>
            </header>
        </>
    );
}

export default NavBar;
