import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Spinner } from '../../components/Spinner'

import { selectAllUsers, fetchUsers } from "../../features/users/usersSlice";
import { User } from "../../features/users/User";

import Construction_OHIO from "Images/Construction_OHIO.jpg"


const Home = () => {
  const [userId, setUserId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const users = useSelector(selectAllUsers)
  
  const userStatus = useSelector(state => state.users.status)
  const error = useSelector(state => state.users.error)
  
  const onUserChanged = e => setUserId(e.target.value)
  
  useEffect(() => {
    if (userStatus === 'idle') {
      debugger
      dispatch(fetchUsers())
  }
  }, [userStatus, dispatch])
  
  let content
  
  if(userStatus === 'loading') {
    content = ""
  } else if (userStatus === 'succeeded') {
    content = users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>))
  } else if (userStatus === 'failed') {
    content = <option>{error}</option>
  }
  
  return (
    <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-danger">
              <div className="hero-body">
                <select id="user" value={userId} onChange={onUserChanged} >
                  <option value="">Users</option>
                  {content}
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