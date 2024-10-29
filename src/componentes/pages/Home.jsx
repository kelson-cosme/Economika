import { useEffect, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';

import UserContext from "./Context";
import NavBar from '../navBar/Navbar';

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

function Home() {
    const { carrinho, setCarrinho } = useContext(UserContext);
    

    const [produtos, setProdutos] = useState([]); // Inicializando como um array vazio
    // const [carrinho, setCarrinho] = useState([]); // Estado para o carrinho

    const [listaCompras, setListaCompras] = useState([])// A lista de compras

    useEffect(() => {
        async function getProdutos() {
            const querySnapshot = await getDocs(collection(db, "produtos"));
            let produtosArray = []; // Array para armazenar os documentos
            
            querySnapshot.forEach((doc) => {
                produtosArray.push({ ...doc.data(), unidade: 1 }); // Adiciona cada documento com a quantidade inicial de 1
            }); 

            setProdutos(produtosArray); // Atualiza o estado com o array completo
        }
        getProdutos();   
    }, []);

    function adCarrinho(key) {
        const produtoSelecionado = produtos[key];

        setCarrinho((prevCarrinho) => {
            const itemExistente = prevCarrinho.find((item) => item.titulo === produtoSelecionado.titulo);
            
            if (itemExistente) {
                // Atualiza a unidade do item existente
                return prevCarrinho.map((item) => 
                    item.titulo === produtoSelecionado.titulo 
                        ? { ...item, unidade: item.unidade + 1 }
                        : item
                );
            } else {
                // Adiciona o produto como um novo item no carrinho
                return [...prevCarrinho, { ...produtoSelecionado, unidade: 1 }];
            }
        });
    }

    function comprasFeitas(){
        setListaCompras(carrinho)

        console.log(listaCompras)
    }

    return (
        <>
            <NavBar />
            {produtos.length > 0 ? (
                produtos.map((doc, key) => (
                    <div key={key}>
                        <Link to={`detalhes/${doc.titulo}/${doc.id}`}>
                            <h1>{doc.titulo}</h1>
                            <p>R$ {doc.preco}</p>
                        </Link>

                        <button onClick={() => adCarrinho(key)}> 
                            Adicionar ao carrinho
                        </button>
                    </div>
                ))
            ) : (
                <p>Carregando produtos...</p>
            )}
            
            <h1>Itens no Carrinho: {carrinho.length}</h1>

            <button onClick={comprasFeitas}>Compre Agora</button>

            <h1>Lista de compras</h1>
            
            {listaCompras.map( (e, index) => 
                <div key={index}>
                    <h1>{e.unidade} - {e.titulo} - {e.preco}</h1>
                </div>
            )}
        </>
    );
}

export default Home;
