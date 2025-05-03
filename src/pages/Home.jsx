import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdb from "../api/tmdb"; // Import the Axios instance

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700">
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
        className="text-blue-500 dark:text-blue-400 mt-2 block hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const [animateLinks, setAnimateLinks] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    const fetchTrendingMovies = async () => {
      try {
        const response = await tmdb.get("/trending/movie/week"); // API call
        setMovies(response.data.results); // Store movie data in state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrendingMovies();

    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateLinks(true);
    }, 300); // Small delay for a smoother effect
  }, [darkMode]);

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

      {/* Hero Section */}
      <div className="relative w-full h-[75vh] flex items-center justify-center text-center mt-20 rounded-lg overflow-hidden">
        <img
          src="/banner.jpg"
          alt="Movie Background"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/90"></div>
        <div className="relative z-10 px-8 max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Discover <span className="text-blue-400">Epic Movies</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light text-gray-300">
            Explore thousands of movies, TV shows, and exclusive content at your
            fingertips.
          </p>
          <div
            className={`mt-6 flex flex-col sm:flex-row gap-4 justify-center transition-transform duration-700 ${
              animateLinks
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <Link
              to="/search"
              className="px-6 py-3 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Start Exploring
            </Link>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("trending-movies")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="px-6 py-3 text-lg font-medium border border-white text-white rounded-lg transition transform hover:scale-105 hover:bg-white hover:text-gray-900 shadow-lg"
            >
              Trending Now
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
<div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
  <div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-center md:text-left text-gray-900 dark:text-white">
      Why Choose Movie Explorer?
    </h2>
    <ul className="space-y-3 text-sm md:text-lg text-gray-700 dark:text-gray-300">
      {[
        "Get real-time trending movies",
        "Explore thousands of films and TV shows",
        "Detailed movie descriptions & ratings",
        "Stay updated with the latest releases",
        "Browse movies from all genres and regions",
      ].map((text, index) => (
        <li
  key={index}
  className="flex items-center gap-3 group relative p-2 rounded-lg transition duration-300 hover:bg-blue-50 dark:hover:bg-gray-700/40"
>
  <div className="relative w-8 h-8">
    <svg
      className="w-full h-full z-10 relative group-hover:scale-125 group-hover:-translate-y-1 transition-transform duration-300"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle Stroke Animation */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#22c55e" // Tailwind green-500
        strokeWidth="6"
        strokeDasharray="282.743" // Circumference = 2πr = 2*π*45
        strokeDashoffset="282.743"
        className="group-hover:animate-draw-circle"
      />
      {/* Checkmark Path */}
      <path
        d="M30 52 L45 67 L70 35"
        stroke="#22c55e"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
  <span className="transition duration-300 group-hover:text-green-600 dark:group-hover:text-green-400">
    {text}
  </span>
</li>

      ))}
    </ul>
  </div>


        {/* Illustration */}
        <div className="md:w-1/2 flex justify-end">
          <img
            src="/asset1.png"
            alt="Movie Illustration"
            className="w-full max-w-xs md:max-w-sm max-h-[300px] md:max-h-[350px] object-contain 
             transition duration-500 ease-in-out 
             filter drop-shadow-lg 
             hover:drop-shadow-[0_0_25px_rgba(0,123,255,0.6)] 
             hover:rotate-3 hover:scale-105"
          />
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="p-6" id="trending-movies">
        <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
