import { useContext } from "react";
import UserContext from "./Context";

function Teste() {
    const { user, setUser } = useContext(UserContext);

    const alterarUser = () => {
        setUser('Novo Usuário'); // Altere para o valor desejado
    };

    return (
        <>
            <p>{user}</p>
            <button onClick={alterarUser}>Alterar Usuário</button>
        </>
    );
}

export default Teste;
