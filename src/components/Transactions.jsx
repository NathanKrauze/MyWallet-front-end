import styled from "styled-components"

export default function Transactions({transaction}){
    const {value, description, type, date} = transaction;
    return (
        <ListItemContainer>
            <div>
              <span>{date}</span>
              <strong data-test='registry-name' >{description}</strong>
            </div>
            <Value color={type} data-test='registry-amount' >{value.toFixed(2).toString().replace('.', ',')}</Value>
        </ListItemContainer>
    )
}

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`