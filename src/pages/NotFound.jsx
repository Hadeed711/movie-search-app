import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md"; // 404 Icon

const NotFound = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center px-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-blue-900"
      }`}
    >
      {/* 404 Illustration */}
      <MdErrorOutline className="text-red-500 text-8xl animate-pulse mb-4" />

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>

      {/* Search Movies Input */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300
          text-black dark:text-white border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-yellow-400 dark:focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
