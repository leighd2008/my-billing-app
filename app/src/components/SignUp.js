import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth, signUp } from "../db/firestore";

const SignUp = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    try {
      signUp(auth, email, password).then((userCredential) => {
        // Signed in
        setCurrentUser(true)
      })
      
    } catch (error) {
      alert(error)
    }
  };
  
  useEffect(() => {
    if (currentUser) {
      return navigate('/');
    }
  }, [currentUser])
  
  return (
      <div className="">
        <form onSubmit={handleSubmit} className="centered-container-form">
          <div className="header">Sign UP</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                className="form-control"
                name="email" 
                placeholder="Email" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                className="form-control"
                name="password" 
                placeholder="Password" 
              />
            </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;