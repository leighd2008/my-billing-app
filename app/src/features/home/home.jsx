import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth";
import { auth } from "../../db/firestore";
import { signOut } from "firebase/auth";

import LogIn from "../../components/Login";
import SignUp from "../../components/SignUp"

const Home = () => {
  const { currentUser } = useContext(AuthContext);
   
  return (
    <React.Fragment>
        <section className="section">
          <div className="centered-view">
            <section className="centered-container">
              <div className="">
                <form className="centered-container-form">
                  <div className="header"><h1>Welcome</h1></div>
                  {currentUser ? (
                    <>
                      <p>If you can see this you are logged in.</p>
                      <button onClick={() =>signOut(auth)}>Sign out</button> 
                    </>
                  ) : (
                    <span>
                      <LogIn />
                      <SignUp />
                    </span>
                  )}
                </form>
              </div>
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;