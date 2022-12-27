import React from "react";
import ROUTES from "Constants/routes";
import { useNavigate } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuActive: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  toggleMenu(_event) {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page
  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.props.navigate(url);
      }
    );
  }

  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger ${
              this.state.mobileMenuActive ? "is-active" : ""
            }`}
            data-target="navbarBasicExample"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.toggleMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${
            this.state.mobileMenuActive ? "is-active" : ""
          }`}>
          <div className="navbar-start">
            <a
              className="navbar-item"
              onClick={() => this.navigate(ROUTES.WELCOME)}>
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Sample pages</a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.MOTD)}>
                  Using the Electron store
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.LOCALIZATION)}>
                  Changing locales
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.UNDOREDO)}>
                  Undo/redoing actions
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.CONTEXTMENU)}>
                  Custom context menu
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.HOME)}>
                  My billing app
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.CLIENTS)}>
                  Client list
                </a>
                <a
                  className="navbar-item"
                  onClick={() => this.navigate(ROUTES.INVOICE)}>
                  Invoice
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function WithNavigate(props){
  const navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />
}

export default WithNavigate;
