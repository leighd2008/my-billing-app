import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
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
    clients: clientsReducer,
    users: usersReducer
  }),
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(routerMiddleware))
});

export const history = createReduxHistory(store);