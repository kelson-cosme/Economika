import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "../navBar/Navbar";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // para redirecionamento

import "./ListaCompras.css";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

function ListaCompras() {
    const [listaCompras, setListaCompras] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        // Verificar autenticação e buscar compras do usuário
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/login"); // Redirecionar para a página de login se não estiver autenticado
            } else {
                await fetchCompras(user.uid); // Carregar dados do usuário autenticado
            }
            setIsLoading(false);
        });
    }, []);

    async function fetchCompras(uid) {
        // Cria uma query para buscar somente as compras do usuário autenticado
        const comprasQuery = query(collection(db, "compras"), where("proprietario", "==", uid));
        const querySnapshot = await getDocs(comprasQuery);
        let produtosCompras = [];
        
        querySnapshot.forEach((doc) => {
            produtosCompras.push({ ...doc.data(), unidade: 1 });
        });

        setListaCompras(produtosCompras);
    }

    if (isLoading) {
        return <p>Carregando...</p>; // Mensagem de carregamento
    }

    return (
        <>
            <NavBar />

            <ul className="titulosListaCompras">
                <li>Data da Compra</li>
                <li>N° Único</li>
                <li>Valor Nota</li>
                <li>Situação</li>
            </ul>

            <ul>
                {listaCompras &&
                    listaCompras.map((e, index) => (
                        <li key={index}>
                            {e.data}
                            {e.proprietario}
                            {e.situacao ? "Ativo" : "Inativo"}
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default ListaCompras;

