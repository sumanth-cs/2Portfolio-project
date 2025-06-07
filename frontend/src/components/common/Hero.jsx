import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';

function Hero({ bio }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      id="home"
      className="relative h-[80vh] flex items-center justify-center bg-primary bg-cover bg-center"
      style={{ backgroundImage: 'url(/src/assets/background.jpg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div style={{ opacity }} className="absolute inset-0 bg-black opacity-50" />
      <motion.div
        className="relative text-center text-white z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <img
          src={bio.image || '/src/assets/profile.jpg'}
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 border-4 border-white"
        />
        <h1 className="text-5xl sm:text-6xl mb-4">{bio.name}</h1>
        <p className="text-xl sm:text-2xl mb-6 max-w-md mx-auto">{bio.title}</p>
        <div className="flex justify-center space-x-4 mb-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter className="w-8 h-8" />
          </motion.a>
        </div>
        <Button asChild className="bg-white text-primary hover:bg-white/90">
          <a href="#contact">Get in Touch</a>
        </Button>
      </motion.div>
    </motion.section>
  );
}

export default Hero;