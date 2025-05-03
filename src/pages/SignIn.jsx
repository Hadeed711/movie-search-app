import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/token/", {  // Changed endpoint
        username: formData.email,  // Django expects username
        password: formData.password
      });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data);
    }
  };





    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 transition-colors duration-500">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Sign In
          </h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignIn;