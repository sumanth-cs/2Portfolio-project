import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';
import { toast } from 'react-hot-toast';
import defaultProfilePic from '../../assets/defaultProfilePic.jpg';

function Hero({ bio = {} }) {
  const { colors } = useContext(ThemeContext);

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      url: bio.social?.find((s) => s?.name?.toLowerCase() === 'github')?.link || 'https://github.com',
      name: 'GitHub'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      url: bio.social?.find((s) => s?.name?.toLowerCase() === 'linkedin')?.link || 'https://linkedin.com',
      name: 'LinkedIn'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      url: `mailto:${bio.email || 'contact@example.com'}`,
      name: 'Email'
    },
  ];

  const handleDownload = () => {
    if (bio.resume) {
      window.open(bio.resume, '_blank');
    } else {
      toast.error('No resume available for download.');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 mix-blend-multiply filter blur-3xl opacity-20 animate-float1"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-20 animate-float2"></div>
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 rounded-full bg-pink-500 mix-blend-multiply filter blur-3xl opacity-20 animate-float3"></div>
      </motion.div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto mb-8 w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl"
          >
            <motion.img
              src={bio.image || defaultProfilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg opacity-80"
            style={{ color: colors.text }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {bio.name || 'Your Name'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl md:text-2xl opacity-80 mb-8"
            style={{ color: colors.text }}
          >
            {bio.title || 'Your Title'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-4 mb-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center group"
                style={{ color: colors.text }}
                aria-label={social.name}
              >
                {social.icon}
                <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group flex items-center gap-2"
              onClick={handleDownload}
              style={{ 
                backgroundColor: colors.primary,
                color: colors.buttonText
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="flex items-center gap-2"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#contact">
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;