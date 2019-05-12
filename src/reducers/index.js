import { combineReducers } from "redux";

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

const signInUserErrorReducer = (state = null, action) => {
  if (action.type === "SIGN_IN_USER_ERR") {
    return action.payload;
  }
  return state;
};
const signUpUserErrorReducer = (state = null, action) => {
  if (action.type === "SIGN_UP_USER_ERR") {
    return action.payload;
  }
  return state;
};
// Transactions reducers

const getTransactionsReducer = (state = [], action) => {
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
const getCategoriesReducer = (state = [], action) => {
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

const statisticIncomeReducer = (state = "", action) => {
  if (action.type === "GET_STATISTIC_INCOME") {
    return action.payload;
  }
  return state;
};
const statisticExpensesReducer = (state = "", action) => {
  if (action.type === "GET_STATISTIC_EXPENSES") {
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
  signInError: signInUserErrorReducer,
  signUpError: signUpUserErrorReducer,
  wallets: getWalletsReducer,
  categories: getCategoriesReducer,
  transactionAdded: confirmationReducer,
  summary: summaryReducer,
  statisticIncome: statisticIncomeReducer,
  statisticExpenses: statisticExpensesReducer,
  budgetExpenses: budgetExpensesReducer
});
