import { useContext } from "react";
import UserContext from "./Context";

function Teste() {
    const { carrinho, setCarrinho } = useContext(UserContext);

    const alterarUser = () => {
        setCarrinho('Novo Usuário'); // Altere para o valor desejado
    };

    return (
        <>
            <p>{carrinho}</p>
            <button onClick={alterarUser}>Alterar Usuário</button>
        </>
    );
}

export default Teste;
