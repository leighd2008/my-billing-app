import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";
import { selectAllUsers, fetchUsers, selectUserById } from "../users/usersSlice";
import { selectChargeTypes, fetchChargeTypes } from './billingSlice'

import Item from "../../components/Item";

const Billing = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (!currentUser ) {
      alert('Please login to access this page')
      return navigate('/')
    }
  }, [currentUser])
  
 
  const [clientId, setClientId] = useState('')
  const [chargeType, setChargeType] = useState('task')
  const dispatch = useDispatch()
  
  const clients = useSelector(selectAllClients)
  
  const clientStatus = useSelector(state => state.clients.status)
  const clientError = useSelector(state => state.clients.clientError)
  
  const handleClientSelect = e => {
    setClientSelected(e.target.value)
    let str = e.target.value
    let lastName = str.substring(str.indexOf(' ') + 1)
    let selectedClient = clients.filter((client) => {
      return client.lastName === lastName
    })
    selectedClient[0] ? 
    setClientId(selectedClient[0].id)
    : null
  }
  
  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])
  
  let clientContent = []
  
  if(clientStatus === 'loading') {
    clientContent = ""
  } else if (clientStatus === 'succeeded') {
    clients.map(client => {
      clientContent = [...clientContent,
        `${client.firstName} ${client.lastName}`]
    })
  } 
  
  const [clientSelected, setClientSelected] = useState('')
  
  const chargeTypesStatus = useSelector(state => state.billing.status)
  const chargeTypes = useSelector(selectChargeTypes)
  let tasks = []
  let expenses = []
  let expenseKeys = []
  
  
  useEffect(() => {
    if (chargeTypesStatus === 'idle'){
      dispatch(fetchChargeTypes())
    }
  }, [chargeTypesStatus, dispatch])
  
  if (chargeTypesStatus === 'loading') {
  } else if (chargeTypesStatus === 'succeeded') {
    tasks = chargeTypes[1].tasks
    expenses = chargeTypes[0].expenses
    expenseKeys = Object.keys(expenses)
  }
  
  const onChargeTypeChanged = e => {
    setChargeType(e.target.value)
  }
  
  const client = useSelector(state => selectClientById(state, clientId))
  
  let curr = new Date()
  curr.setDate(curr.getDate())
  const [chargeDate, setChargeDate] = useState(curr.toISOString().substring(0,10))
  const [hours, setHours] = useState('')
  const [fee, setFee] = useState('')
  // const [userId, setUserId] = useState('GcO8emvrf4eQSScHsQDh')
  const [userId, setUserId] = useState('8jBzJQuyzRKNxDKqRsLj')
  
  const users = useSelector(selectAllUsers)
  
  const userStatus = useSelector(state => state.users.status)
  const userError = useSelector(state => state.users.userError)
  let user = useSelector(state => selectUserById(state, userId))
  
  const { register, handleSubmit, } = useForm({
    defaultValues: {
      task: '',
      expense: '',
      hours: '',
      fee: '',
    },
    shouldUnregister: true
  });
  
  const onChargeDateChanged = e => setChargeDate(e.target.value)
  const onHoursChanged = e => setHours(e.target.value)
  const onFeeChanged = e => setFee(e.target.value)
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

    const [task, setTask] = useState('')
    const [expense, setExpense] = useState('')
    
    const handleTaskSelect = e => setTask(e.target.value)
      
    const handleExpenseSelect = e => {
      setExpense(e.target.value)  
      if(e.target.value === "Arrears calculation") {
        setFee(expenses[e.target.value])
      } else if(e.target.value === "Runner service fee") {
        setFee(expenses[e.target.value])
      } else if(e.target.value === "Subpoena issue fee") {
        setFee(expenses[e.target.value])
      } else if(e.target.value === "e-File processing fee") {
        setFee(expenses[e.target.value])
      }
    }
  
  let categoryDetail
  
  {if (chargeType === 'task') {
    categoryDetail = (
      <div className="category-detail">
        <div className="form-group">
          <label htmlFor="date" >Charge Date</label>
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
        <div className="form-group plug-inner-addon">
          <label htmlFor="task" >Task </label>
          <input
            {...register('task')}
            type="text"
            className="form-control"
            placeholder="Begin typing to see suggestions"
            id="task"
            name="task"
            value={task}
            list='tasks'
            autoComplete="on"
            onChange={handleTaskSelect}
          />
          <datalist id='tasks'>
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task, index) => {
                return <Item item={task} position={index} key={index} />
              })
            }
          </datalist>
        </div> 
        <div className="form-group">
          <label htmlFor="hours" >Hours</label>
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
      </div>) 
    } else if (chargeType === 'expense') {
      categoryDetail = (
        <div className="category-detail">
          <div className="form-group">
            <label htmlFor="date" >Charge Date</label>
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
          <div className="form-group plug-inner-addon">
            <label htmlFor="expense" >Expense </label>
            <input
              {...register('expense')}
              type="text"
              className="form-control"
              placeholder="Begin typing to see suggestions"
              id="expense"
              name="expense"
              value={expense}
              list='expenses'
              autoComplete="on"
              onChange={handleExpenseSelect}
            />
            <datalist id='expenses'>
              {expenseKeys &&
                expenseKeys.length > 0 &&
                expenseKeys.map((expense, index) => {
                  return <Item item={expense} position={index} key={index} />
                })
              }
            </datalist>
          </div>
          <div className="form-group">
              <label htmlFor="fee" >Fee (if pre-filled tab through to accept)</label>
              <input
                {...register('fee')}
                type="number"
                className="form-control"
                id="fee"
                name="fee"
                value={fee}
                onChange={onFeeChanged}
                />
          </div>
        </div>) 
    } else {
      categoryDetail = (
      <div>Please choose a Category Type above.</div>)
    }
  }

  const onSubmit = async (data) => {
    let charges = client.charges
    let chargeId = charges.length
    let charge
    if(data.fee) {
      charge = {id: chargeId, chargeType: 'expense', date: data.date, category: data.expense, fee: data.fee, total: (data.fee*1).toFixed(2), invoiced: false, }
      {
        data.charges = [...charges, charge]
        data.id = clientId
      }
    } else {
      charge = { id: chargeId, chargeType: 'task', date: data.date, category: data.task, user: user.name, rate: user.rate, hours: (data.hours*1).toFixed(1), total: (user.rate * data.hours).toFixed(2), invoiced: false}
      {
        data.charges = [...charges, charge]
        data.id = clientId
      }
    }
    
    dispatch(addCharge(data))
    setClientSelected("")
    setChargeType("task")
    setChargeDate(curr.toISOString().substring(0,10))
    // setUserId("GcO8emvrf4eQSScHsQDh")
    setUserId("8jBzJQuyzRKNxDKqRsLj")
    setHours("")
    setFee("")
    setTask("")
    setExpense("")
    charges = {}
    chargeId = ""
    charge = ""
    data = ""
  }
  
  return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="centered-container-form">
                <div className="header">Add a charge</div>
              <form >
              <div className="form-group plug-inner-addon">
                  <label htmlFor="clientSelected" >Client </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter client name"
                    id="clientSelected"
                    name="clientSelected"
                    value={clientSelected}
                    list='clientContent'
                    autoComplete="on"
                    onChange={handleClientSelect}
                  />
                  <datalist id='clientContent'>
                    {clientContent &&
                      clientContent.length > 0 &&
                      clientContent.map((clientSelected, index) => {
                        return <Item item={clientSelected} position={index} key={index} />
                      })
                    }
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="client">Category Type</label>
                  <select id="client" className="form-control" value={chargeType} onChange={onChargeTypeChanged} >
                    <option value="task">Task</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </form>
              <form onSubmit={handleSubmit(onSubmit)} >
                
                {categoryDetail}
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