import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import { FaUserCircle } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}/credits`);
        setCast(response.data.cast.slice(0, 10));
        setCrew(response.data.crew.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch movie credits:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
  }, [id]);

  if (!movie) {
    return <div className="text-center text-gray-500 dark:text-gray-300 mt-20">Loading...</div>;
  }

  return (
    <div className="p-6 mt-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{movie.title}</h1>

      <div className="mt-4 flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-6">
        <img
          className="w-60 h-80 rounded-lg object-cover shadow-md"
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
          alt={movie.title}
        />
        <div className="mt-4 md:mt-0">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {movie.release_date ? `Released: ${new Date(movie.release_date).getFullYear()}` : "Release date not available"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{movie.overview}</p>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-400">Cast</h2>
        <div className="flex overflow-x-auto space-x-4 p-4">
          {cast.map((actor) => (
            <div key={actor.id} className="w-32 text-center">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-lg w-28 h-28 object-cover shadow cursor-pointer hover:scale-105 transition"
                  onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/w780${actor.profile_path}`)}
                />
              ) : (
                <FaUserCircle className="text-gray-400 dark:text-gray-500 w-28 h-28 mx-auto" />
              )}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Crew Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">Crew</h2>
        <div className="flex overflow-x-auto space-x-4 p-4">
          {crew.map((member) => (
            <div key={member.id} className="w-32 text-center">
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className="rounded-lg w-28 h-28 object-cover shadow cursor-pointer hover:scale-105 transition"
                  onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/w780${member.profile_path}`)}
                />
              ) : (
                <FaUserCircle className="text-gray-400 dark:text-gray-500 w-28 h-28 mx-auto" />
              )}
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{member.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{member.job}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            className="w-auto h-[80vh] max-w-4xl rounded-lg shadow-lg transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
