import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectAllClients, fetchClients } from "../clients/clientsSlice";

const Billing = () => {
  const [clientId, setClientId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const clients = useSelector(selectAllClients)
  
  const clientStatus = useSelector(state => state.clients.status)
  const error = useSelector(state => state.clients.error)
  
  const onClientChanged = e => {
    setClientId(e.target.value)
    navigate(`/addCharges/${e.target.value}`)
  }
  
  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
  }
  }, [clientStatus, dispatch])
  
  let content
  
  if(clientStatus === 'loading') {
    content = ""
  } else if (clientStatus === 'succeeded') {
    content = clients.map(client => (
      <option key={client.id} value={client.id}>
        {`${client.firstName} ${client.lastName}`}
      </option>))
  } else if (clientStatus === 'failed') {
    content = <option>{error}</option>
  }
  
  return (
    <React.Fragment>
        <section className="section">
          <div className="centered-view">
            <section className="centered-container">
              <div className="">
                <p className="title">Billing</p>
                <select id="client" value={clientId} onChange={onClientChanged} >
                  <option value="">Clients</option>
                  {content}
                </select>
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Billing;