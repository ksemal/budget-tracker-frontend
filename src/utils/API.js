import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";
axios.defaults.baseURL = API_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.TOKEN
};

export default {
  getTransactions: function() {
    return axios.get(API_URL + "/api/transactions");
  },
  createUser: function(data) {
    return axios.post(API_URL + "/api/users/create", data);
  },
  checkUser: function(data) {
    return axios.post(API_URL + "/user_token", data);
  }
};
