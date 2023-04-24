import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { selectClientById } from './clientsSlice'

export const ClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const client = useSelector(state => selectClientById(state, clientId))
    
  // debugger
  
  // useEffect(() => {
  //   dispatch(fetchClients())
  // }, [dispatch])
  
  if (!client) {
    return (
      <React.Fragment >
        <h2>Client not found</h2>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment >
      <section className="section">
        <div className="container">
          <section className="hero is-danger">
            <div className="hero-body">
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
              <p>{`${client.address}`}</p>
              <p>{`${client.city}, ${client.usState} ${client.zip}`}</p>
              <button onClick={() => navigate(`/editClient/${client.id}`)}>Edit Info</button>
              <p>Balance: {client.balance ? `${client.balance}` : '0'}</p>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}
