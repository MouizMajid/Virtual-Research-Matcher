import axios from "axios";
import { markSessionExpired } from "./session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only if this request actually carried a login token: that means the session ended
    // while the user was working. A logged-out visitor on a public page also gets a 401
    // from a protected endpoint, and shouldn't be pushed to the login page for it.
    if (error.response?.status === 401 && error.config?.headers?.Authorization) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      markSessionExpired(window.location.pathname + window.location.search);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
