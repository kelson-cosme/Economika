import { useEffect, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';

import UserContext from "./Context";
import NavBar from '../navBar/Navbar';

import "./Home.css"

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

    
    return (
        <>
            <NavBar db={db} app={app} />



            <main className='banner'>

            </main>


            <section className='maisVendidos'>
            <h1>Mais Vendidos</h1>

                {produtos.length > 0 ? (
                    <Swiper slidesPerView={3} pagination={{ clickable:true }} navigation>
                        {produtos.map( (doc, key) => (
                                <SwiperSlide key={doc.id}>
                                <div className='itens' key={key}>
                                    <Link to={`detalhes/${doc.titulo}/${doc.id}`}>
                                        <img src={doc.imagem} alt="" />
                                        <h1>{doc.titulo}</h1>
                                        <p>R$ {doc.preco}</p>

                                    </Link>

                                    <button onClick={() => adCarrinho(key)}> 
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                                </SwiperSlide>
                                )
                            )
                        }
                    </Swiper>
                ) : (
                    <p>Carregando produtos...</p>
                )}
            </section>
        </>
    );
}

export default Home;


