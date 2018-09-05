import { Store, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
// import logger from "redux-logger";
import { state } from "./reducers";
import { IState } from "./reducers";

// const a: any = window;
// const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(
//   , logger)
//   // other store enhancers if any
// );

export const store: Store<IState> = createStore(
  state,
  applyMiddleware(reduxThunk)
);
