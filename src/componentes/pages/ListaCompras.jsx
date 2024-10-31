import { initializeApp } from "firebase/app";
import NavBar from "../navBar/Navbar"
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import "./ListaCompras.css"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);



function ListaCompras(){

    const [listaCompras, setListaCompras] = useState([]); // Inicializando como um array vazio

    useEffect(() => {

        async function getProdutos() {
            const querySnapshot = await getDocs(collection(db, "compras"));
            let produtosCompras = []; // Array para armazenar os documentos
            
            querySnapshot.forEach((doc) => {
                produtosCompras.push({ ...doc.data(), unidade: 1 }); // Adiciona cada documento com a quantidade inicial de 1
            }); 

            setListaCompras(produtosCompras); // Atualiza o estado com o array completo
        }
        getProdutos();   
    }, []);

    return(
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
                            {console.log(e)}
                        </li>
                    
                    ))
                }
            </ul>        
                

        </>
    )
}

export default ListaCompras