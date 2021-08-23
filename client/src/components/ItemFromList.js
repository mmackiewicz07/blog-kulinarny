import React from 'react'
import { Header, Message } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

export const ItemFromList = ({ _id, name, difficulty, duration, image }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/recipe/${_id}`)
  }

  return (
    <div style={{ maxWidth: '400px', padding: '0 15px', margin: '30px auto', cursor: 'pointer' }} onClick={onClick}>
      <Message>
        <div style={{ display: 'flex' }}>
          <img src={`/${image}`} alt="" width="100px" />
          <div style={{ marginLeft: '15px' }}>
            <Header size="medium">{name}</Header>
            <div style={{ display: 'flex',  flexDirection: 'column' }}>
              <p style={{ margin: '20px 0 20px 0' }}>Czas przygotowania: <strong>{duration} min</strong></p>
              <p style={{ margin: '0 0 0 0' }}>Stopień trudności: <strong>{difficulty} / 5</strong></p>
             </div>
          </div>
        </div>
      </Message>
    </div >
  )
}
export default ItemFromList;