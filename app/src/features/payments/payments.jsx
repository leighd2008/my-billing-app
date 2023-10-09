import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, addPayment, selectClientById } from "../clients/clientsSlice";

const Payments = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
  const [clientId, setClientId] = useState('')
  const [creditType, setCreditType] = useState('payment')
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
  
  const onCreditTypeChanged = e => setCreditType(e.target.value)
  
  const client = useSelector(state => selectClientById(state, clientId))
  
  let curr = new Date()
  const [paymentDate, setPaymentDate] = useState(curr.toISOString().substring(0,10))
  const [amount, setAmount] = useState('')
  
  const { register, handleSubmit } = useForm();
  
  const onPaymentDateChanged = e => setPaymentDate(e.target.value)
  const onAmountChanged = e => setAmount(e.target.value)
  
  const onSubmit = async (data) => {
    let payments = client.payments || {}
    let pmntId = payments.length || 0
      
    let payment = {id: pmntId, creditType: creditType, date: data.date, amount: (data.amount*1).toFixed(2), invoiced: false}
    
    if (payments.length) {
      data.payments = [...payments, payment]
    } else {
      data.payments = [payment]
    }
    data.id = clientId
    
    dispatch(addPayment(data))
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
                <form>
                  <div className="form-group">
                    <label htmlFor="client">Client</label>
                    <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
                      <option value="">Select ...</option>
                      {clientContent}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="client">Payment / Credit</label>
                    <select id="client" className="form-control" value={creditType} onChange={onCreditTypeChanged} >
                      <option value="payment">Payment</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>
                </form>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="form-group">
                    <label htmlFor="payment date" >Payment Date</label>
                    <input
                      {...register('date')}
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      defaultValue={paymentDate}
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