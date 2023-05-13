import React from "react";
import ROUTES from "Constants/routes";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

export const Nav = () => {
  const navigate = useNavigate()
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     mobileMenuActive: false,
  //   };

  //   this.toggleMenu = this.toggleMenu.bind(this);
  //   this.navigate = this.navigate.bind(this);
  // }

  // toggleMenu(_event) {
  //   this.setState({
  //     mobileMenuActive: !this.state.mobileMenuActive,
  //   });
  // }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  // navigate(url) {
  //   this.setState(
  //     {
  //       mobileMenuActive: false,
  //     },
  //     function () {
  //       this.props.navigate(url);
  //     }
  //   );
  // }

  return (
    // <nav
    //   className="navbar is-dark"
    //   role="navigation"
    //   aria-label="main navigation">
    //   <div className="navbar-brand">
    //     <a
    //       role="button"
    //       className={`navbar-burger ${
    //         this.state.mobileMenuActive ? "is-active" : ""
    //       }`}
    //       data-target="navbarBasicExample"
    //       aria-label="menu"
    //       aria-expanded="false"
    //       onClick={this.toggleMenu}>
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //     </a>
    //   </div>
    //   <div
    //     id="navbarBasicExample"
    //     className={`navbar-menu ${
    //       this.state.mobileMenuActive ? "is-active" : ""
    //     }`}>
    //     <div className="navbar-start">
    //     </div>
    //   </div>
    // </nav>
    <nav>
    <section>
      <h1>Redux Essentials Example</h1>

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
            Invoice
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

// function WithNavigate(props){
//   const navigate = useNavigate();
//   return <Nav {...props} navigate={navigate} />
// }

// export default WithNavigate;
