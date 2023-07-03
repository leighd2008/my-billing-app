import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";

const Invoice = () => {
  
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
  
  
  // if (!client) {
  //   return (
  //     <React.Fragment >
  //       <h2>Client not found</h2>
  //     </React.Fragment>
  //   )
  // }
  
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
              </form>
          </section>
          {clientId ? 
            <h1>{`${client.firstName} ${client.lastName}`}</h1>
            : null}
        </div>
      </section>
    </React.Fragment>
    );
}

export default Invoice;