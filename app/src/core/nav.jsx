import React from "react";
import ROUTES from "Constants/routes";
import { NavLink } from "react-router-dom";

export const Nav = () => {

  return (
    <nav>
      <section>
        <h1> </h1>
        <div className="navContent">
          <div className="navLinks">
          <NavLink
              className="navbar-item"
              to={ROUTES.HOME}>
              Home
            </NavLink>
            <NavLink
              className="navbar-item"
              to={ROUTES.CLIENTS}>
              Client list
            </NavLink>
            <NavLink
              className="navbar-item"
              to={ROUTES.BILLING}>
              Billing
            </NavLink>
            <NavLink
              className="navbar-item"
              to={ROUTES.PAYMENTS}>
              Payments
            </NavLink>
            <NavLink
              className="navbar-item"
              to={ROUTES.INVOICE}>
              Past Invoices
            </NavLink>
            <NavLink
              className="navbar-item"
              to={ROUTES.ADD_NEW_CLIENT}>
              Add New Client
            </NavLink>
          </div>
        </div>
      </section>
  </nav>
  );
}
