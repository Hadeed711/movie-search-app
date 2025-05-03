// src/api/axios.js
import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: "https://your-backend-url.com/api/", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token from localStorage to headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
