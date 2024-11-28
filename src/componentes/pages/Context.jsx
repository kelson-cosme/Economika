import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    // Função global para adicionar itens ao carrinho
    const adCarrinho = (produto) => {
        setCarrinho((prevCarrinho) => {
            const itemExistente = prevCarrinho.find((item) => item.titulo === produto.titulo);

            if (itemExistente) {
                // Atualiza a unidade do item existente
                return prevCarrinho.map((item) =>
                    item.titulo === produto.titulo
                        ? { ...item, unidade: item.unidade + 1 }
                        : item
                );
            } else {
                // Adiciona o produto como um novo item no carrinho
                return [...prevCarrinho, { ...produto, unidade: 1 }];
            }
        });

        alert("Item adicionado com sucesso...")
    };

    return (
        <UserContext.Provider value={{ carrinho, setCarrinho, adCarrinho }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
