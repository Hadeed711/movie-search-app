const ContactUs = ({ darkMode }) => {
    return (
      <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="mb-6 text-center">
            We'd love to hear from you! Please fill out the form below.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              required
              rows="5"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ContactUs;
  