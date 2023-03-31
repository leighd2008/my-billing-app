import React from 'react'
import { useSelector } from 'react-redux'

export const ClientsList = () => {
  const clients = useSelector(state => state.clients)
  
  return (
    <React.Fragment >
      <h2>Clients</h2>
      {clients.map((client, i) => (
        <h3 key={i}>{client.name}</h3>
      ))}
    </React.Fragment>
  )
}
