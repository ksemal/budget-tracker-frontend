import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import "./index.css";
const startState = {
  userToken: localStorage.getItem("TOKEN")
};

const store = createStore(reducers, startState, applyMiddleware(thunk));
store.subscribe(() => {
  localStorage.setItem("TOKEN", store.getState().userToken);
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
