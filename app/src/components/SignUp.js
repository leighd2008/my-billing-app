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
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;