import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

function Header() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Name */}
        <motion.h1
          className="text-2xl font-bold text-red-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          John Doe
        </motion.h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {[
            "home",
            "about",
            "skills",
            "projects",
            "experience",
            "education",
            "contact",
          ].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-red-700 hover:text-teal-700 font-semibold text-lg capitalize transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="w-6 h-6 text-red-700 hover:text-teal-700" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="w-6 h-6 text-red-700 hover:text-teal-700" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaSquareXTwitter className="w-6 h-6 text-red-700 hover:text-teal-700" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Header;
