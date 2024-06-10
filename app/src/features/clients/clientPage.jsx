import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import ROUTES from "Constants/routes";
import { selectClientById, fetchClients, deleteCharge, deletePayment, addInvoice, addSummary } from './clientsSlice'

export const ClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const client = useSelector(state => selectClientById(state, clientId))
  const clientStatus = useSelector(state => state.clients.status)
  
  if (!client) {
    return (
      <React.Fragment >
        <h2>Client not found</h2>
      </React.Fragment>
    )
  }
  
  // **** PAST INVOICES ****
  
  const { handleSubmit } = useForm();
  
  let pastInvData
  let pastInvoices = []
  let lastInvoice
  let nextLastInvoice
  let pastInvoicesContent
  
  if (client.invoices.length > 0) {
    pastInvoices = client.invoices.slice().sort((a,b) => a.trans_date.localeCompare(b.trans_date))
    lastInvoice = pastInvoices[pastInvoices.length-1]
    nextLastInvoice = pastInvoices[pastInvoices.length-2]
  } 
  
  let orderedCharges
  let lastChargeDate
  
  if (client.charges.length > 0) {
    orderedCharges = client.charges.slice().sort((a,b) => a.date.localeCompare(b.date))
    lastChargeDate = orderedCharges[orderedCharges.length-1].date
  } 
  
  let pastInvoice
  
  const onPastInvoicesChanged = e => {
    pastInvData = (pastInvoices.filter((invoice, i) => {
      return invoice.invoice_no === Number(e.target.value)
    })[0])
    
    navigate(ROUTES.INVOICE, {state: {clientId: clientId, invoiceDate: invoiceDate, invoiceData: pastInvData}})
  }
  
  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])
  
  // **** PAST INVOICES ****
  
  // **** SELECT INVOICE DATE ****
  let curr = new Date()
  curr.setDate(curr.getDate())
  const [invoiceDate, setInvoiceDate] = useState(curr.toISOString().substring(0,10))
  
  const onInvoiceDateChanged = e => {
    setInvoiceDate(e.target.value)
    invoiceData.trans_date = invoiceDate
  }
  
  // **** SELECT INVOICE DATE ****
  
  // **** SELECT ITEMS TO BE INVOICED ****
  let orderedServices, orderedExpenses, orderedPayments, orderedCredits
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
      return payment.creditType === 'payment' && payment.invoiced === false
    })
    orderedPayments = payments.slice().sort((a, b) => a.date.localeCompare(b.date))
    
    let credits = client.payments.filter((payment) => {
      return payment.creditType === 'credit' && payment.invoiced === false
    })
    orderedCredits = credits.slice().sort((a, b) => a.date.localeCompare(b.date))
  }
  // **** SELECT ITEMS TO BE INVOICED ****
  
    //  **** GENERATE INVOICE / SUMMARY DATA ****
    

  let invoiceData = {}
    invoiceData.trans_date = invoiceDate
    invoiceData.invoice_no = Math.floor(Math.random() * 90000) + 10000
    // invoiceData.trans_date = 'Please choose an Invoice date'
    invoiceData.name = `${client.firstName} ${client.lastName}`
    invoiceData.summaryName = `${client.lastName}, ${client.firstName}`
    invoiceData.address1 = client.address
    invoiceData.address2 = `${client.city}, ${client.usState}, ${client.zip},`
    invoiceData.email = client.email 
    invoiceData.prevBalance = Number(client.balance).toFixed(2)
    invoiceData.services = orderedServices
    invoiceData.expenses = orderedExpenses
    invoiceData.payments = orderedPayments
    invoiceData.credits = orderedCredits
    invoiceData.totalHours = orderedServices.map(item => item.hours * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    invoiceData.totalServices = orderedServices.map(item => item.hours * item.rate).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    invoiceData.totalExpenses = orderedExpenses.map(item => item.fee * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    invoiceData.totalPayments = orderedPayments.map(item => item.amount * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    invoiceData.totalCredits = orderedCredits.map(item => item.amount * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    invoiceData.totalAdjustments = invoiceData.totalPayments + invoiceData.totalCredits
    nextLastInvoice ? invoiceData.prevInterest = nextLastInvoice.interestCharges : invoiceData.prevInterest = 0.00
    lastInvoice ? invoiceData.prevStartBalance = lastInvoice.prevBalance : invoiceData.prevStartBalance = 0.00
    let interestRate = (0.12/12)
    invoiceData.interestCharges = ((invoiceData.prevStartBalance-invoiceData.prevInterest)*interestRate).toFixed(2)
    invoiceData.balance = (invoiceData.prevBalance - invoiceData.totalAdjustments + +invoiceData.interestCharges + invoiceData.totalServices + invoiceData.totalExpenses).toFixed(2)
    invoiceData.totalCharges = (invoiceData.totalServices + invoiceData.totalExpenses).toFixed(2)

  //  **** GENERATE INVOICE / SUMMARY DATA ****
    
  //  **** GENERATE SUMMARY ****  
  const onSubmitSummary = async (data) => {
    let summary = {}
    data.id = clientId
    summary.id = clientId
    summary.name = invoiceData.summaryName
    summary.lastBill = lastInvoice ? lastInvoice.trans_date : ""
    summary.lastCharge = lastChargeDate ? lastChargeDate : ""
    summary.fees = invoiceData.totalServices
    summary.costs = invoiceData.totalExpenses
    summary.hours = invoiceData.totalHours
    summary.interest = invoiceData.interestCharges
    summary.payments = invoiceData.totalPayments
    summary.credits = invoiceData.totalCredits
    summary.priorBalance = invoiceData.prevBalance
    summary.newCharges = invoiceData.totalCharges
    summary.newAR = invoiceData.totalPayments + invoiceData.totalCredits
    summary.newBalance = invoiceData.balance
    data.summary = [summary]
   
    dispatch(addSummary(data))
    
  }
    
   //  **** GENERATE INVOICE / SUBMIT INVOICE DATA ****
  const onSubmitInvoice = async (data) => {
    let invoices = client.invoices || {}
    data.id = clientId 
    data.balance = invoiceData.balance
    data.invoices = [...invoices, invoiceData]
    
    let charges = structuredClone(client.charges)
    let payments = structuredClone(client.payments)
    
    orderedServices.map(item => {
      let chargeId = item.id
      charges[chargeId].invoiced = true
      charges[chargeId].invoice_no = invoiceData.invoice_no
    })
    orderedExpenses.map(item => {
      let chargeId = item.id
      charges[chargeId].invoiced = true
      charges[chargeId].invoice_no = invoiceData.invoice_no
    })
    orderedPayments.map(item => {
      let paymentId = item.id
      payments[paymentId].invoiced = true
      payments[paymentId].invoice_no = invoiceData.invoice_no
    })
    orderedCredits.map(item => {
      let creditId = item.id
      payments[creditId].invoiced = true
      payments[creditId].invoice_no = invoiceData.invoice_no
    })

    data.charges = [...charges]
    data.payments = [...payments]
    dispatch(addInvoice(data))
    navigate(ROUTES.INVOICE, {state: {clientId: clientId, invoiceDate: invoiceDate, invoiceData: invoiceData}})
    
  }
    
  //  **** GENERATE INVOICE / SUBMIT INVOICE DATA ****

  //  **** GENERATE PAYMENT REGISTER ****  

  let allPayments = client.payments.filter((payment) => {
    return payment.creditType === 'payment'
  })
  let orderedAllPayments = allPayments.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  const onSubmitPaymentReg = async (data) => {
    let paymentReg = {}
    paymentReg.id = clientId
    paymentReg.name = invoiceData.name
    paymentReg.payments = orderedAllPayments
    paymentReg.totalPayments = orderedAllPayments.map(item => item.amount * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    data = [paymentReg]
    
    navigate(ROUTES.PAYMENTREG, {state: {paymentRegData: data}})
  }
  //  **** GENERATE PAYMENT REGISTER ****  
    
   //  **** GENERATE HISTORY BILL****  

  let allServices = client.charges.filter((charge) => {
    return charge.chargeType === 'task'
  })
  let orderedAllServices = allServices.slice().sort((a, b) => a.date.localeCompare(b.date))
  
  let allExpenses = client.charges.filter((charge) => {
    return charge.chargeType === 'expense'
  })
  let orderedAllExpenses = allExpenses.slice().sort((a, b) => a.date.localeCompare(b.date))

  
  const onSubmitHistoryBill = async (data) => {
    let historyBill = {}
    historyBill.id = clientId
    historyBill.name = invoiceData.name
    historyBill.services = orderedAllServices
    historyBill.totalServices = orderedAllServices.map(item => item.hours * item.rate).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    historyBill.expenses = orderedAllExpenses
    historyBill.totalExpenses = orderedAllExpenses.map(item => item.fee * 1).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    data = [historyBill]

    navigate(ROUTES.HISTORYBILL, {state: {historyBillData: data}})
  }
  //  **** GENERATE HISTORY BILL ****  
    
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
                value={invoiceDate}
                onChange={onInvoiceDateChanged}
                />
            </div>
              <div className="">
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
                  <tr>
                    <td></td>
                    <td><h5>Total for professional Services</h5></td>
                    <td></td> 
                    <td></td>
                    <td>{invoiceData.totalHours.toFixed(1)}</td>
                    <td><h5>{invoiceData.totalServices.toFixed(2)}</h5></td>
                  </tr>
                </tbody>
              </table>
              <h3>Additional Charges</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedExpenses.map((charge, i) => {
                    return (
                      <tr key={i}>
                        <td>{charge.date}</td>
                        <td>{charge.category}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{charge.total}</td>
                        <td><button className='table-button' onClick={() => handleDeleteCharge(charge.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td></td>
                    <td><h5>Total for additional charges</h5></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><h5>{invoiceData.totalExpenses.toFixed(2)}</h5></td>
                  </tr>
                </tbody>
              </table>
              <h3>Payments / Credits</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orderedPayments.map((payment, i) => {
                    return (
                      <tr key={i}>
                        <td>{payment.date}</td>
                        <td>{payment.creditType}</td>
                        <td></td>
                        <td></td>
                        <td>({payment.amount})</td>
                        <td><button className='table-button' onClick={() => handleDeletePayment(payment.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                  {orderedCredits.map((credit, i) => {
                    return (
                      <tr key={i}>
                        <td>{credit.date}</td>
                        <td>{credit.creditType}</td>
                        <td></td>
                        <td></td>
                        <td>({credit.amount})</td>
                        <td><button className='table-button' onClick={() => handleDeletePayment(credit.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td></td>
                    <td><h5>Total adjustments</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>({invoiceData.totalAdjustments.toFixed(2)})</h5></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <h3>Stuff</h3>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td><h5>Total charges for this bill</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>{(invoiceData.totalServices + invoiceData.totalExpenses).toFixed(2)}</h5></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><h5>Previous balance</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>{invoiceData.prevBalance < 0 ? `(${(invoiceData.prevBalance*-1).toFixed(2)})` : invoiceData.prevBalance}</h5></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><h5>Total payments and credits</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>({invoiceData.totalAdjustments.toFixed(2)})</h5></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><h5>Interest charges on past due balance</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>{(invoiceData.interestCharges*1).toFixed(2)}</h5></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><h5>Balance due</h5></td>
                    <td></td>
                    <td></td>
                    <td><h5>{invoiceData.balance < 0 ? `(${(invoiceData.balance*-1).toFixed(2)})` : invoiceData.balance}</h5></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              {/* https://fiscal.treasury.gov/prompt-payment/interest.html */}
              <form onSubmit={handleSubmit(onSubmitSummary)} >
                <button type='submit' className='btn'>Generate Summary Data</button>
              </form>
              <form onSubmit={handleSubmit(onSubmitInvoice)} >
                <button type='submit' className='btn'>Generate Invoice</button>
              </form>
              <form onSubmit={handleSubmit(onSubmitPaymentReg)} >
                <button type='submit' className='btn'>Generate Payment Register</button>
              </form>
              <form onSubmit={handleSubmit(onSubmitHistoryBill)} >
                <button type='submit' className='btn'>Generate History Bill</button>
              </form>
            </div>
            <div className="form-group">
              <label htmlFor="past invoices" ><h3>Past Invoices</h3></label>
              <select
                type="date"
                className="form-control"
                id="pastInvoices"
                name="pastInvoices"
                value={pastInvoice}
                onChange={onPastInvoicesChanged}>
                <option value="">Select ...</option>
                { pastInvoices.length > 0 ? 
                pastInvoicesContent = pastInvoices.map((pastInvoice, i )=> (
                  <option key={i} value={pastInvoice.invoice_no}>{pastInvoice.trans_date}</option>
                  ))
              : pastInvoicesContent = 
                    <option >No Past Invoices Found</option>}
              </select>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}
