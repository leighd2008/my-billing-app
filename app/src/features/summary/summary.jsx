import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, selectClientById } from "../clients/clientsSlice";

import GenSummary from './react-pdf/genSummary'

const Summary = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
  const { state } = useLocation()
  
  // **** SELECT CLIENT ****
  let clientId
  state ? clientId = state.clientId : null
  
  const dispatch = useDispatch()
  const clients = useSelector(selectAllClients)
  
  const clientStatus = useSelector(state => state.clients.status)
  const clientError = useSelector(state => state.clients.clientError)
  
  const onClientChanged = e => {
    setSelectedClient(clients.filter((client) => {
      return client.id === e.target.value
    })[0])
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
  
  // **** Past Invoices ****
  
  const [selectedClient, setSelectedClient] = useState()
  const [pastInvData, setPastInvData] = useState()
  const [pastInvoices, setPastInvoices] = useState([])
  let pastInvoicesContent
  let pastInvoice
  
  useEffect(() => {
    if (selectedClient) {
      if (selectedClient.invoices.length > 0) {
        setPastInvoices(selectedClient.invoices.slice().sort((a,b) => a.trans_date.localeCompare(b.trans_date)))
      }
    }
  }, [selectedClient])
  
  const onPastInvoicesChanged = e => {
    setPastInvData(pastInvoices.filter((invoice, i) => {
      return invoice.invoice_no === Number(e.target.value)
    })[0])
  }
  
  // **** Past Invoices ****
  
  // **** SHOW DROP DOWN MENUS IN NOT GENERATING NEW INVOICE ****
  
  let invoiceContent
  {if (!state) {
    invoiceContent = (
      <div className="category-detail">
        <div className="form-group">
          <label htmlFor="client">Client</label>
          <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
            <option value="">Select ...</option>
            {clientContent}
          </select>
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
      </div>
    )
  }}
  
  // **** SHOW DROP DOWN MENUS IF NOT GENERATING NEW INVOICE ****
  
  let invoiceData
  state ? invoiceData = state.invoiceData : null
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="header">Generate a summary</div>
            <form >
              {invoiceContent}
            </form>
          </section>
        </div>
          <section className="centered-container">
            {invoiceData 
              ? <GenSummary invoiceData={invoiceData} />
              : null}
            {pastInvData 
            ? <GenSummary invoiceData={pastInvData} /> : null}
          </section>
      </section>
    </React.Fragment>
    );
}

export default Summary;