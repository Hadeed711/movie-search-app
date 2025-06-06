import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import tmdb from "../api/tmdb";
import axios from "../api/axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [animateLinks, setAnimateLinks] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in by verifying token
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  // Fetch favorites only if logged in
  const fetchFavorites = async () => {
    if (!isLoggedIn()) return;

    try {
      const response = await axios.get('/favorites/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // If unauthorized, clear token and reload
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  };

  const fetchTrendingMovies = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await tmdb.get("/trending/movie/week", {
        params: { page }
      });
      
      if (page === 1) {
        setMovies(response.data.results);
      } else {
        setMovies(prev => [...prev, ...response.data.results]);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    fetchTrendingMovies();
    fetchFavorites();

    setTimeout(() => {
      setAnimateLinks(true);
    }, 300);
  }, [darkMode]);

  const handleLoadMore = () => {
    fetchTrendingMovies(currentPage + 1);
  };

  // Handle favorite toggle with proper auth check
  const handleToggleFavorite = async (movie) => {
    if (!isLoggedIn()) {
      setShowLoginPopup(true);
      return;
    }

    const isFavorite = favorites.some(fav => fav.movie_id === movie.id.toString());

    try {
      if (isFavorite) {
        const favorite = favorites.find(fav => fav.movie_id === movie.id.toString());
        if (favorite) {
          await axios.delete(`/favorites/${favorite.id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          setFavorites(prev => prev.filter(fav => fav.movie_id !== movie.id.toString()));
        }
      } else {
        const response = await axios.post("/favorites/", {
          movie_id: movie.id.toString(),
          movie_title: movie.title,
          movie_poster: movie.poster_path
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setFavorites(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setShowLoginPopup(true);
      }
    }
  };

  // Handle view details with auth check
  const handleViewDetails = (e, movieId) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      setShowLoginPopup(true);
    } else {
      navigate(`/movie/${movieId}`);
    }
  };

  // MovieCard component
  const MovieCard = ({ movie }) => {
    const favorite = favorites.find(fav => fav.movie_id === movie.id.toString());

    return (
      <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700">
        <button
          onClick={() => handleToggleFavorite(movie)}
          className={`absolute top-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition ${
            favorite ? "text-red-500" : "text-gray-400"
          }`}
          title={favorite ? "Remove from Favourites" : "Add to Favourites"}
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
        </button>

        <img
          className="w-full rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3 className="text-gray-900 dark:text-white text-lg mt-2 font-semibold">
          {movie.title}
        </h3>
        <Link
          to={`/movie/${movie.id}`}
          onClick={(e) => handleViewDetails(e, movie.id)}
          className="text-blue-500 dark:text-blue-400 mt-2 block hover:underline"
        >
          View Details
        </Link>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-5 right-5 p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition"
        aria-label="Toggle Dark Mode"
      >
        <span
          className={`inline-block transition-transform duration-300 ${
            darkMode ? "animate-spin" : ""
          }`}
        >
          {darkMode ? "🌙" : "☀️"}
        </span>
      </button>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Login Required</h3>
            <p className="mb-6 dark:text-gray-300">
              You need to be logged in to access this feature.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => setShowLoginPopup(false)}
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rest of your component remains the same */}
      {/* ... */}
    </div>
  );
};

export default Home;