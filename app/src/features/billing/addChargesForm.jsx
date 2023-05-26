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
  
  const onChargeDateChanged = e => setChargeDate(e.target.value)
  const onCategoryChanged = e => setCategory(e.target.value)
  const onRateChanged = e => setRate(e.target.value)
  const onHoursChanged = e => setHours(e.target.value)
  
  let charges = client.charges || {}
    
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
            <div className="header">Add a charge</div>
              <h2>{`${client.firstName} ${client.lastName}`}</h2>
              {/* <h2>{client.balance || '0.00'}</h2> */}
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="payment date" >Charge Date</label>
                <input
                  {...register('date')}
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={chargeDate}
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