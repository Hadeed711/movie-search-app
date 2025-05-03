import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Get API Key from .env
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, // Attach API key to every request
    language: "en-US",
  },
});

export default tmdb;
