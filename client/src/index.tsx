import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//redux
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
//selam
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

