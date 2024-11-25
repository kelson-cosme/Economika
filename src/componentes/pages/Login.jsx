  import { useEffect, useState } from "react"

  import { initializeApp } from 'firebase/app';
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";

  import Bebela from "../../assets/bebela.webp"
  import Chico from "../../assets/chico.webp"
  import Mika from "../../assets/mika.webp"

  import "./Login.css"

  import { app,  } from '../firebaseConfig/firebaseConfig';

  const auth = getAuth(app);

      
  function Login(){

      const [email, setEmail] = useState("")
      const [senha, setSenha] = useState("")
      const navigate = useNavigate(); // Hook para navegação
  
      const [carregando, setCarregando] = useState("Entrar")

      // Entrar
      const handleLogin = async (event) => {
      event.preventDefault();  

      setCarregando("...")


      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        alert("Login feito com Sucesso")
        navigate("/")

      } catch (error) {
          console.log(error)
          setCarregando("Entrar")
          alert("Erro ao fazer Login")

      }
    };

      return(
          <>

            <div className="formPai">

              <img className="mika" src={Mika} alt="" />

              <img className="mascote bebela" src={Bebela} alt="" />

              <form onSubmit={handleLogin} className="formLogin">

                <div className="voltar"><Link to={"/"}>Voltar</Link></div>

                <h1>Login</h1>

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>

                <button onClick={handleLogin}>{carregando}</button>

                <p>Não tem acesso? <Link to={"/criarusuario"}>Crie aqui</Link> </p>
              </form>

              <img className="mascote chico" src={Chico} alt="" />

            </div>
              
          </>
      )
  }

  export default Login

  