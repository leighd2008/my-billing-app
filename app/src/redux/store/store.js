import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
// import homeReducer from "../components/home/homeSlice";
import clientsReducer from '../../features/clients/clientsSlice'
import usersReducer from '../../features/users/usersSlice'

const {
  routerMiddleware,
  createReduxHistory,
  routerReducer
} = createReduxHistoryContext({
  history: createHashHistory()
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    // home: homeReducer,
    clients: clientsReducer,
    users: usersReducer
  }),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware]
});

export const history = createReduxHistory(store);