import { useParams } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import ProdutosContext from '../contextProdutos/ProdutosContext';
import { useContext, useState, useEffect } from "react";
import UserContext from "./Context";
import "./Detalhes.css"

function Detalhes() {
    const { adCarrinho } = useContext(UserContext); // Consumir o contexto corretamente
    const { produtos } = useContext(ProdutosContext);
    const { id } = useParams(); // Extraindo o parâmetro `id` corretamente
    const [produtosFilter, setProdutosFilter] = useState(null);

    useEffect(() => {
        if (produtos.length > 0) {
            // Filtra o produto correspondente ao `id` recebido
            const produtoEncontrado = produtos.find((produto) => produto.id == id);
            setProdutosFilter(produtoEncontrado);
        }
    }, [produtos, id]); // Executa quando `produtos` ou `id` mudam

    return (
        <>
            <Navbar />


            {produtosFilter ? (
                <div className="produtoDetalhes">
                    <div className="produtoLeft">
                        <h2>{produtosFilter.titulo}</h2>
                        <img src={produtosFilter.imagem} alt={produtosFilter.titulo} />
                    </div>
                    
                    <div className="produtoRight">
                        <h2>R$ {produtosFilter.preco}</h2>
                        <button onClick={() => adCarrinho(produtosFilter)}>Adicionar ao Carrinho</button>
                    </div>
                    {/* Outras informações do produto */}
                </div>
            ) : (
                <h1>Carregando...</h1>
            )}


        </>
    );
}

export default Detalhes;
