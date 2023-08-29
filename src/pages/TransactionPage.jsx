import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthConstext";
import axios from "axios";

export default function TransactionsPage() {
  const [transactionValue, setTransactionValue] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/');
    }
  
  }, [])

  const params = useParams();
  let textType;
  if (params.tipo === 'saida'){
    textType = 'saída';
  }else{
    textType = 'entrada';
  };

  function sendTransaction(e){
    e.preventDefault();

    const auth = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    let value = transactionValue;
    value = parseFloat(value.replace(',','.'))
      

    const transaction = {value, description, type: params.tipo};
    axios.post(`${import.meta.env.VITE_API_URL}/add-transaction`, transaction, auth)
      .then(navigate('/home'))
      .catch(err => alert(err.response.data));
  }

  return (
    <TransactionsContainer>
      <h1>Nova {textType}</h1>
      <form onSubmit={sendTransaction}>
        <input 
          placeholder="Valor" 
          type="text"
          value={transactionValue}
          onChange={e => setTransactionValue(e.target.value)}
          data-test='registry-amount-input' />
        <input 
          placeholder="Descrição" 
          type="text" 
          value={description}
          onChange={e => setDescription(e.target.value)}
          data-test='registry-name-input' />
        <button type="submit"data-test='registry-save' >Salvar {textType}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
