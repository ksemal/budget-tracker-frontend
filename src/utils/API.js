import axios from "axios";

import setupHeaders from "./config";
const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://api.ksemal.com/api/"
    : "http://localhost:3001/api/";

axios.defaults.baseURL = API_URL;

setupHeaders();

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
  },
  setBudget: function(data) {
    return axios.put(API_URL + "categories/" + data.category.id, data);
  },
  getStatistic: function(date) {
    return axios.get(API_URL + "statistics", {
      params: date
    });
  },
  getBudgetExpenses: function() {
    return axios.get(API_URL + "budgets");
  }
};
