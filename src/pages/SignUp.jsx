import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ darkMode }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // ✅ Fixed: Use your Railway backend URL
      const response = await fetch("https://web-production-94cb.up.railway.app/auth/users/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Add CORS headers if needed
          "Accept": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Success - redirect to login page
        navigate("/login"); 
      } else {
        setError(data?.detail || data?.message || data?.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-center text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Create a new account
        </h2>

        {error && (
          <div className={`p-4 rounded-md ${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"}`}>
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

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

            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>

        <div className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Already have an account?{" "}
          <Link to="/login" className={`font-medium hover:text-blue-500 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;