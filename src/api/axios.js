// src/api/axios.js
import axios from "axios";

export default axios.create({
  // Change from https to http for local development
  baseURL: "https://movie-back-production-fe11.up.railway.app/api",
 // Django development server
  headers: {

    "Content-Type": "application/json",
  },
});

