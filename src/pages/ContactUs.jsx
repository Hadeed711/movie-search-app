import React, { useState } from 'react';
import axios from '../api/axios';

const ContactUs = ({ darkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      // Direct HTTP request to avoid HTTPS issues
      const response = await axios.post('/contact/', { 
        name, 
        email, 
        message 
      });
      
      console.log("Response:", response.data);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
      
      // Enhanced error logging
      if (err.response) {
        // Server responded with a status code outside of 2xx range
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
      } else {
        // Something else caused the error
        console.error("Error:", err.message);
      }
      
      setError('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-2xl mx-auto mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <p className="mb-6 text-center">
          We'd love to hear from you! Please fill out the form below.
        </p>

        {loading && (
          <div className="text-blue-500 mb-2 text-center">Sending...</div>
        )}

        {success && (
          <div className="text-green-500 mb-2 text-center">
            ✅ Message sent successfully!
          </div>
        )}

        {error && (
          <div className="text-red-500 mb-2 text-center">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
            className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition transform hover:scale-105 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;