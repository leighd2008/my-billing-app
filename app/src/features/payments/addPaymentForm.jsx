import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'


import { addPayment, selectClientById } from "../clients/clientsSlice";

export const AddPaymentForm = () => {
  const { clientId } = useParams();
  
  const client = useSelector(state => selectClientById(state, clientId))
    
  const [paymentDate, setPaymentDate] = useState('')
  const [amount, setAmount] = useState('')
  const [id, setId] = useState(client.id)
  
  
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onPaymentDateChanged = e => setPaymentDate(e.target.value)
  const onAmountChanged = e => setAmount(e.target.value)
  let payments = client.payments || {}
  let pmntId = payments.length || 0
    
  const onSubmit = async (data) => {
    let payment = {id: pmntId, date: data.date, amount: data.amount, invoiced: false}
    
    if (payments.length) {
      data.payments = [...payments, payment]
    } else {
      data.payments = [payment]
    }
    data.id = id
    
    await dispatch(addPayment(data))
    navigate(`/clients/${clientId}`)
  }

  return (
    <section className="section">
      <div className="centered-view">
        <div className="centered-container">
          <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
            <div className="header">Add a payment</div>
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
            <div className="form-container">
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
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}