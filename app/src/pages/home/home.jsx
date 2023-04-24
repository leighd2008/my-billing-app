import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { User } from "../../features/users/User";

import Construction_OHIO from "Images/Construction_OHIO.jpg"


const Home = () => {
  const [userId, setUserId] = useState('')
  // const [clientId, setClientId] = useState('')
  
  const navigate = useNavigate()
  
  const users = useSelector(state => state.users)
  // const clients = useSelector(state => state.clients)
  
  const onUserChanged = e => setUserId(e.target.value)
  // const onClientChanged = e => {
  //   setClientId(e.target.value)
  //   navigate(`/clients/${e.target.value}`)
  // }
  
  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  
  // const clientOptions = clients.map(client => (
  //   <option key={client.id} value={client.id}>
  //     {client.firstName} {client.lastName}
  //   </option>
  // ))
  
  return (
    <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-danger">
              <div className="hero-body">
                <select id="user" value={userId} onChange={onUserChanged} >
                  <option value="">Users</option>
                  {userOptions}
                </select>
                <p className="title">Go Bucks!</p>
                <img src={Construction_OHIO} alt="Construction_OHIO"></img>
                <User userId={userId} />
                <br />
                {/* <select id="clients" value={clientId} onChange={onClientChanged} >
                  <option value="">Client List</option>
                  {clientOptions}
                </select> */}
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;