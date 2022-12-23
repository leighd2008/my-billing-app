import React from "react";
import { Link } from "react-router-dom";
import Sisters from "Images/Sisters.jpg";

export default class Invoice extends React.Component {
  render() {
    return (
      <div>
        <h1>Generate an invoice</h1>
        <Link to="/">Go back to home</Link>
        <br />
        <Link to="/clients">Go to client page</Link>
        <div>
          <img src={Sisters} alt="Sisters" />
        </div>
      </div>
    );
  }
}