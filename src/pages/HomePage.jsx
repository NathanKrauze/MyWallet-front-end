import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../contexts/AuthConstext"
import axios from "axios"
import Transactions from "../components/Transactions"

export default function HomePage() {
  const[transactions, setTransactions] = useState([]);
  const {token, setToken, userName} = useContext(AuthContext);

  const navigate = useNavigate();

  const auth = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  useEffect(()=>{

    if(!token){
      return navigate('/');
    }

    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, auth)
      .then(res => {setTransactions(res.data)})
      .catch(err => alert(err.response.data));
  },[]);

  function newTransaction(transactionType){
    navigate(`/nova-transacao/${transactionType}`)
  }

  let balance;
  function userBalance(){
    balance = transactions.reduce((acc, cur)=> cur.type === 'entrada' ? acc + cur.value : acc - cur.value, 0);
    return balance.toFixed(2);
  }

  function signOut(){
    axios.delete(`${import.meta.env.VITE_API_URL}/sign-out`, auth)
      .then(()=>{
        localStorage.removeItem("token")
        setToken(undefined)
        navigate('/');
      })
      .catch(err => alert(err.response.data))
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, <span data-test='user-name' >{userName}</span></h1>
        <BiExit onClick={signOut} data-test='logout' />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction => <Transactions key={transaction._id} transaction={transaction}/>)}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={userBalance() >= 0 ? "positivo" : "negativo"} data-test='total-amount' >{userBalance().toString().replace('.', ',')}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>

        <button onClick={()=>newTransaction('entrada')}data-test='new-income' >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>newTransaction('saida')}data-test='new-expense' >
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul{
    height: 100%;
    overflow-y: scroll;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`