import React from "react";
import { Link } from "react-router-dom";
import Sisters from "Images/Sisters.jpg";

export default class Invoice extends React.Component {
  render() {
    return (
    <React.Fragment>
      <section className="section">
        <div className="container">
          <section className="hero is-danger">
            <div className="hero-body">
              <p className="title">Generate an invoice</p>
              {/* <Link to="/">Go back to home</Link>
              <br />
              <Link to="/clients">Go to client page</Link> */}
              <img src={Sisters} alt="Sisters" />
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
    );
  }
}