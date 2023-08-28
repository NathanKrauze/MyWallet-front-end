import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios";


export default function SignUpPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const signupInfo = {name, email, password}

  function sendRegistration(e){
    e.preventDefault()


    if(password === confirmPassword){
      axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, signupInfo)
        .then(navigate('/'))
        .catch(err => {alert(err.response.data)});
    } else {
      alert('Confirm your password again!')
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={sendRegistration}>
        <MyWalletLogo />
        <input 
          placeholder="Nome" 
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}/>
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
          onChange={e => setPassword(e.target.value)}/>
        <input 
          placeholder="Confirme a senha" 
          type="password" 
          autocomplete="new-password"
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
