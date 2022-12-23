import React from 'react';

const ClientList = ({clientsToTrack}) => {
  return(
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
        </tr>
      </thead>
      <tbody>
        {clientsToTrack.map((client, i) => {
          return (
            <tr key={i+1}>
              <td>{i+1}</td>
              <td>{client}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ClientList;