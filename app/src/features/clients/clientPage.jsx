import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { selectClientById } from './clientsSlice'

export const ClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const client = useSelector(state => selectClientById(state, clientId))
  
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
        <div className="centered-view">
          <section className="centered-container">
            <div className="">
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
              <p>{`${client.address}`}</p>
              <p>{`${client.city}, ${client.usState} ${client.zip}`}</p>
              <button onClick={() => navigate(`/editClient/${client.id}`)}>Edit Info</button>
              <h3>Payments</h3>
              {console.log(`payments: ${client.payments.length}`)}
              {/* {client.payments.map((payment, i) => {
                return (
                <p>{`${payment.date}: $${payment.amount}`}</p>
              )})} */}
              <h3>Charges</h3>
              {client.charges.map((charge, i) => {
                  console.log(charge)
                return (
                <p key={i}>{`${charge.date}: ${charge.category} ${charge.user} ${charge.hours} ${charge.rate} `}</p>
              )})}
              <p>Balance: {client.balance ? `${client.balance}` : '0'}</p>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}
