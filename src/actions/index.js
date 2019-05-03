import API from "../utils/API";
import history from "../history";

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
        dispatch({ type: "CREATE_USER", payload: response.data.jwt });
        history.push("/dashboard");
      },
      err => {
        console.log(err.response.data.error);
        dispatch({
          type: "SIGN_USER_ERR",
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
        dispatch({ type: "CHECK_USER", payload: response.data.jwt });
        history.push("/dashboard");
      },
      err => {
        console.log(err.response.data.error);
        dispatch({
          type: "SIGN_USER_ERR",
          payload: err.response.data.error
        });
      }
    );
  };
};

export const signOut = state => {
  console.log(state);
  return {
    type: "CLEAR_TOKEN",
    payload: ""
  };
};

//Transactions actions

export const getTransactions = () => {
  return function(dispatch, getState) {
    API.getTransactions().then(
      response => {
        dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_TRANSACTIONS", payload: err });
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
          response => {
            dispatch({ type: "GET_WALLETS", payload: response.data });
            dispatch({ type: "REMOVE_TRANSACTION", payload: state });
          },
          err => {
            dispatch({ type: "GET_TRANSACTIONS", payload: err });
          }
        );
      },
      err => {
        dispatch({ type: "REMOVE_TRANSACTION", payload: err });
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
        dispatch({ type: "GET_WALLETS", payload: err });
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
        dispatch({ type: "ADD_WALLET", payload: updatedState });
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
          response => {
            dispatch({ type: "REMOVE_WALLET", payload: state });
            dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
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
        console.log(response.data);
        dispatch({ type: "GET_CATEGORIES", payload: response.data });
      },
      err => {
        dispatch({ type: "GET_CATEGORIES", payload: err });
      }
    );
  };
};
