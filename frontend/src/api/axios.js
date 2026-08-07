import axios from 'axios';

// Для Vite используем import.meta.env.PROD
const baseURL = import.meta.env.PROD
  ? 'https://theindianstore-backend.onrender.com/api/' // Ссылка на ваш бэкенд на Render
  : 'http://127.0.0.1:8000/api/';                     // Локально для разработки

const API = axios.create({
  baseURL: baseURL,
});

export default API;