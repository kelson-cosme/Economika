import { useEffect, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';

import ProdutosContext from '../contextProdutos/ProdutosContext';

import UserContext from "./Context";
import NavBar from '../navBar/Navbar';

import "./Home.css"
import Banner from '../banner/Banner';


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
    const { setCarrinho } = useContext(UserContext);

    const [slidesPerView, setSlidesPerView] = useState(3)

    const { produtos } = useContext(ProdutosContext);


    
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 720) {
                setSlidesPerView(1);
            } else if (window.innerWidth >= 720 && window.innerWidth < 1023) {
                setSlidesPerView(3);
            } else {
                setSlidesPerView(4);
            }
        }
    
        // Chama handleResize para atualizar o estado na montagem
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
                {/* <Banner /> */}
            </main>


            <section className='maisVendidos'>
                <h1>Mais Vendidos</h1>
                {produtos.length > 0 ? (
                    <Swiper slidesPerView={slidesPerView} pagination={{ clickable: true }} navigation>
                    {produtos.map((doc, key) => (
                        <SwiperSlide key={doc.id}>

                        <div className='itens'>
                            <Link to={`detalhes/${doc.titulo}/${doc.id}`}>
                                <div className='imagemTamanho'>
                                    <img src={doc.imagem} alt="" />
                                </div>

                                <h1>{doc.titulo}</h1>

                                <p>R$ {doc.preco}</p>
                            </Link>
                            
                            <button onClick={ () => adCarrinho(key)}>
                                Adicionar ao carrinho
                            </button>
                        </div>

                        </SwiperSlide>
                    ))}
                    </Swiper>
                ) : (
                    <p>Carregando produtos...</p>
                )}
            </section>
        </>
    );
}
export default Home;

