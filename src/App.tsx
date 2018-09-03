import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import ScreenSelector from "./components/screens/selector/screen-selector";
import { Provider } from "react-redux";
import Login from "./components/screens/login";
import { store } from "./store";

export default class App extends React.Component {
  public render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <div>
          <h1> </h1>
          <ScreenSelector />
          <Login />
        </div>
      </Provider>
    );
  }
}
