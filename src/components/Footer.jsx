import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`w-full py-6 mt-10 text-center transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="container mx-auto">
        <p className="text-lg font-semibold">MovieApp</p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} MovieApp. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/search/inception"
            className="hover:text-yellow-400 transition-all duration-300"
          >
            Search
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
