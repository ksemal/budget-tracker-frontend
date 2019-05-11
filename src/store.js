import reducers from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const startState = {
  userToken: localStorage.getItem("TOKEN")
};
const store = createStore(reducers, startState, applyMiddleware(thunk));

export default store;
