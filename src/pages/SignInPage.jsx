import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios";
import AuthContext from "../contexts/AuthConstext";

export default function SignInPage() {

  const { setToken } = useContext(AuthContext)

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginInfo = {email, password}

  function sendLogin(e){
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, loginInfo)
      .then(res => {
        setToken(res.data);
        localStorage.setItem("token", res.data);
        navigate('/home');
      }).catch(err => alert(err.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={sendLogin}>
        <MyWalletLogo />
        <input 
          placeholder="E-mail" 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        <input 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
