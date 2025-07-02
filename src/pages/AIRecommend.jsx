import { useState } from "react";
import tmdb from "../api/tmdb";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function AIRecommend() {
  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const isLoggedIn = () => !!localStorage.getItem("access_token");

  const handleRecommend = async () => {
    setLoading(true);
    setRecommendation("");
    setMovies([]);

    try {
      const res = await fetch(
        "https://web-production-94cb.up.railway.app/api/recommend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      const text = data.recommendation || "No recommendation found.";
      setRecommendation(text);

      const extractedTitles = Array.from(
        new Set(
          [...text.matchAll(/(?:\d\.?\s)?([^:(\n]+)/g)].map((m) => m[1].trim())
        )
      ).filter((title) => title.length > 1);

      const movieResults = [];
      for (const title of extractedTitles) {
        try {
          const tmdbRes = await tmdb.get("/search/movie", {
            params: { query: title },
          });
          if (tmdbRes.data.results.length > 0) {
            movieResults.push(tmdbRes.data.results[0]);
          }
        } catch (e) {
          console.error("TMDB fetch failed for:", title);
        }
      }

      setMovies(movieResults);
    } catch (err) {
      setRecommendation("An error occurred.");
    }

    setLoading(false);
  };

  const handleToggleFavorite = async (movie) => {
    const isFavorite = favorites.some(
      (fav) => fav.movie_id === movie.id.toString()
    );

    if (!isLoggedIn()) return;

    try {
      if (isFavorite) {
        const favorite = favorites.find(
          (fav) => fav.movie_id === movie.id.toString()
        );
        if (favorite) {
          await axios.delete(`/favorites/${favorite.id}/`);
          setFavorites((prev) =>
            prev.filter((fav) => fav.movie_id !== movie.id.toString())
          );
        }
      } else {
        const response = await axios.post("/favorites/", {
          movie_id: movie.id.toString(),
          movie_title: movie.title,
          movie_poster: movie.poster_path,
        });
        setFavorites((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24 px-4">
      <h1 className="text-3xl font-bold mb-8">
        🎬 <span className="text-teal-400">AI-Powered</span> Movie Recommender
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-xl">
        <input
          type="text"
          placeholder="Type something like: Recommend a thriller movie like Inception"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 rounded-md border border-teal-400 mb-4 bg-zinc-800 text-white"
        />

        <button
          onClick={handleRecommend}
          disabled={loading}
          className="w-full p-4 bg-teal-400 text-black font-bold rounded-md hover:bg-teal-300 transition"
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse w-6 h-6 bg-teal-400 rounded-full"></div>
          </div>
        )}

        {!loading && recommendation && (
          <div className="mt-6 bg-zinc-800 border border-teal-400 rounded-md p-6">
            <h2 className="text-xl font-semibold text-teal-300 mb-3">
              🎯 AI's Recommendations
            </h2>
            <ul className="space-y-3 list-disc list-inside text-gray-300">
              {recommendation
                .split(/\d\.\s+/) // Split by numbered list like "1. ...", "2. ..."
                .filter(Boolean)
                .map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-zinc-900 p-3 rounded-md border border-teal-700 transition transform hover:scale-[1.01] hover:border-teal-400 duration-300"
                  >
                    <span className="text-teal-200 font-bold">
                      🎬 {item.split(":")[0]}
                    </span>
                    {item.includes(":") && (
                      <p className="mt-1 text-sm text-gray-400">
                        {item.split(":").slice(1).join(":").trim()}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {movies.length > 0 && (
        <div className="mt-16 px-6 max-w-6xl w-full">
          <h2 className="text-2xl font-bold mb-4">🎥 Suggested Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => {
              const isFavorite = favorites.some(
                (fav) => fav.movie_id === movie.id.toString()
              );
              return (
                <div
                  key={movie.id}
                  className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <button
                    onClick={() => handleToggleFavorite(movie)}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow transition ${
                      isFavorite ? "text-red-500" : "text-gray-400"
                    }`}
                    title={
                      isFavorite
                        ? "Remove from Favourites"
                        : "Add to Favourites"
                    }
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>

                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full rounded-lg"
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
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIRecommend;
