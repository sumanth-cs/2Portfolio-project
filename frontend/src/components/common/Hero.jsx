import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';

function Hero({ bio }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <motion.section
      id="home"
      className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/src/assets/background.jpg)',
          opacity,
          y
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden shadow-xl"
        >
          <img
            src={bio.image || '/src/assets/profile.jpg'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-display">
          {bio.name}
        </h1>
        
        <p className="text-xl sm:text-2xl text-primary-200 mb-8 max-w-md mx-auto">
          {bio.title}
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          {['github', 'linkedin', 'twitter'].map((social) => (
            <motion.a
              key={social}
              href={`https://${social}.com`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              {social === 'github' && <Github className="w-5 h-5 text-white" />}
              {social === 'linkedin' && <Linkedin className="w-5 h-5 text-white" />}
              {social === 'twitter' && <Twitter className="w-5 h-5 text-white" />}
            </motion.a>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="primary" size="lg">
            <a href="#contact">Get in Touch</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-white">
            <a href="#projects">View My Work</a>
          </Button>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16"
        >
          <ArrowDown className="w-6 h-6 mx-auto text-white" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;