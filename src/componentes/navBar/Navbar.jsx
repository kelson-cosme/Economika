
import { useContext, useState } from "react";
import UserContext from "../pages/Context";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { app, db } from '../firebaseConfig/firebaseConfig';

import Menos from "../../assets/menos.png";
import Mais from "../../assets/mais.png";
import Logo from "../../assets/logo_EconoMika.png"

function NavBar() {
    const { carrinho, setCarrinho, adCarrinho } = useContext(UserContext); // Inclui adCarrinho
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth(app);

    function fecharCarrinho() {

        const user = auth.currentUser;
        if (user && carrinho.length > 0) {
            const date = new Date();
    
            try {
                const comprasRef = collection(db, "compras"); // Referência válida ao Firestore
                addDoc(comprasRef, {
                    data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    produtos: carrinho,
                    situacao: false,
                    proprietario: user.uid,
                });
    
                alert("Compra finalizada com sucesso.");
            } catch (error) {
                console.error("Erro ao salvar compra:", error);
                alert("Erro ao finalizar a compra. Tente novamente.");
            }
        } else {
            alert("Carrinho vazio ou usuário não autenticado");
        }
    }

    function sair() {
        signOut(auth)
            .then(() => {
                alert("Saída bem-sucedida");
                navigate("/");
            })
            .catch((error) => {
                console.error("Erro ao sair:", error);
            });
    }

    function diminuirCarrinho(item, index) {
        const novoCarrinho = carrinho
            .map((carrinhoItem, i) =>
                i === index
                    ? { ...carrinhoItem, unidade: carrinhoItem.unidade - 1 }
                    : carrinhoItem
            )
            .filter((carrinhoItem) => carrinhoItem.unidade > 0); // Remove itens com unidade 0
        setCarrinho(novoCarrinho);
    }

    return (
        <>

            <header>
                <div className="logo">
                    <Link to={"/"}>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <nav className="navegacao">
                    {auth.currentUser == null ? (
                        <button onClick={() => navigate("/login")} className="buttonUser">
                            <div className="user"></div>
                            <p>Login</p>
                        </button>
                    ) : (
                        console.log("nenhum usuário logado")
                    )}

                    {auth.currentUser && (
                        <button className="buttonSair" onClick={sair}>
                            <div className="sair"></div>
                            <p>Sair</p>
                        </button>
                    )}

                    <button
                        className="buttonCarrinho"
                        onClick={() => setCarrinhoVisivel(!carrinhoVisivel)}
                    >
                        <div className="cart"></div>
                        <p>
                            Carrinho <strong>({carrinho.length})</strong>{" "}
                        </p>
                    </button>

                    {carrinhoVisivel && (
                        <ul className="carrinho">
                            {carrinho.map((item, index) => (
                                <li key={index}>
                                    <h3>
                                        <button onClick={() => diminuirCarrinho(item, index)}>
                                            <img src={Menos} alt="" />
                                        </button>

                                            <div className="miniCarrinho">
                                                <img className="miniProduto" src={item.imagem} alt="" />
                                                    {item.titulo}   <br />
                                                    {/* R$ {item.preco} <br /> */}
                                                    {item.unidade} Unidades 

                                            </div>
                                            
                                        <button onClick={() => adCarrinho(item)}>
                                            <img src={Mais} alt="" />
                                        </button>
                                    </h3>
                                </li>
                            ))}

                            {carrinho.length > 0 ? (
                                <button
                                    className="fecharCarrinho"
                                    style={{ display: "block" }}
                                    onClick={fecharCarrinho}
                                >
                                    Fechar carrinho
                                </button>
                            ) : (
                                <button style={{ display: "none" }} onClick={fecharCarrinho}>
                                    Fechar carrinho
                                </button>
                            )}
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
