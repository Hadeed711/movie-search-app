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
      const response = await axios.post('/contact/', { name, email, message });
      console.log("Response:", response.data);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
      setError('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 dark:bg-purple-900 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-300 dark:bg-yellow-700 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-700 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      <div className="max-w-2xl mx-auto mt-20 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl transform transition-all animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have any questions? Drop us a message!
        </p>

        {/* Success & Error */}
        {loading && <div className="text-blue-500 mb-3 animate-pulse text-center">Sending...</div>}
        {success && <div className="text-green-500 mb-3 animate-fade-in text-center">✅ Message sent successfully!</div>}
        {error && <div className="text-red-500 mb-3 animate-fade-in text-center">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input Fields with Floating Labels */}
          {[
            { id: 'name', value: name, setter: setName, type: 'text', label: 'Your Name' },
            { id: 'email', value: email, setter: setEmail, type: 'email', label: 'Your Email' }
          ].map(({ id, value, setter, type, label }) => (
            <div className="relative group" key={id}>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="w-full px-4 pt-6 pb-2 text-sm bg-transparent border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 peer"
              />
              <label
                htmlFor={id}
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm dark:text-gray-400"
              >
                {label}
              </label>
            </div>
          ))}

          <div className="relative group">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
              placeholder=" "
              className="w-full px-4 pt-6 pb-2 text-sm bg-transparent border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 peer resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm dark:text-gray-400"
            >
              Your Message
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none active:scale-95 shadow-lg hover:shadow-2xl"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-48 group-hover:h-48 opacity-10"></span>
            <span className="relative z-10">{loading ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>

      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s ease-out forwards;
          }
          .animate-fade-in {
            animation: fade-in-up 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ContactUs;
