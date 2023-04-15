import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

// import { fetchClients } from '../../redux/components/Clients/clients.actions'

export const ClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const client = useSelector(state => 
    state.clients.find(client => client.id === clientId)
    )
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
      <div>
        <h2>{`${client.firstName} ${client.lastName}`}</h2>
        <button onClick={() => navigate(`/editClient/${client.id}`)}>Edit Client</button>
      </div>
    </React.Fragment>
  )
}
