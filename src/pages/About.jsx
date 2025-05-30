import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion as _motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    name: "Astro Nova",
    tech: ["HTML", "CSS", "JavaScript", "Multimedia", "JWST", "AI"],
    link: "https://github.com/Hadeed711/AstroNova",
  },
  {
    name: "ELARA AI Assistant",
    tech: ["OpenAI", "Python"],
    link: "https://github.com/Hadeed711/ELARA",
  },
  {
    name: "Broadway Pizza Website",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Hadeed711/Broadway_",
  },
  {
    name: "Movie App",
    tech: ["React", "TMDB API", "JavaScript", "Tailwind CSS", "In Progress"],
    link: "https://github.com/Hadeed711/Movie-Search-App",
  },
];

// Sprinkle component
const Sprinkle = ({ color, size, delay, duration, x }) => {
  return (
    <_motion.div
      className="absolute"
      initial={{ y: -20, x, opacity: 1 }}
      animate={{
        y: "100vh",
        opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
        rotate: [0, 180, 360, 540, 720],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: size,
        height: size / 3,
        backgroundColor: color,
        borderRadius: size / 2,
      }}
    />
  );
};

// SprinkleContainer component
const SprinkleContainer = () => {
  const [sprinkles, setSprinkles] = useState([]);

  useEffect(() => {
    // Generate 40 sprinkles with random properties
    const colors = [
      "#22c55e",
      "#3b82f6",
      "#ef4444",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
    ];
    const newSprinkles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 10,
      x: `${Math.random() * 100}%`,
    }));

    setSprinkles(newSprinkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sprinkles.map((sprinkle) => (
        <Sprinkle key={sprinkle.id} {...sprinkle} />
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-24 px-6 py-12 bg-gradient-to-b from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Sprinkle Animation */}
      <SprinkleContainer />

      {/* Main Content with z-index to appear above sprinkles */}
      <div className="relative z-10">
        {/* Main Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Profile Image with hover animation */}
          <_motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <_motion.img
              src="/profile.jpg"
              alt="Hadeed Ahmad"
              className="rounded-3xl w-72 h-96 object-cover shadow-2xl border-4 border-green-400 relative -left-16 group-hover:shadow-green-400 transition"
              whileHover={{
                scale: 1.05,
                rotate: -2,
                boxShadow: "0px 0px 25px rgba(34, 197, 94, 0.6)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </_motion.div>

          {/* Bio Section */}
          <_motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-green-600">Hadeed Ahmad</h1>
            <p className="text-lg leading-relaxed">
              I'm a passionate Front-End Developer and Intermediate Graphic
              Designer based in Pakistan. Skilled in crafting responsive
              websites with HTML, CSS, and JavaScript, I bring visual ideas to
              life using Adobe Illustrator and modern design trends. I'm
              currently advancing in Python and exploring the AI development
              world — building projects like ELARA AI and Astro Nova to merge
              creativity with code.
            </p>

            {/* Contact Links */}
            <div className="space-y-3 pt-4">
              <_motion.a
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                href="mailto:hadeedahmad711@gmail.com"
              >
                <FaEnvelope className="text-lg" />
                hadeedahmad711@gmail.com
              </_motion.a>
              <_motion.p
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <FaPhone className="text-lg" />
                +92 324 1669274
              </_motion.p>
              <_motion.a
                whileHover={{ scale: 1.05, rotate: -2 }}
                href="https://github.com/Hadeed711"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                <FaGithub className="text-xl" />
                GitHub Profile
              </_motion.a>
              <_motion.a
                whileHover={{ scale: 1.05, rotate: 2 }}
                href="https://www.linkedin.com/in/hadeed-ahmad-a15919277"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-300"
              >
                <FaLinkedin className="text-xl" />
                LinkedIn Profile
              </_motion.a>
            </div>
          </_motion.div>
        </div>
       {/* contributor section */}
<div className="mt-24">
  <h2 className="text-3xl font-semibold text-center mb-10 text-purple-600 dark:text-purple-400">
    🌟 More Contributors
  </h2>

  <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
    {/* Contributor 1 */}
    <_motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-gradient-to-br from-[#5B21B6] via-purple-600 to-[#D946EF] text-white p-6 rounded-3xl shadow-2xl w-80 text-center overflow-hidden"
    >
      {/* Image with shine and zoom effect */}
      <_motion.div
        className="relative w-28 h-28 mx-auto rounded-full overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/hamza_img.jpeg"
          alt="Muhammad Hamza Hassaan"
          className="w-full h-full object-cover border-4 border-white shadow-lg transition-transform duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
      </_motion.div>

      <h3 className="mt-4 text-xl font-bold">Muhammad Hamza Hassaan</h3>
      <p className="text-sm italic px-2">
        A Machine Learning enthusiast skilled in React and Node.js,
        passionate about building intelligent, scalable web applications.
      </p>
      <_motion.div
        className="mt-4 flex justify-center gap-6 text-white text-2xl"
        whileHover={{ scale: 1.1 }}
      >
        <_motion.a
          href="https://github.com/M-Hamza-Hassaan"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5, color: "#000000" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaGithub />
        </_motion.a>
        <_motion.a
          href="https://www.linkedin.com/in/muhammad-hamza-hassaan/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5, color: "#0e76a8" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaLinkedin />
        </_motion.a>
      </_motion.div>
    </_motion.div>

    {/* Contributor 2 */}
    <_motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-white dark:bg-gradient-to-tr dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-80 text-center overflow-hidden"
    >
      {/* Image with shine and zoom effect */}
      <_motion.div
        className="relative w-28 h-28 mx-auto rounded-full overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/saad_img.jpg"
          alt="Muhammad Saad"
          className="w-full h-full object-cover border-4 border-green-400 shadow-xl transition-transform duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
      </_motion.div>

      <h3 className="mt-4 text-xl font-bold">Muhammad Saad</h3>
      <p className="text-sm italic px-2">
        A versatile developer with expertise in Generative AI, SEO
        optimization, and modern full-stack web technologies.
      </p>
      <_motion.div
        className="mt-4 flex justify-center gap-6 text-green-500 text-2xl"
        whileHover={{ scale: 1.1 }}
      >
        <_motion.a
          href="https://github.com/saadali451"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5, color: "#171515" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaGithub />
        </_motion.a>
        <_motion.a
          href="https://www.linkedin.com/in/muhammad-saad-00a246349/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5, color: "#0e76a8" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaLinkedin />
        </_motion.a>
      </_motion.div>
    </_motion.div>
  </div>
</div>


        {/* Project Gallery */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center mb-10">
            🚀 Completed Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <_motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition"
              >
                <h3 className="text-xl font-bold text-green-500 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm mb-3">
                  <strong>Tech:</strong> {project.tech.join(", ")}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on GitHub →
                </a>
              </_motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
