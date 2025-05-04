import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Make sure this points to your configured axios instance
import { Trash2 } from 'lucide-react';

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
    } catch (error) {
      console.error('Error fetching favourites:', error);
      setError('Failed to load favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`/favorites/${id}/`);
      // Update the state to remove the deleted favorite
      setFavourites(favourites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favourite:', error);
      setError('Failed to remove favorite. Please try again.');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6">Favourite Movies</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      ) : favourites.length === 0 ? (
        <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
          <p className="text-lg">No favorites have been added yet.</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse movies and click the heart icon to add them to favorites!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((favorite) => (
            <div 
              key={favorite.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${favorite.movie_poster}`}
                  alt={favorite.movie_title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = '/movie-placeholder.png'; // Fallback image
                  }}
                />
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="absolute top-2 right-2 bg-white dark:bg-gray-700 text-red-500 p-2 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  title="Remove from Favourites"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{favorite.movie_title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Added: {new Date(favorite.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button 
          onClick={fetchFavourites}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition shadow-md"
        >
          Refresh List
        </button>
      </div>
    </div>
  );
};

export default EditFavourites;