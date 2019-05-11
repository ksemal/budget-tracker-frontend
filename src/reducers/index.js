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
// Transactions reducers

const getTransactionsReducer = (state = null, action) => {
  if (action.type === "GET_TRANSACTIONS") {
    return action.payload;
  }
  if (action.type === "REMOVE_TRANSACTION") {
    return action.payload;
  }
  if (action.type === "ADD_TRANSACTION") {
    return action.payload;
  }
  return state;
};
// Wallets reducers
const getWalletsReducer = (state = null, action) => {
  if (action.type === "GET_WALLETS") {
    return action.payload;
  }
  if (action.type === "ADD_WALLET") {
    return action.payload;
  }
  if (action.type === "REMOVE_WALLET") {
    return action.payload;
  }
  return state;
};

// Categories reducers
const getCategoriesReducer = (state = null, action) => {
  if (action.type === "GET_CATEGORIES") {
    return action.payload;
  }
  if (action.type === "ADD_CATEGORY") {
    return action.payload;
  }
  if (action.type === "REMOVE_CATEGORY") {
    return action.payload;
  }
  if (action.type === "SET_BUDGET") {
    return action.payload;
  }

  return state;
};

const confirmationReducer = (state = null, action) => {
  if (action.type === "TRANSACTION_ADDED") {
    return action.payload;
  }
  return false;
};

// Statistic reducers

const summaryReducer = (state = "", action) => {
  if (action.type === "GET_SUMMARY") {
    return action.payload;
  }
  return state;
};

const statisticReducer = (state = "", action) => {
  if (action.type === "GET_STATISTIC") {
    return action.payload;
  }
  return state;
};
const budgetExpensesReducer = (state = "", action) => {
  if (action.type === "GET_BUDGET_EXPENSES") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  allTransactions: getTransactionsReducer,
  userCredentials: signInUpInputReducer,
  userToken: createCheckUserReducer,
  signError: signUserErrorReducer,
  wallets: getWalletsReducer,
  categories: getCategoriesReducer,
  transactionAdded: confirmationReducer,
  summary: summaryReducer,
  statistic: statisticReducer,
  budgetExpenses: budgetExpensesReducer
});
