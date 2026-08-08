import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://theindianstore-backend.onrender.com/api/"
  : "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL,
});

export default API;