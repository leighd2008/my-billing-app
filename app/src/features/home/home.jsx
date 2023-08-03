import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth";
import { auth } from "../../db/firestore";
import { signOut } from "firebase/auth";


const Home = () => {
  const { currentUser } = useContext(AuthContext);
   
  return (
    <React.Fragment>
        <section className="section">
          <div className="centered-view">
            <section className="centered-container">
              <div className="">
                <h1>Welcome</h1>
                {currentUser ? (
                  <>
                    <p>If you can see this you are logged in.</p>
                    <button onClick={() =>signOut(auth)}>Sign out</button> 
                  </>
                ) : (
                  <span>
                  <Link to="/login">Log In</Link> 
                  <p>or</p> 
                  <Link to="/signup">Sign Up</Link>
                  </span>
                )}
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;