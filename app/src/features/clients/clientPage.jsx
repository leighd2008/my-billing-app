import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


import { selectClientById, fetchClients, deleteCharge, deletePayment } from './clientsSlice'

export const ClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const client = useSelector(state => selectClientById(state, clientId))
  const clientStatus = useSelector(state => state.clients.status)
  
  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])
  
  if (!client) {
    return (
      <React.Fragment >
        <h2>Client not found</h2>
      </React.Fragment>
    )
  }
  
  let services = client.charges.filter((charge) => {
    return charge.chargeType === 'task'
  })
  
  let expenses = client.charges.filter((charge) => {
    return charge.chargeType === 'expense'
  })
  
  const orderedServices = services.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  const orderedExpenses = expenses.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  const orderedPayments = client.payments.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  const handleDeleteCharge =  (chargeId) => {
    let charges = client.charges.filter((charge) => {
      return charge.id !== chargeId
    })
    let data = {}
    data.charges = charges
    data.id = client.id
    dispatch(deleteCharge(data))
  }
  
  const handleDeletePayment =  (paymentId) => {
    let payments = client.payments
    payments = client.payments.filter((payment) => {
      return payment.id !== paymentId
    })
    let data = {}
    data.payments = payments
    data.id = client.id
    dispatch(deletePayment(data))
  }
  
  return (
    <React.Fragment >
      <section className="section">
      <FontAwesomeIcon icon={faTrash} />
        <div className="centered-view">
          <section className="centered-container">
            <div className="">
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
              <p>{`${client.address}`}</p>
              <p>{`${client.city}, ${client.usState} ${client.zip}`}</p>
              <button onClick={() => navigate(`/editClient/${client.id}`)}>Edit Info</button>
              <h3>Professional Services</h3>
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
                  {orderedServices.map((charge, i) => {
                    return (
                      <tr key={i}>
                        <td>{charge.date}</td>
                        <td>{charge.category}</td>
                        <td>{charge.user}</td> 
                        <td>{charge.rate}</td>
                        <td>{charge.hours}</td>
                        <td>{charge.total}</td>
                        <td><button onClick={() => handleDeleteCharge(charge.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <h3>Additional Charges</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedExpenses.map((charge, i) => {
                    return (
                      <tr key={i}>
                        <td>{charge.date}</td>
                        <td>{charge.category}</td>
                        <td>{charge.total}</td>
                        <td><button onClick={() => handleDeleteCharge(charge.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
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
                        <td><button onClick={() => handleDeletePayment(payment.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
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
