import { useParams } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import ProdutosContext from '../contextProdutos/ProdutosContext';
import { useContext, useState, useEffect } from "react";

function Detalhes() {
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
                <div>
                    <h1>{produtosFilter.titulo}</h1>
                    <p>Preço: R$ {produtosFilter.preco}</p>
                    <img src={produtosFilter.imagem} alt={produtosFilter.titulo} />
                    {/* Outras informações do produto */}
                </div>
            ) : (
                <h1>Carregando...</h1>
            )}


        </>
    );
}

export default Detalhes;
