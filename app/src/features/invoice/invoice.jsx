import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";

import GenInvoice from './react-pdf/genInvoice'

const Invoice = () => {
  
  // **** SELECT CLIENT ****
  
  const [clientId, setClientId] = useState('')
  const dispatch = useDispatch()
  
  const clients = useSelector(selectAllClients)
  
  const clientStatus = useSelector(state => state.clients.status)
  const clientError = useSelector(state => state.clients.clientError)
  
  const onClientChanged = e => {
    setClientId(e.target.value)
  }
  
  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])
  
  let clientContent
  
  if(clientStatus === 'loading') {
    clientContent = ""
  } else if (clientStatus === 'succeeded') {
    clientContent = clients.map(client => (
      <option key={client.id} value={client.id}>
        {`${client.firstName} ${client.lastName}`}
      </option>))
  } else if (clientStatus === 'failed') {
    clientContent = <option>{clientError}</option>
  }
  
  const client = useSelector(state => selectClientById(state, clientId))
  
  // **** SELECT CLIENT ****
  
  // **** SELECT INVOICE DATE ****
  
  const [invoiceDate, setInvoiceDate] = useState('')
  const onInvoiceDateChanged = e => setInvoiceDate(e.target.value)
  
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
  if (client && invoiceDate) {
    invoiceData.invoice_no = Math.floor(Math.random() * 90000) + 10000
    invoiceData.trans_date = invoiceDate
    invoiceData.name = `${client.firstName} ${client.lastName}`
    invoiceData.address1 = client.address
    invoiceData.address2 = `${client.city}, ${client.usState}, ${client.zip},`
    invoiceData.email = client.email 
    invoiceData.services = orderedServices
    invoiceData.expenses = orderedExpenses
    invoiceData.payments = orderedPayments
    
  }
  //  **** GENERATE INVOICE DATA ****

  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="header">Generate an invoice</div>
            <form >
                <div className="form-group">
                  <label htmlFor="client">Client</label>
                  <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
                    <option value="">Select ...</option>
                    {clientContent}
                  </select>
                </div>
                <div className="form-group">
                    <label htmlFor="invoice date" >Payment Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={invoiceDate}
                      onChange={onInvoiceDateChanged}
                      />
                  </div>
              </form>
          </section>
        </div>
          {/* {clientId ? 
            <h1>{`${client.firstName} ${client.lastName}`}</h1>
            : null}
          {invoiceDate ? 
          <h1>{`${invoiceData.trans_date}`}</h1>
          : null}
          {  invoiceDate && clientId ?
            <h1>{`${invoiceData.invoice_no}`}</h1>
          : null} */}
          <section className="centered-container">
            {client && invoiceDate 
              ? <GenInvoice invoiceData={invoiceData} />
              : <h3>Please select a client and an invoice date</h3>}
          </section>
      </section>
    </React.Fragment>
    );
}

export default Invoice;