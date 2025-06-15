import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // Custom event listener for auth status
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center flex-wrap transition-all duration-300 z-50 ${
        isScrolled ? "bg-opacity-80 backdrop-blur-md" : "bg-opacity-100"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-[#F0EDE5] text-gray-800"}`}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-2xl font-bold relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
      >
        Mo-V
      </Link>

      {/* Hamburger Icon with Full Cross Animation */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <span
            className={`absolute w-6 h-0.5 bg-current transition-transform duration-300 ease-in-out 
            ${menuOpen ? "rotate-45" : "-translate-y-2"}`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-current transition-opacity duration-200 
            ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-current transition-transform duration-300 ease-in-out 
            ${menuOpen ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          to="/"
          className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Home
        </Link>
        <Link
          to="/contact"
          className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Contact Us
        </Link>
        <Link
          to="/about"
          className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
        >
          About Us
        </Link>
        {isLoggedIn ? (
          <Link
            to="/logout"
            className="relative transition duration-300 px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Login
          </Link>
        )}

        <Link
          to="/signup"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
        >
          Sign Up
        </Link>

        <a
          href="https://github.com/Hadeed711/Movie-Search-App"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-md border 
            border-gray-300 bg-gray-100 text-gray-800 
            dark:bg-gray-800 dark:border-gray-500 dark:text-white 
            hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <FaGithub size={20} />
          <span>Check Repository</span>
        </a>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full transition-all duration-300"
        >
          {darkMode ? (
            <FaSun
              className="text-yellow-400 animate-spin-slow hover:animate-none"
              size={22}
            />
          ) : (
            <FaMoon
              className="text-gray-700 transition-transform duration-300 hover:rotate-[200deg]"
              size={22}
            />
          )}
        </button>

        <form
          onSubmit={handleSearch}
          className="flex relative shadow-sm rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-4 border-none outline-none 
      bg-gray-200 text-gray-900 placeholder-gray-600
      dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
      focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium 
      transition-all duration-200 ease-in-out"
          >
            Go
          </button>
        </form>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="w-full mt-4 flex flex-col gap-4 md:hidden px-4 py-2">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          {isLoggedIn ? (
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500"
            >
              Login
            </Link>
          )}

          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition-all duration-300"
          >
            Sign Up
          </Link>
          <a
            href="https://github.com/Hadeed711/movie-search-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaGithub size={20} />
            <span>Check Repository</span>
          </a>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
            <span>Toggle Theme</span>
          </button>
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 w-full shadow-sm"
          >
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-md border-none 
      bg-gray-200 text-gray-900 placeholder-gray-600
      dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
      focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold
      transition duration-200 ease-in-out"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
