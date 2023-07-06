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
  
  // **** SELECT INVOICE DATE ****
  
  let value
  const onInvoiceDateChanged = e => {
    invoiceData.trans_date = e.target.value
  }
  
  // **** SELECT INVOICE DATE ****
  
  // **** SELECT ITEMS TO BE INVOICED ****
  let orderedServices, orderedExpenses, orderedPayments
  if (client) {
    let services = client.charges.filter((charge) => {
      return charge.chargeType === 'task' && charge.invoiced === false
    })
    orderedServices = services.slice().sort((a, b) => a.date.localeCompare(b.date))
    
    let expenses = client.charges.filter((charge) => {
      return charge.chargeType === 'expense' && charge.invoiced === false
    })
    orderedExpenses = expenses.slice().sort((a, b) => a.date.localeCompare(b.date))
    
    let payments = client.payments.filter((payment) => {
      return payment.invoiced === false
    })
    orderedPayments = payments.slice().sort((a, b) => a.date.localeCompare(b.date))
  }
  // **** SELECT ITEMS TO BE INVOICED ****
  
  //  **** GENERATE INVOICE DATA ****
  let invoiceData = {}
    invoiceData.invoice_no = Math.floor(Math.random() * 90000) + 10000
    // invoiceData.trans_date = 'Please choose an Invoice date'
    invoiceData.name = `${client.firstName} ${client.lastName}`
    invoiceData.address1 = client.address
    invoiceData.address2 = `${client.city}, ${client.usState}, ${client.zip},`
    invoiceData.email = client.email 
    invoiceData.services = orderedServices
    invoiceData.expenses = orderedExpenses
    invoiceData.payments = orderedPayments
    
  //  **** GENERATE INVOICE DATA ****
  
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
        <div className="centered-view">
          <section className="centered-container">
            <div className="form-group">
              <label htmlFor="invoice date" >Invoice Date</label>
              <input
                type="date"
                className="form-control"
                value={value}
                onChange={onInvoiceDateChanged}
                />
                {invoiceData.trans_date ? 
                  <h2>{`Invoice Date: ${invoiceData.trans_date}`}</h2>
                  : null}
            </div>
              <div className="">
              {/* <h2>{`Invoice Date: ${invoiceData.trans_date}`}</h2> */}
              <p>{`${client.firstName} ${client.lastName}`}</p>
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
                    <th>Amount</th>
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
                        <td><button 
                          className='table-button'
                          onClick={() => handleDeleteCharge(charge.id)}><FontAwesomeIcon icon={faTrash}/></button>
                        </td>
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
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedExpenses.map((charge, i) => {
                    return (
                      <tr key={i}>
                        <td>{charge.date}</td>
                        <td>{charge.category}</td>
                        <td>{charge.total}</td>
                        <td><button className='table-button' onClick={() => handleDeleteCharge(charge.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
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
                        <td><button className='table-button' onClick={() => handleDeletePayment(payment.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <h4>Previous Balance: {client.balance ? `$${client.balance}` : '0'}</h4>
              <h4>Interest charges: </h4>
              {/* https://fiscal.treasury.gov/prompt-payment/interest.html */}
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}
