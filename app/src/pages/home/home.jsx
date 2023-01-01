import React from "react";
// import ROUTES from "Constants/routes";
// import { Link } from "react-router-dom";

import Construction_OHIO from "Images/Construction_OHIO.jpg"


const Home = () => {
  
  return (
    <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-danger">
              <div className="hero-body">
                <p className="title">Go Bucks!</p>
                <img src={Construction_OHIO} alt="Construction_OHIO"></img>
              </div>
              {/* <div>
                <Link to={ROUTES.HOME}>Billing App Home Page</Link> <br />
                <Link to={ROUTES.CLIENTS}>Billing App Clients Page</Link> <br />
                <Link to={ROUTES.INVOICE}>Billing App Invoice page</Link> <br />
              </div> */}
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;