import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import ScreenSelector from "./components/screens/selector/screen-selector";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorMessage from "./components/error-message";

export default class App extends React.Component {
  public render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <div id="main-div">
          <h1> </h1>
          <ScreenSelector />
          <ErrorMessage />
        </div>
      </Provider>
    );
  }
}
