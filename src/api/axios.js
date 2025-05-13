// src/api/axios.js
import axios from "axios";

export default axios.create({
  // Change from https to http for local development
  baseURL: import.meta.env.VITE_API_URL,
 // Django development server
  headers: {

    "Content-Type": "application/json",
  },
});

