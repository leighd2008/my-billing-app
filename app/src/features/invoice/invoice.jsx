import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectAllClients, fetchClients, selectClientById } from "../clients/clientsSlice";

import GenInvoice from './react-pdf/genInvoice'

const Invoice = () => {
  const { state } = useLocation()
  // **** SELECT CLIENT ****
  
  const clientId = state.clientId
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
  
  let curr = new Date()
  const invoiceDate = state.invoiceDate
  const onInvoiceDateChanged = e => setInvoiceDate(e.target.value)
  
  // **** SELECT INVOICE DATE ****
  
  const invoiceData = state.invoiceData
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
                    <label htmlFor="invoice date" >Invoice Date</label>
                    <input
                      type="date"
                      className="form-control"
                      defaultValue={invoiceDate}
                      onChange={onInvoiceDateChanged}
                      />
                  </div>
              </form>
          </section>
        </div>
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