import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'


import { addCharges, selectClientById } from "../clients/clientsSlice";

export const AddChargesForm = () => {
  const { clientId } = useParams();
  
  const client = useSelector(state => selectClientById(state, clientId))
    
  const [chargeDate, setChargeDate] = useState('')
  const [category, setCategory] = useState('')
  const [rate, setRate] = useState('')
  const [hours, setHours] = useState('')
  const [id, setId] = useState(client.id)
  
  
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onPaymentDateChanged = e => setPaymentDate(e.target.value)
  const onAmountChanged = e => setAmount(e.target.value)
  let payments = client.payments || {}
    
  const onSubmit = async (data) => {
    let chargeId = 0
    if (chargeId) {
      data.chargeId = payments.length
    } else {
      data.chargeId = 0
    }
    let charge = {id: chargeId, date: data.chargeDate, category: data.category, rate: data.rate, hours: data.hours, invoiced: false}
    data.charges = [...charges, charge]
    data.id = id
    
    await dispatch(addCharge(data))
    navigate(`/clients/${clientId}`)
  }

  return (
    <section className="section">
      <div className="centered-view">
        <div className="centered-container">
          <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
            <div className="header">Add a payment</div>
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
              {/* <h2>{client.balance || '0.00'}</h2> */}
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="payment date" >Charges Date</label>
                <input
                  {...register('date')}
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={pChargeDate}
                  onChange={onChargeDateChanged}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="amount" >Category</label>
                <input
                  {...register('category')}
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={category}
                  onChange={onCategoryChanged}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="amount" >Hours</label>
                <input
                  {...register('hours')}
                  type="text"
                  className="form-control"
                  id="hours"
                  name="hours"
                  value={hours}
                  onChange={onHoursChanged}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="amount" >Rate</label>
                <input
                  {...register('rate')}
                  type="number"
                  className="form-control"
                  id="rate"
                  name="rate"
                  value={rate}
                  onChange={onRateChanged}
                  />
              </div>
              <button type="submit" className="btn btn-outline-primary">Add Charge</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}