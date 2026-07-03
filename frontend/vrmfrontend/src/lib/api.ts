import axios from "axios";

// 1. create a custom axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 2. interceptor — runs before EVERY request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default api;