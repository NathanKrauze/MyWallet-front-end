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
  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(()=>{
    const auth = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, auth)
      .then(res => setTransactions(res.data))
      .catch(err => alert(err.response));
  },[]);

  function newTransaction(transactionType){
    navigate(`/nova-transacao/${transactionType}`)
  }

  let balance;
  function userBalance(){
    balance = transactions.reduce((acc, cur)=> cur.type === 'entrada' ? acc + cur.value : acc - cur.value, 0);
    return balance.toFixed(2);
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction => <Transactions key={transaction._id} transaction={transaction}/>)}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={userBalance() >= 0 ? "positivo" : "negativo"}>{userBalance().toString().replace('.', ',')}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>

        <button onClick={()=>newTransaction('entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>newTransaction('saida')}>
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
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
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