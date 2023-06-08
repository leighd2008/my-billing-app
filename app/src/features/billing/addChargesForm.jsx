import React, { useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'


import { addCharge, selectClientById } from "../clients/clientsSlice";
import { selectAllUsers, fetchUsers, selectUserById } from "../users/usersSlice";


export const AddChargesForm = () => {
  const { clientId } = useParams();
  
  const client = useSelector(state => selectClientById(state, clientId))
  if (!client) {
    return (
      <React.Fragment >
        <h2>Client not found</h2>
      </React.Fragment>
    )
  }
    
  const [chargeDate, setChargeDate] = useState('')
  const [category, setCategory] = useState('')
  // const [rate, setRate] = useState('')
  const [hours, setHours] = useState('')
  const [id, setId] = useState(client.id)
  const [userId, setUserId] = useState('')
  
  const users = useSelector(selectAllUsers)
  
  const userStatus = useSelector(state => state.users.status)
  const error = useSelector(state => state.users.error)
  let user = useSelector(state => selectUserById(state, userId))
  
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onChargeDateChanged = e => setChargeDate(e.target.value)
  const onCategoryChanged = e => setCategory(e.target.value)
  // const onRateChanged = e => setRate(e.target.value)
  const onHoursChanged = e => setHours(e.target.value)
  const onUserChanged = e => setUserId(e.target.value)
  
    
  
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [userStatus, dispatch])
  
  let content
  
  if(userStatus === 'loading') {
    content = ""
  } else if (userStatus === 'succeeded') {
    content = users.map(user => (
      <option key={user.id} value={user.id}>{user.name}</option>
    ))
  } else if (userStatus === 'failed') {
    content = <option>{error}</option>
  }
  
  let charges = client.charges || {}
  let chargeId = charges.length || 0
  let rate = ""
  
  const onSubmit = async (data) => {
    category === "A category ($20)" ? rate = 20 : rate = user.rate
    let charge = {id: chargeId, date: data.date, category: data.category, user: user.name, rate: rate, hours: data.hours, total: (2 * rate), invoiced: false}
    if (charges.length) {
      data.charges = [...charges, charge]
    } else {
      data.charges = [charge]
    }
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
                <label htmlFor="category" >Category</label>
                <select 
                  {...register('category')}
                  className="form-control"
                  id="category"
                  name="category"
                  value={category}
                  onChange={onCategoryChanged}>
                  <option value="this_category">This category</option>
                  <option value="that_category">That category</option>
                  <option value="another_category">Another category</option>
                  <option value="a_category">A category ($20)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category" >User</label>
                <select 
                  {...register('user')}
                  className="form-control"
                  id="user"
                  name="user"
                  value={userId}
                  onChange={onUserChanged}>
                  <option value="">Users</option>
                  {content}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount" >Hours</label>
                <input
                  {...register('hours')}
                  type="number"
                  className="form-control"
                  id="hours"
                  name="hours"
                  value={hours}
                  onChange={onHoursChanged}
                  />
              </div>
              {/* <div className="form-group">
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
              </div> */}
              <button type="submit" className="btn">Add Charge</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}