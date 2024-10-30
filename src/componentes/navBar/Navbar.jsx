import { useContext, useId, useState } from "react";
import UserContext from "../pages/Context";
import "./Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function NavBar({db, app}){
    const { carrinho, setCarrinho } = useContext(UserContext);
    
    // Corrigindo o uso do useState para definir aparecer e setAparecer
    const [aparecer, setAparecer] = useState("sumir");
    
    const auth = getAuth(app)
    console.log(carrinho)


    function fecharCarrinho (){
        console.log("passou aqui")
        //verificar se tem algum usuário logado
        onAuthStateChanged(auth, (user) => {
                if (user) { //se tiver alguem logado, irá adicionar na tabela de compras
                const date = new Date();
            console.log(carrinho)
                    
                addDoc(collection(db, "compras"), {
                    data: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                    produtos: carrinho,
                    situacao: false,
                    proprietario: user.uid
                
                })
            } else {
                alert("Entre com um usuario para finalizar a comrpa")

            }
          });
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
    
    return(
        <>  
            <header>
                <div>
                    <h1>LOGO</h1>
                </div>


                <nav>
                    
                    <button><Link to={"/login"}>Login</Link> </button>

                    <h1 onClick={() => aparecer == "sumir" ? setAparecer("aparecer"): setAparecer("sumir")}> Carrinho ({carrinho.length})</h1>

                    <ul className={aparecer}> 
                        {carrinho.map((item, index) => (
                            <li key={index}>
                                <h3>{item.unidade} Unidades</h3>
                                {item.titulo} - R$ {item.preco}
                            </li>
                        ))}

                        <button onClick={fecharCarrinho}>Fechar carrinho</button>

                    </ul>
                    <button onClick={sair}>Sair</button>
                </nav>

            </header>
        </>
    )
}

export default NavBar;
