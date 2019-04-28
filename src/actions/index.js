import API from "../utils/API";

import history from "../history";

// export const selectTransaction = transaction => {
//   return {
//     type: "SELECT_TRANSACTION",
//     payload: transaction
//   };
// };

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
