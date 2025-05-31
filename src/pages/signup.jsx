import { motion } from 'framer-motion';

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-gray-900 text-white">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">🍿 Create Account</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            whileHover={{ rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded font-semibold"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
