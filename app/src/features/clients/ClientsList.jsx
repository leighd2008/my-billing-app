import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'

import { selectAllClients, fetchClients } from './clientsSlice'

export const ClientsList = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients)
  const navigate = useNavigate()
  
  const clientsStatus = useSelector(state => state.clients.status)
  const error = useSelector(state => state.clients.error)
  
  const ClientInfo = ({ orderedClients }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {orderedClients.map((client, i) => {
            console.log(client)
            return (
              <tr key={i+1}>
                <td>{`${client.firstName} ${client.lastName}`}</td>
                <td>{client.address}</td>
                <td>{client.city}</td>
                <td>{client.usState}</td>
                <td>{client.zip}</td>
                <td><button onClick={() => navigate(`/clients/${client.id}`)}>View</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  
  useEffect(() => {
    if (clientsStatus === 'idle'){
      dispatch(fetchClients())
    }
  }, [clientsStatus, dispatch])
  
  let content
  
  if (clientsStatus === 'loading') {
    content = <Spinner text='loading...' />
  } else if (clientsStatus === 'succeeded') {
    
    const orderedClients = clients.slice().sort((a, b) =>
      a.lastName.localeCompare(b.lastName))
    console.log(orderedClients)
    
    content = (<ClientInfo orderedClients={orderedClients} />)
  } else if (clientsStatus === 'failed') {
    content = <div>{error}</div>
  }
    
  return (
    <React.Fragment >
      {content}
    </React.Fragment>
  )
}
