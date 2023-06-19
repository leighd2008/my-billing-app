import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";
import { selectAllUsers, fetchUsers, selectUserById } from "../users/usersSlice";

const Billing = () => {
  const [clientId, setClientId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const clients = useSelector(selectAllClients)
  
  const clientStatus = useSelector(state => state.clients.status)
  const clientError = useSelector(state => state.clients.clientError)
  
  const onClientChanged = e => {
    setClientId(e.target.value)
    
    // navigate(`/addCharges/${e.target.value}`)
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
    
  const [chargeDate, setChargeDate] = useState('')
  const [category, setCategory] = useState('')
  // const [rate, setRate] = useState('')
  const [hours, setHours] = useState('')
  // const [id, setId] = useState(client.id)
  const [userId, setUserId] = useState('')
  
  const users = useSelector(selectAllUsers)
  
  const userStatus = useSelector(state => state.users.status)
  const userError = useSelector(state => state.users.userError)
  let user = useSelector(state => selectUserById(state, userId))
  
  const { register, handleSubmit } = useForm();
  
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
  
  let userContent
  
  if(userStatus === 'loading') {
    userContent = ""
  } else if (userStatus === 'succeeded') {
    userContent = users.map(user => (
      <option key={user.id} value={user.id}>{user.name}</option>
    ))
  } else if (userStatus === 'failed') {
    userContent = <option>{userError}</option>
  }
  
  
  const onSubmit = async (data, e) => {
    let charges = client.charges || {}
    let chargeId = charges.length || 0
    let currentRate
    let currentHours
    if(category === "a_category") {
      currentRate = 20 
      currentHours = 1
    } else { 
      currentRate = user.rate
      currentHours = data.hours
    }
    let charge = {id: chargeId, date: data.date, category: data.category, user: user.name, rate: currentRate, hours: currentHours, total: (currentHours * currentRate), invoiced: false}
    if (confirm(`Click OK to proceed or Cancel to start over! \n Date: ${charge.date} \n Staff Member: ${charge.user} \n Rate: ${charge.rate} \n Billable hours: ${charge.hours} \n Total charge: ${charge.total}`)){
      if (charges.length) {
        data.charges = [...charges, charge]
      } else {
        data.charges = [charge]
      }
      data.id = clientId
      
      await dispatch(addCharge(data))
      await dispatch(fetchClients())
      setChargeDate("")
      setHours("")
      setCategory("")
      setUserId("")
      setClientId("")
      // navigate(`/clients/${clientId}`)
      // console.log(data)
    }
  }
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="centered-container-form">
              <div className="header">Add a charge</div>
              <div className="form-group">
                <label htmlFor="client">Client</label>
                <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
                  <option value="">Select ...</option>
                  {clientContent}
                </select>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} >
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
                    <option value="">Select ...</option>
                    <option value="this_category">This category</option>
                    <option value="that_category">That category</option>
                    <option value="another_category">Another category</option>
                    <option value="a_category">A category ($20)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category" >Staff Member</label>
                  <select 
                    {...register('user')}
                    className="form-control"
                    id="user"
                    name="user"
                    value={userId}
                    onChange={onUserChanged}>
                    <option value="">Select ...</option>
                    {userContent}
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
                <button type="submit" className="btn">Add Charge</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Billing;