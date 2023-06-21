import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectAllClients, fetchClients, addPayment, selectClientById } from "../clients/clientsSlice";

const Payments = () => {
  const [clientId, setClientId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
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
  
  const [paymentDate, setPaymentDate] = useState('')
  const [amount, setAmount] = useState('')
  
  const { register, handleSubmit } = useForm();
  
  const onPaymentDateChanged = e => setPaymentDate(e.target.value)
  const onAmountChanged = e => setAmount(e.target.value)
  
  const onSubmit = async (data) => {
    let payments = client.payments || {}
    let pmntId = payments.length || 0
      
    let payment = {id: pmntId, date: data.date, amount: data.amount, invoiced: false}
    
    if (payments.length) {
      data.payments = [...payments, payment]
    } else {
      data.payments = [payment]
    }
    data.id = clientId
    
    await dispatch(addPayment(data))
    await dispatch(fetchClients())
    setPaymentDate("")
    setAmount("")
    setClientId("")
  }

  
  return (
    <React.Fragment>
        <section className="section">
          <div className="centered-view">
            <section className="centered-container">
              <div className="centered-container-form">
                <div className="header">Add a payment</div>
                <div className="form-group">
                  <label htmlFor="client">Client</label>
                  <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
                    <option value="">Select ...</option>
                    {clientContent}
                  </select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="form-group">
                    <label htmlFor="payment date" >Payment Date</label>
                    <input
                      {...register('date')}
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={paymentDate}
                      onChange={onPaymentDateChanged}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount" >Payment Amount</label>
                    <input
                      {...register('amount')}
                      type="number"
                      className="form-control"
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={onAmountChanged}
                      />
                  </div>
                  <button type="submit" className="btn">Add Payment</button>
                </form>
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Payments;