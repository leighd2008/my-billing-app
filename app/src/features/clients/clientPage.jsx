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
  
  const orderedCharges = client.charges.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  const orderedPayments = client.payments.slice().sort((a, b) => a.date.localeCompare(b.date))
  
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
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedPayments.map((payment, i) => {
                    return (
                      <tr key={i}>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <h3>Charges</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Staff</th>
                    <th>Rate</th>
                    <th>Hours</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedCharges.map((charge, i) => {
                    return (
                      <tr key={i}>
                        <td>{charge.date}</td>
                        <td>{charge.category}</td>
                        <td>{charge.user}</td> 
                        <td>{charge.rate}</td>
                        <td>{charge.hours}</td>
                        <td>{charge.total}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <p>Balance: {client.balance ? `${client.balance}` : '0'}</p>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}
