import { useEffect, useState } from "react"

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
  };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


function Login(){

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    
    const [carregando, setCarregando] = useState("Entrar")

     // Entrar
    const handleLogin = async (event) => {
    event.preventDefault();  

    setCarregando("...")


    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log(user)
    } catch (error) {
        console.log(error)

        setCarregando("Entrar")
    }
  };


    // Sair
    function sair(){
        signOut(auth).then(() => {
            console.log("Sign-out successful")
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            
          });
    }
    


    return(
        <>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>

            <button type="submit">{carregando}</button>

            </form>

        </>
    )
}

export default Login