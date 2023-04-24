import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectAllUsers, fetchUsers } from "../../features/users/usersSlice";
import { User } from "../../features/users/User";

import Construction_OHIO from "Images/Construction_OHIO.jpg"


const Home = () => {
  const [userId, setUserId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const users = useSelector(selectAllUsers)
  
  const onUserChanged = e => setUserId(e.target.value)
  
  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  
  useEffect(() => {
    debugger
    dispatch(fetchUsers())
  }, [dispatch])
  
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
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;