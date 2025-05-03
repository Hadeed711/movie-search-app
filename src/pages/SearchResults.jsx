import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "./NotFound"; // Import NotFound component

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const PLACEHOLDER_IMAGE = "/placeholder.jpg"; // Gray icon image

const SearchResults = ({ darkMode }) => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null); // Reset errors
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        setMovies(response.data.results);
      } catch (err) {
        setError("⚠️ Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading)
    return <p className="text-center text-gray-600 dark:text-gray-300">🔍 Searching...</p>;

  if (error)
    return <p className="text-center text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className={`p-6 mt-20 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-blue-500 dark:text-blue-300 text-2xl font-semibold">
        Showing results for: <span className="text-blue-400 dark:text-blue-500">"{query}"</span>
      </h2>

      {movies.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              {movie.poster_path ? (
                <img
                  className="w-full h-64 object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <img src={PLACEHOLDER_IMAGE} alt="Placeholder" className="w-16 opacity-60" />
                </div>
              )}
              <h3 className="text-yellow-500 dark:text-yellow-400 text-lg mt-2 font-semibold">
                {movie.title}
              </h3>
              <Link
                to={`/movie/${movie.id}`}
                className="text-blue-400 dark:text-blue-300 mt-2 block hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
