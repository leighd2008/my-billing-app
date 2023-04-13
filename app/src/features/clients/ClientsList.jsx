import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchClients } from '../../redux/components/Clients/clients.actions'

export const ClientsList = () => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])
  
  return (
    <React.Fragment >
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
          {clients.map((client, i) => {
            return (
              <tr key={i+1}>
                <td>{`${client.firstName} ${client.lastName}`}</td>
                <td>{client.address}</td>
                <td>{client.city}</td>
                <td>{client.state}</td>
                <td>{client.zip}</td>
                <td><button onClick={() => navigate(`/clients/${client.id}`)}>View Client</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}
