import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Fixed: Use your Railway backend URL instead of localhost
      const response = await fetch("https://web-production-94cb.up.railway.app/auth/jwt/create/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save tokens to localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/");
      } else {
        setError(data.detail || data.message || data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-center text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Sign in to your account
        </h2>

        {error && (
          <div className={`p-4 rounded-md ${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"}`}>
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className={`h-4 w-4 rounded focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"}`}
              />
              <span className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Remember me</span>
            </label>

            <Link to="/forgot-password" className={`text-sm font-medium hover:text-blue-500 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>

        <div className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Don't have an account?{" "}
          <Link to="/signup" className={`font-medium hover:text-blue-500 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;