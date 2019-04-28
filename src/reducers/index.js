import { combineReducers } from "redux";

// const transactionsReducer = () => {
//   return [
//     {
//       name: "grocery",
//       sum: "100$"
//     },
//     {
//       name: "medical",
//       sum: "10$"
//     },
//     {
//       name: "gas",
//       sum: "150$"
//     }
//   ];
// };

// const selectedTransactionReducer = (selectedTransaction = {}, action) => {
//   if (action.type === "SELECT_TRANSACTION") {
//     return action.payload;
//   }
//   return selectedTransaction;
// };

const getTransactionsReducer = (state = null, action) => {
  if (action.type === "GET_TRANSACTIONS") {
    return action.payload;
  }
  return state;
};

// Landing Page Reducers
const signInUpInputReducer = (state = null, action) => {
  if (action.type === "UPDATE_SIGNIN/UP_INPUT") {
    return { ...state, [action.name]: action.value };
  }
  return state;
};

const createCheckUserReducer = (state = null, action) => {
  if (action.type === "CREATE_USER") {
    return action.payload;
  }
  if (action.type === "CHECK_USER") {
    return action.payload;
  }
  if (action.type === "CLEAR_TOKEN") {
    return action.payload;
  }
  return state;
};

const signUserErrorReducer = (state = null, action) => {
  if (action.type === "SIGN_USER_ERR") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  allTransactions: getTransactionsReducer,
  userCredentials: signInUpInputReducer,
  userToken: createCheckUserReducer,
  signError: signUserErrorReducer
});
