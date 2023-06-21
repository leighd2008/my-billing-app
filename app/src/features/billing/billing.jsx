import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";
import { selectAllUsers, fetchUsers, selectUserById } from "../users/usersSlice";

const Billing = () => {
  const [clientId, setClientId] = useState('')
  const [chargeType, setChargeType] = useState('')
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
  
  const onChargeTypeChanged = e => {
    setChargeType(e.target.value)
  }
  
  const client = useSelector(state => selectClientById(state, clientId))
    
  const [chargeDate, setChargeDate] = useState('')
  const [category, setCategory] = useState('')
  const [hours, setHours] = useState('')
  const [userId, setUserId] = useState('')
  
  
  const users = useSelector(selectAllUsers)
  
  const userStatus = useSelector(state => state.users.status)
  const userError = useSelector(state => state.users.userError)
  let user = useSelector(state => selectUserById(state, userId))
  
  const { register, handleSubmit } = useForm();
  
  const onChargeDateChanged = e => setChargeDate(e.target.value)
  const onCategoryChanged = e => setCategory(e.target.value)
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
  
    // *************** For Autocomplete ***************
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')
  
  const tasks = ["Calc", "Conf", "Consult", "Copy", "Deliver", "Depo", "Draft", "Email oc", "Email c", "Forward", "Hrg", "LTOC", "LTR", "Mediation", "Meeting", "Open", "PC", "PCA", "Prep", "Research", "Review", "Revise", "SC", "Scan & Email", "Sched", "Trial"]
  
  const expenses = ["Arrears Calculation ($59)", "Close file", "Consult", "Court Reporter Fee", "Error/Correction", "Filing Fee", "Postage", "Records", "Returned", "Runner Service Fee ($15)", "Service Fee", "Subpoena Issue Fee ($40)", "Transcript", "Witness Fee", "e-File Processing Fee ($6.70)"]
  
  
  const onChange = (suggestions) => e => {
    setUserInput(e.target.value)
    
    setFilteredSuggestions(suggestions.filter(
      suggestion => 
        suggestion.toLowerCase().startsWith(e.target.value.toLowerCase())
    ))
      setActiveSuggestion(0)
      setShowSuggestions(true)
  };
  
  const onClick = e => {
      setActiveSuggestion(0)
      setFilteredSuggestions([])
      setShowSuggestions(false)
      setUserInput(e.target.innerText)
  };
  
  const onKeyDown = (suggestions) => e => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if(activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  };
    
    let suggestionListComponent;
    
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    
  // *************** For Autocomplete ***************
  
  const onSubmit = async (data, e) => {
    let charges = client.charges || {}
    let chargeId = charges.length || 0
    let currentRate
    let currentHours
    if(category === "Arrears Calculation ($59)") {
      currentRate = 59 
      currentHours = 1
    } else if(category === "Runner Service Fee ($15)") {
      currentRate = 15 
      currentHours = 1
    } else if(category === "Subpoena Issue Fee ($40)") {
      currentRate = 40 
      currentHours = 1
    } else if(category === "e-File Processing Fee ($6.70)") {
      currentRate = 6.70
      currentHours = 1
    } else { 
      currentRate = user.rate
      currentHours = data.hours
    }
    let charge = {id: chargeId, date: data.date, category: data.task || data.expense, user: user.name, rate: currentRate, hours: currentHours, total: (currentHours * currentRate), invoiced: false}
    if (confirm(`Click OK to proceed or Cancel to start over! \n Date: ${charge.date} \n Category: ${charge.category} \n Staff Member: ${charge.user} \n Rate: ${charge.rate} \n Billable hours: ${charge.hours} \n Total charge: ${charge.total}`)){
      if (charges.length) {
        data.charges = [...charges, charge]
      } else {
        data.charges = [charge]
      }
      data.id = clientId
      
      console.log(data)
      
      // await dispatch(addCharge(data))
      // await dispatch(fetchClients())
      setChargeDate("")
      setHours("")
      setCategory("")
      setUserId("")
      setClientId("")
      setChargeType("")
      setUserInput("")
    }
  }
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="centered-container-form">
                <div className="header">Add a charge</div>
              <form >
                <div className="form-group">
                  <label htmlFor="client">Client</label>
                  <select id="client" className="form-control" value={clientId} onChange={onClientChanged} >
                    <option value="">Select ...</option>
                    {clientContent}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="client">Type</label>
                  <select id="client" className="form-control" value={chargeType} onChange={onChargeTypeChanged} >
                    <option value="">Select ...</option>
                    <option value="task">Task</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </form>
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
                { chargeType === 'task' ? (
                  <div className="form-group">
                    <label htmlFor="task" >Task (use up and down arrows to highlight and tab to select. clicking won't work and I haven't figured it out yet.)</label>
                    <input
                      {...register('task')}
                      type="text"
                      className="form-control"
                      placeholder="Begin typing to see suggestions"
                      id="task"
                      name="task"
                      value={userInput}
                      onChange={onChange(tasks)}
                      onKeyDown={onKeyDown(tasks)}
                    />
                    {suggestionListComponent}
                  </div> ) : (
                  <div className="form-group">
                    <label htmlFor="expense" >Expense (use up and down arrows to highlight and tab to select. clicking won't work and I haven't figured it out yet.)</label>
                    <input
                      {...register('expense')}
                      type="text"
                      className="form-control"
                      placeholder="Begin typing to see suggestions"
                      id="expense"
                      name="expense"
                      value={userInput}
                      onChange={onChange(expenses)}
                      onKeyDown={onKeyDown(expenses)}
                    />
                    {suggestionListComponent}
                  </div>) }
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