import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaSun, FaMoon, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  // Check auth status on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      // You might want to fetch username from your backend or store it during login
      const storedUsername = "User"; // Replace with actual username logic
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  // Animation variants
  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: darkMode 
        ? "0 0 10px rgba(147, 197, 253, 0.5)" 
        : "0 0 10px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center flex-wrap transition-all duration-300 z-50 ${
        isScrolled ? "bg-opacity-80 backdrop-blur-md" : "bg-opacity-100"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-[#F0EDE5] text-gray-800"}`}
    >
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/"
          className="text-2xl font-bold relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
        >
          MovieApp
        </Link>
      </motion.div>

      {/* Hamburger Menu */}
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
        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <Link
            to="/"
            className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Home
          </Link>
        </motion.div>

        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <Link 
            to="/contact" 
            className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Contact Us
          </Link>
        </motion.div>

        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
          <Link 
            to="/about" 
            className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
          >
            About Me
          </Link>
        </motion.div>

        {isLoggedIn ? (
          <>
            <motion.div 
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaUser className="text-blue-500" />
              <span>Hello, {username}</span>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link 
                to="/login" 
                className="relative transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Login
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                Sign Up
              </Link>
            </motion.div>
          </>
        )}

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
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
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
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
        </motion.div>

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
          <motion.button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go
          </motion.button>
        </form>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div 
          className="w-full mt-4 flex flex-col gap-4 md:hidden px-4 py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Me
          </Link>

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <FaUser className="text-blue-500" />
                <span>Hello, {username}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white text-center hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}

          <a
            href="https://github.com/Hadeed711/Movie-Search-App"
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
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;