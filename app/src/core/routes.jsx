import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
  import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/welcome")
);
const Motd = loadable(() =>
  import(/* webpackChunkName: "MotdChunk" */ "Pages/motd/motd")
);
const Localization = loadable(() =>
  import(
    /* webpackChunkName: "LocalizationChunk" */ "Pages/localization/localization"
  )
);
const UndoRedo = loadable(() =>
  import(/* webpackChunkName: "UndoRedoChunk" */ "Pages/undoredo/undoredo")
);
const ContextMenu = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/contextmenu/contextmenu")
);
const Home = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/home/home")
);
const Clients = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/clients/clients")
);
const Invoice = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/invoice/invoice")
);

class AppRoutes extends React.Component {
  render() {    
    return (
      <Routes>
        <Route path={ROUTES.WELCOME} element={<Welcome />}></Route>
        <Route path={ROUTES.MOTD} element={<Motd />}></Route>
        <Route path={ROUTES.LOCALIZATION} element={<Localization />}></Route>
        <Route path={ROUTES.UNDOREDO} element={<UndoRedo />}></Route>
        <Route path={ROUTES.CONTEXTMENU} element={<ContextMenu />}></Route>
        <Route path={ROUTES.HOME} element={<Home />}></Route>
        <Route path={ROUTES.CLIENTS} element={<Clients />}></Route>
        <Route path={ROUTES.INVOICE} element={<Invoice />}></Route>
      </Routes>
    );
  }
}

export default AppRoutes;
