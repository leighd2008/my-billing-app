import React from "react";
import { HistoryRouter } from "redux-first-history/rr6";
import { Provider } from "react-redux";
import { AuthProvider } from "../components/Auth";

import AppRoutes from "Core/routes";
import { Nav } from "./nav";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./root.scss";

class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <React.Fragment>
      <AuthProvider>
        
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Nav history={history}></Nav>
            <AppRoutes></AppRoutes>
          </HistoryRouter>
        </Provider>
      </AuthProvider>
      </React.Fragment>
    );
  }
}

export default Root;
