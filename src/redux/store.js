/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const middlewares = [logger];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
