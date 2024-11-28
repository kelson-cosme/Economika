import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { app, db } from '../firebaseConfig/firebaseConfig';
import ProdutosContext from '../contextProdutos/ProdutosContext';
import UserContext from "./Context";
import NavBar from '../navBar/Navbar';

import { motion } from "motion/react"

import "./Home.css";

function Home() {
    const [slidesPerView, setSlidesPerView] = useState(3);
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

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <NavBar db={db} app={app} />
            <main className='banner'></main>

            <section className='maisVendidos'>
                <h1>Mais Vendidos</h1>

                    {produtos.length > 0 ? (
                        <Swiper slidesPerView={slidesPerView} pagination={{ clickable: true }} navigation>
                            {produtos.map((doc) => (
                                <SwiperSlide key={doc.id}>
                                    <div className='itens'>
                                        <Link to={`detalhes/${doc.titulo}/${doc.id}`}>
                                            <div className='imagemTamanho'>
                                                <img src={doc.imagem} alt="" />
                                            </div>

                                            <h1>{doc.titulo}</h1>
                                            <p>R$ {doc.preco}</p>
                                        </Link>
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
