import React from 'react'
import { Header, Message } from "semantic-ui-react";

export const Error = () => {
  // 404
  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> 404 </Header>
      </Message>
    </>
  )
}
export default Error;