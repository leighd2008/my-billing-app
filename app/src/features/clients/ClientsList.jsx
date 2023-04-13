import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { fetchClients } from '../../redux/components/Clients/clients.actions'

export const ClientsList = () => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients)
  // debugger
  
  useEffect(() => {
    dispatch(fetchClients())
  }, [dispatch])
  
  // const renderClients = clients.map(client => (
  //   <div key={client.id}>
  //     <h3>{`${client.firstName} ${client.lastName}`}</h3>
  //     <Link to={`/clients/${client.id}`}>View Client</Link>
  //   </div>
  // ))
  
  const navigate = useNavigate()
  
  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {
          clients.map(client =>
          <li
            key={client.id}
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <h3>{`${client.firstName} ${client.lastName}`}</h3>
          </li>
          )
        }
      </ul>
      {/* {renderClients} */}
    </div>
  )
  // return (
  //   <React.Fragment >
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Address</th>
  //           <th>City</th>
  //           <th>State</th>
  //           <th>Zip Code</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {clients.map((client, i) => {
  //           return (
  //             <tr key={i+1}>
  //               <td>{`${client.firstName} ${client.lastName}`}</td>
  //               <td>{client.address}</td>
  //               <td>{client.city}</td>
  //               <td>{client.state}</td>
  //               <td>{client.zip}</td>
  //             </tr>
  //           )
  //         })}
  //       </tbody>
  //     </table>
  //   </React.Fragment>
  // )
}
