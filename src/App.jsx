import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import EditFavourites from "./pages/EditFavourites";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Logout from "./pages/Logout";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "light" ? false : true // Always default to dark mode
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen ${
          darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route
              path="/movie/:id"
              element={<MovieDetails darkMode={darkMode} />}
            />
            <Route
              path="/search/:query"
              element={<SearchResults darkMode={darkMode} />}
            />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route path="*" element={<NotFound darkMode={darkMode} />} />
            <Route
              path="/contact"
              element={<ContactUs darkMode={darkMode} />}
            />
            <Route
              path="/EditFavourites"
              element={<EditFavourites darkMode={darkMode} />}
            />
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/logout" element={<Logout darkMode={darkMode} />} />
            <Route path="/signup" element={<Signup darkMode={darkMode} />} />
          </Routes>
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
