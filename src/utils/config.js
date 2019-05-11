import axios from "axios";

export default function setupHeaders() {
  let token = localStorage.getItem("TOKEN");
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
}
