import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Home = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/home/home")
);
const Clients = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/clients/clients")
);
const Invoice = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/invoice/invoice")
);
const AddNewClient = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Features/clients/addNewClient")
);
import { ClientPage } from "../features/clients/clientPage";
// const ClientPage = loadable(() =>
//   import(/* webpackChunkName: "ContextMenuChunk" */ "Features/clients/clientPage")
// );
class AppRoutes extends React.Component {
  render() {    
    return (
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />}></Route>
        <Route path={ROUTES.CLIENTS} element={<Clients />}></Route>
        <Route path={ROUTES.INVOICE} element={<Invoice />}></Route>
        <Route path={ROUTES.ADD_NEW_CLIENT} element={<AddNewClient />}></Route>
        <Route exact path="clients/:clientId" element={<ClientPage />}></Route>
        
      </Routes>
    );
  }
}

export default AppRoutes;
