import React from "react";

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
            </section>
          </div>
        </section>
      </React.Fragment>
    );
}

export default Home;