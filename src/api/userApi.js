import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Backend URL from .env
});

api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.data?.accessToken) {
    config.headers.Authorization = `Bearer ${user.data.accessToken}`;
  }
  return config;
});

export const loginUser   = (credentials) => api.post("/auth/login", credentials);
export const getUsers    = (params)       => api.get("/users", { params }); 
export const getFavUsers = (params)      => api.get("/users/favorites", { params });
export const getUserById = (id)           => api.get(`/users/${id}`);