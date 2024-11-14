import { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
};

// Inicializando o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Criando o contexto
const ProdutosContext = createContext();

// Componente do provedor de contexto
export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function getProdutos() {
      try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        const produtosArray = [];
        querySnapshot.forEach((doc) => {
          produtosArray.push({ ...doc.data(), unidade: 1 });
        });
        setProdutos(produtosArray);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    getProdutos();
  }, []);

  return (
    <ProdutosContext.Provider value={{ produtos }}>
      {children}
    </ProdutosContext.Provider>
  );
}

export default ProdutosContext;
