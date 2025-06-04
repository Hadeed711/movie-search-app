import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Trash2 } from 'lucide-react';
import { motion as _motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const EditFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/favorites/');
      setFavourites(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching favourites:', err);
      setError('Failed to load favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`/api/favorites/${id}/`);
      setFavourites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error('Error removing favourite:', err);
      setError('Failed to remove favorite. Please try again.');
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Your Favourite Movies</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">
          {error}
        </div>
      ) : favourites.length === 0 ? (
        <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg text-center animate-pulse">
          <p className="text-lg font-medium">No favorites have been added yet.</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse movies and click the ❤️ icon to add them to favorites!
          </p>
        </div>
      ) : (
        <_motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {favourites.map((fav) => (
              <_motion.div
                key={fav.id}
                variants={cardVariants}
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-[1.03]"
              >
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${fav.movie_poster}`}
                    alt={fav.movie_title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = '/movie-placeholder.png';
                    }}
                  />
                  <_motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavorite(fav.id)}
                    className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-red-500 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    title="Remove from Favourites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </_motion.button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{fav.movie_title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Added: {new Date(fav.created_at).toLocaleDateString()}
                  </p>
                </div>
              </_motion.div>
            ))}
          </AnimatePresence>
        </_motion.div>
      )}

      <div className="mt-10 flex justify-center">
        <_motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchFavourites}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
        >
          🔄 Refresh List
        </_motion.button>
      </div>
    </div>
  );
};

export default EditFavourites;
