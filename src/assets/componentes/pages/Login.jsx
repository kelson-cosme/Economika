import { useEffect, useState } from "react"

function Login(){

    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")

    function enviar(){
        console.log(cpf, senha)
    }

    return(
        <>
            <form >
                <input type="cpf" onChange={(e) => setCpf(e.target.value)} />
                <input type="password" onChange={(e) => setSenha(e.target.value)}/>
            </form>

            <button onClick={enviar}>ENVIAR</button>
        </>
    )
}

export default Login