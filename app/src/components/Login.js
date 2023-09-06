import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import { auth, signIn } from "../db/firestore";

const LogIn = () => {
  const navigate = useNavigate()
  // const [currentUser, setCurrentUser] = useState(null);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // const { email, password } = e.target.elements;
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    try {
      signIn(auth, email, password);/*.then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      setCurrentUser(true)*/
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      return navigate('/');
    }
  }, [currentUser])
  
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="centered-container-form">
        <div className="header">Log In</div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className="form-control"
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

export default LogIn;