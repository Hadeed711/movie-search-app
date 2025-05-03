import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery("");
      setMenuOpen(false); // Close mobile menu on search
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center flex-wrap transition-all duration-300 z-50 ${
        isScrolled ? "bg-opacity-80 backdrop-blur-md" : "bg-opacity-100"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-[#F0EDE5] text-gray-800"}`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
      >
        MovieApp
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
          className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 dark:after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>
        <Link to="/contact" className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 dark:after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">
          Contact Us
        </Link>
        <Link to="/SignUp" className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 dark:after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">
          SignUp
        </Link>
        <Link to="/SignIn" className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 dark:after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">
          SignIn
        </Link>

        <Link
          to="/about"
          className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-500 dark:after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
        >
          About Me
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

        <form onSubmit={handleSearch} className="flex relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md border 
              bg-gray-200 text-gray-900 placeholder-gray-600
              dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
              border-gray-400 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r"
          >
            Go
          </button>
        </form>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="w-full mt-4 flex flex-col gap-4 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Me
          </Link>
          <a
            href="https://github.com/your-repo-link"
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
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-md border 
                bg-gray-200 text-gray-900 placeholder-gray-600
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                border-gray-400 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
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
