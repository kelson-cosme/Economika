import { useContext, useState } from "react";
import UserContext from "../pages/Context";
import "./Navbar.css";

function NavBar(){
    const { carrinho } = useContext(UserContext);
    
    // Corrigindo o uso do useState para definir aparecer e setAparecer
    const [aparecer, setAparecer] = useState("sumir");

    return(
        <>  
            <header>
                <div>
                    <h1>LOGO</h1>
                </div>

                <nav>
                    <h1 onClick={() => aparecer == "sumir" ? setAparecer("aparecer"): setAparecer("sumir")}> Carrinho ({carrinho.length})</h1>

                    <ul className={aparecer}> 
                        {carrinho.map((item, index) => (
                            <li key={index}>
                                <h3>{item.unidade} Unidades</h3>
                                {item.titulo} - R$ {item.preco}
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar;
