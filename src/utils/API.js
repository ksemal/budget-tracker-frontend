import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001/api/";
axios.defaults.baseURL = API_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.TOKEN
};

export default {
  createUser: function(data) {
    return axios.post(API_URL + "users/create", data);
  },
  checkUser: function(data) {
    return axios.post(API_URL + "user_token", data);
  },
  getTransactions: function(date) {
    return axios.get(API_URL + "transactions", {
      params: date
    });
  },
  addTransaction: function(transaction) {
    return axios.post(API_URL + "transactions/", transaction);
  },
  removeTransaction: function(id) {
    return axios.delete(API_URL + "transactions/" + id);
  },
  getWallets: function() {
    return axios.get(API_URL + "wallets");
  },
  addWallet: function(newWallet) {
    return axios.post(API_URL + "wallets", newWallet);
  },
  removeWallet: function(id) {
    return axios.delete(API_URL + "wallets/" + id);
  },
  getCategories: function() {
    return axios.get(API_URL + "categories");
  },
  addCategory: function(category) {
    return axios.post(API_URL + "categories", category);
  },
  removeCategory: function(id) {
    return axios.delete(API_URL + "categories/" + id);
  },
  getSummary: function() {
    return axios.get(API_URL + "summary");
  }
};
