import { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import UserContext from "./Context";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function CriarUsuario() {
    const { user, setUser } = useContext(UserContext);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")



    const criarUsuario = async () => {
        event.preventDefault();  

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        
        const userId = userCredential.user.uid;

        // Armazenar dados adicionais no Firestore
        await setDoc(doc(db, "usuarios", userId), {
          cpf: cpf,
          telefone: telefone,
          email: email
        });

        // console.log("Successfully created new user:", userId);
        
        setSuccess("Usuário criado com sucesso!");

      } catch (error) {
        console.error("Error creating new user:", error);
        setError(error.message);
      }
    };

    // criarUsuario();

  return (
    <>
      <h1>Criar Usuário</h1>
        <h1>{user}</h1>
        <form action="" onSubmit={criarUsuario}>
            <input onChange={(e) => setEmail(e.target.value)} type="gmail" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="number" onChange={(e) => setCpf(e.target.value)} />
            <input type="number" onChange={(e) => setTelefone(e.target.value)} />

            <button type="submit">Criar Usuário</button>
        </form>

        {success ? `${success}` : error && error}

      {/* {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}
    </>
  );
}

export default CriarUsuario;
