import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../components/Auth";

import { selectAllClients, fetchClients, addCharge, selectClientById } from "../clients/clientsSlice";
import { selectAllUsers, fetchUsers, selectUserById } from "../users/usersSlice";

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
  
  const onChargeTypeChanged = e => {
    setChargeType(e.target.value)
  }
  
  const client = useSelector(state => selectClientById(state, clientId))
  
  let curr = new Date()
  curr.setDate(curr.getDate())
  const [chargeDate, setChargeDate] = useState(curr.toISOString().substring(0,10))
  const [chargeDate2, setChargeDate2] = useState(curr.toISOString().substring(0,10))
  const [hours, setHours] = useState('')
  const [fee, setFee] = useState('')
  const [userId, setUserId] = useState('GcO8emvrf4eQSScHsQDh')
  
  let dateList = []
  for (let i = -7; i < 8; i++) {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() + i)
    dateList = [...dateList, newDate.toISOString().substring(0,10)]
  }
  
  let dateContent = dateList.map((date, i )=> (
      <option key={i} value={date}>{date}</option>
      ))
  
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
  const onChargeDate2Changed = e => setChargeDate2(e.target.value)
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
    
    const tasks = ["Calc", "Conf", "Consult", "Copy", "Deliver", "Depo", "Draft", "Email oc", "Email c", "Forward", "Hrg", "LTOC", "LTR", "Mediation", "Meeting", "Open", "PC", "PCA", "Prep", "Research", "Review", "Revise", "SC", "Scan & Email", "Sched", "Trial"]
    
    const [task, setTask] = useState('')
    const [expense, setExpense] = useState('')
    
    const handleTaskSelect = e => setTask(e.target.value)
      
    const handleExpenseSelect = e => {
      setExpense(e.target.value)  
      if(e.target.value === "Arrears Calculation") {
        setFee(59)
      } else if(e.target.value === "Runner Service Fee") {
        setFee(15)
      } else if(e.target.value === "Subpoena Issue Fee") {
        setFee(40)
      } else if(e.target.value === "e-File Processing Fee") {
        setFee(6.70)
      }
    }
      
  const expenses = ["Arrears Calculation", "Close file", "Consult", "Court Reporter Fee", "Error/Correction", "Filing Fee", "Postage", "Records", "Returned", "Runner Service Fee", "Service Fee", "Subpoena Issue Fee", "Transcript", "Witness Fee", "e-File Processing Fee"]
  
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
              {expenses &&
                expenses.length > 0 &&
                expenses.map((expense, index) => {
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
      // if (confirm(`Click OK to proceed or Cancel to start over! \n Date: ${charge.date} \n Category: ${charge.category} \n Fee: ${charge.fee} \n Total charge: ${charge.total} ` )) 
      {
        data.charges = [...charges, charge]
        data.id = clientId
      }
    } else {
      charge = { id: chargeId, chargeType: 'task', date: data.date, category: data.task, user: user.name, rate: user.rate, hours: (data.hours*1).toFixed(1), total: (user.rate * data.hours).toFixed(2), invoiced: false}
      // if (confirm(`Click OK to proceed or Cancel to start over! \n Date: ${charge.date} \n Category: ${charge.category} \n Staff Member: ${charge.user} \n Rate: ${charge.rate} \n Billable hours: ${charge.hours} \n Total charge: ${charge.total} ` ))
      {
        data.charges = [...charges, charge]
        data.id = clientId
      }
    }
    console.log(data.fee)
    
    dispatch(addCharge(data))
    setClientSelected("")
    setChargeType("task")
    setChargeDate(curr.toISOString().substring(0,10))
    setUserId("GcO8emvrf4eQSScHsQDh")
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