import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Home = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/home/home")
);
const Clients = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/clients/clients")
);
const Billing = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/billing/billing")
);
const Payments = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/payments/payments")
);
const Invoice = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/invoice/invoice")
);
const Summary = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/summary/summary")
);
const AddNewClient = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/clients/addNewClient")
);
const LogIn = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Components/Login")
);
const SignUp = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Components/SignUp")
);
import { ClientPage } from "../features/clients/clientPage";
import { EditClientForm } from "../features/clients/editClientForm";
// import LogIn from "../components/Login";
// import SignUp from "../components/SignUp";
import { AuthProvider } from "../components/Auth";

class AppRoutes extends React.Component {
  render() {    
    return (
      // <AuthProvider>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route path={ROUTES.CLIENTS} element={<Clients />}></Route>
          <Route path={ROUTES.BILLING} element={<Billing />}></Route>
          <Route path={ROUTES.PAYMENTS} element={<Payments />}></Route>
          <Route path={ROUTES.INVOICE} element={<Invoice />}></Route>
          <Route path={ROUTES.SUMMARY} element={<Summary />}></Route>
          <Route path={ROUTES.ADD_NEW_CLIENT} element={<AddNewClient />}></Route>
          <Route path={ROUTES.LOGIN} element={<LogIn />}></Route>
          <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
          <Route exact path="clients/:clientId" element={<ClientPage />}></Route>
          <Route exact path="editClient/:clientId" element={<EditClientForm />}></Route>
          {/* <Route exact path="/login" element={LogIn} />
          <Route exact path="/signup" element={SignUp} /> */}
        </Routes>
      // </AuthProvider>
    );
  }
}

export default AppRoutes;
