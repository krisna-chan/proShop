import { Alert } from "react-bootstrap";

import React from 'react'

const Message = ({varient,children}) => {
  return (
    <Alert variant={varient}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
    varient : 'info',};
    
export default Message