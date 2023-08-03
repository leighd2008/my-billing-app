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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LogIn;