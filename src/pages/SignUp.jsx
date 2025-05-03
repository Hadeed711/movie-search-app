import axios from "../api/axios";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", formData);
      alert("Registered successfully");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 transition-colors duration-500">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 animate-slide-in">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Sign Up
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 transition"
            />
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
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition transform hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  
