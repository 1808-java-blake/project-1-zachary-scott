import { Store, createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { state } from "./reducers";
import { IState } from "./reducers";

const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk, logger)
  // other store enhancers if any
);

export const store: Store<IState> = createStore(state, enhancer);