import axios from "axios";

// 1. create a custom axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // 👈 your backend URL, change once here
});

// 2. interceptor — runs before EVERY request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 👈 attached to every call
  }
  return config;
});

export default api;