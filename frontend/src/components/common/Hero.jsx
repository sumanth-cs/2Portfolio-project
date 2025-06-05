import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';

function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      id="home"
      className="relative h-[80vh] flex items-center justify-center bg-black bg-cover bg-center parallax"
      style={{ backgroundImage: 'url(/src/assets/background.jpg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div style={{ opacity }} className="absolute inset-0 bg-red-700 opacity-50"></motion.div>
      <motion.div
        className="relative text-center text-white z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <img
          src="/src/assets/profile.jpg"
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 border-4 border-white"
        />
        <h1 className="text-6xl font-bold mb-4">John Doe</h1>
        <p className="text-2xl mb-6 max-w-md mx-auto">
          Full-Stack Developer | Passionate about building user-friendly and scalable web applications.
        </p>
        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaSquareXTwitter className="w-8 h-8" />
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;