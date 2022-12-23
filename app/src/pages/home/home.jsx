import React from "react";
import { NavLink } from "react-router-dom";

import Construction_OHIO from "Images/Construction_OHIO.jpg"


const Home = () => {
  
  return (
      <div className="App">
        <h1>Billing App</h1>
        <NavLink to="/invoice">Go to invoice page</NavLink>
        <br />
        <NavLink to="/clients">Go to client page</NavLink>
        <div>
          <img src={Construction_OHIO} alt="Construction_OHIO"></img>
        </div>
      </div>
    );
}

export default Home;