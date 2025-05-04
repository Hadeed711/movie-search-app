// src/api/axios.js
import axios from "axios";

export default axios.create({
  // Change from https to http for local development
  baseURL: "http://localhost:8000/api", // Django development server
  headers: {

    "Content-Type": "application/json",
  },
});

