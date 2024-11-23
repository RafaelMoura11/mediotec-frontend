import axios from 'axios';

const api = axios.create({
  baseURL: "https://api-mediotec-v2-teste.onrender.com/",
});

export default api;
