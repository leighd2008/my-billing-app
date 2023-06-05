import React from "react";
import { Link } from "react-router-dom";

export default class Invoice extends React.Component {
  render() {
    return (
    <React.Fragment>
      <section className="section">
        <div className="centered-view">
          <section className="centered-container">
            <div className="">
              <p className="title">Generate an invoice</p>
            </div>
          </section>
        </div>
      </section>
    </React.Fragment>
    );
  }
}