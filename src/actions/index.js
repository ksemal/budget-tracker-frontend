import API from "../utils/API";
import setupHeaders from "../utils/config";
// Landing Page Actions
export const handleSignInUpInput = (name, value) => {
  return {
    type: "UPDATE_SIGNIN/UP_INPUT",
    name: name,
    value: value
  };
};

export const handleSignUpSubmit = () => {
  return function(dispatch, getState) {
    const email = getState().userCredentials.email_signup;
    const password = getState().userCredentials.password_signup;
    const password_confirm = getState().userCredentials.password_signup_confirm;
    const data = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirm
      }
    };
    API.createUser(data).then(
      response => {
        localStorage.setItem("TOKEN", response.data.token);
        setupHeaders();
        dispatch({ type: "CREATE_USER", payload: response.data.token });
      },
      err => {
        dispatch({
          type: "SIGN_UP_USER_ERR",
          payload: err.response.data.error
        });
      }
    );
  };
};

export const handleSignInSubmit = () => {
  return function(dispatch, getState) {
    const email = getState().userCredentials.email_signin;
    const password = getState().userCredentials.password_signin;
    const data = {
      auth: {
        email: email,
        password: password
      }
    };
    API.checkUser(data).then(
      response => {
        localStorage.setItem("TOKEN", response.data.jwt);
        setupHeaders();
        dispatch({ type: "CHECK_USER", payload: response.data.jwt });
      },
      err => {
        if (err) {
          dispatch({
            type: "SIGN_IN_USER_ERR",
            payload: "Ooops! Check your username and password"
          });
        }
      }
    );
  };
};

export const signOut = state => {
  setupHeaders();
  return {
    type: "CLEAR_TOKEN",
    payload: ""
  };
};

//Transactions actions

export const getTransactions = date => {
  return function(dispatch, getState) {
    API.getTransactions(date).then(
      response => {
        dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_TRANSACTIONS_ERR", payload: err });
      }
    );
  };
};

export const removeTransaction = id => {
  return function(dispatch, getState) {
    API.removeTransaction(id).then(
      response => {
        let state = getState().allTransactions.filter(
          element => element.id !== id
        );
        API.getWallets().then(
          wallets => {
            API.getSummary().then(statistic => {
              dispatch({ type: "GET_SUMMARY", payload: statistic.data });
              dispatch({ type: "GET_WALLETS", payload: wallets.data });
              dispatch({ type: "REMOVE_TRANSACTION", payload: state });
            });
          },
          err => {
            dispatch({ type: "GET_WALLETS_ERR", payload: err });
          }
        );
      },
      err => {
        dispatch({ type: "REMOVE_TRANSACTION_ERR", payload: err });
      }
    );
  };
};

export const addTransaction = (wallet, amount, category, notes, datetime) => {
  return function(dispatch, getState) {
    let transaction = {
      transaction: {
        wallet_id: wallet,
        amount: amount,
        category_id: category,
        notes: notes,
        datetime: datetime
      }
    };
    API.addTransaction(transaction).then(
      transaction => {
        let state = [...getState().allTransactions, transaction.data];
        API.getWallets().then(
          wallets => {
            API.getSummary().then(statistic => {
              dispatch({ type: "GET_SUMMARY", payload: statistic.data });
              dispatch({ type: "GET_WALLETS", payload: wallets.data });
              dispatch({ type: "ADD_TRANSACTION", payload: state });
              dispatch({
                type: "TRANSACTION_ADDED",
                payload: "New transaction has been added"
              });
            });
          },
          err => {
            dispatch({ type: "GET_WALLETS", payload: err });
          }
        );
      },
      err => {
        dispatch({ type: "TRANSACTION_ADDED", payload: err });
      }
    );
  };
};
//Wallets actions

export const getWallets = () => {
  return function(dispatch, getState) {
    API.getWallets().then(
      response => {
        dispatch({ type: "GET_WALLETS", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_WALLETS_ERR", payload: err });
      }
    );
  };
};

export const addWallet = (name, total) => {
  const newWallet = {
    wallet: {
      name,
      total
    }
  };
  return function(dispatch, getState) {
    API.addWallet(newWallet).then(
      response => {
        let updatedState = [...getState().wallets, response.data];
        API.getSummary().then(statistic => {
          dispatch({ type: "GET_SUMMARY", payload: statistic.data });
          dispatch({ type: "ADD_WALLET", payload: updatedState });
        });
      },
      err => {
        dispatch({ type: "ADD_WALLET", payload: err });
      }
    );
  };
};
export const removeWallet = id => {
  return function(dispatch, getState) {
    API.removeWallet(id).then(
      response => {
        let state = getState().wallets.filter(element => element.id !== id);
        API.getTransactions().then(
          transactions => {
            API.getSummary().then(statistic => {
              dispatch({ type: "GET_SUMMARY", payload: statistic.data });
              dispatch({ type: "REMOVE_WALLET", payload: state });
              dispatch({
                type: "GET_TRANSACTIONS",
                payload: transactions.data
              });
            });
          },
          err => {
            dispatch({ type: "GET_TRANSACTIONS", payload: err });
          }
        );
      },
      err => {
        dispatch({ type: "REMOVE_WALLET", payload: err });
      }
    );
  };
};

// Categories actions
export const getCategories = () => {
  return function(dispatch, getState) {
    API.getCategories().then(
      response => {
        dispatch({ type: "GET_CATEGORIES", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_CATEGORIES", payload: err });
      }
    );
  };
};

export const addNewCategory = name => {
  return function(dispatch, getState) {
    let newCategory = {
      category: {
        name: name
      }
    };

    API.addCategory(newCategory).then(
      response => {
        let updatedCategories = [...getState().categories, response.data];
        dispatch({ type: "ADD_CATEGORY", payload: updatedCategories });
      },
      err => {
        dispatch({ type: "ADD_CATEGORY", payload: err });
      }
    );
  };
};

export const removeCategory = id => {
  return function(dispatch, getState) {
    API.removeCategory(id).then(
      response => {
        let state = getState().categories.filter(element => element.id !== id);
        dispatch({ type: "REMOVE_CATEGORY", payload: state });
      },
      err => {
        dispatch({ type: "REMOVE_CATEGORY", payload: err });
      }
    );
  };
};

// Statistic actions

export const getSummary = () => {
  return function(dispatch, getState) {
    API.getSummary().then(
      statistic => {
        dispatch({ type: "GET_SUMMARY", payload: statistic.data });
      },
      err => {
        dispatch({ type: "GET_SUMMARY_ERR", payload: err });
      }
    );
  };
};

export const getStatistic = date => {
  return function(dispatch, getState) {
    API.getStatistic(date).then(
      statistic => {
        if (
          statistic.data.expenditures.length &&
          statistic.data.income.length
        ) {
          dispatch({
            type: "GET_STATISTIC_EXPENSES",
            payload: statistic.data.expenditures
          });
          dispatch({
            type: "GET_STATISTIC_INCOME",
            payload: statistic.data.income
          });
        } else if (
          !statistic.data.expenditures.length &&
          statistic.data.income.length
        ) {
          dispatch({
            type: "GET_STATISTIC_EXPENSES",
            payload: ""
          });
          dispatch({
            type: "GET_STATISTIC_INCOME",
            payload: statistic.data.income
          });
        } else if (
          statistic.data.expenditures.length &&
          !statistic.data.income.length
        ) {
          dispatch({
            type: "GET_STATISTIC_EXPENSES",
            payload: statistic.data.expenditures
          });
          dispatch({
            type: "GET_STATISTIC_INCOME",
            payload: ""
          });
        } else {
          dispatch({
            type: "GET_STATISTIC_EXPENSES",
            payload: ""
          });
          dispatch({
            type: "GET_STATISTIC_INCOME",
            payload: ""
          });
        }
      },
      err => {
        dispatch({ type: "GET_STATISTIC_ERR", payload: err });
      }
    );
  };
};

// Budget actions
export const setBudget = (budget, id) => {
  return function(dispatch, getState) {
    const budget_obj = {
      category: {
        budget: budget,
        id: id
      }
    };
    API.setBudget(budget_obj).then(
      budget => {
        API.getCategories().then(response => {
          dispatch({ type: "GET_CATEGORIES", payload: response.data });
        });
      },
      err => {
        dispatch({ type: "SET_BUDGET_ERR", payload: err });
      }
    );
  };
};

export const getBudgetExpenses = (budget, id) => {
  return function(dispatch, getState) {
    API.getBudgetExpenses().then(
      response => {
        dispatch({ type: "GET_BUDGET_EXPENSES", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_BUDGET_EXPENSES_ERR", payload: err });
      }
    );
  };
};
