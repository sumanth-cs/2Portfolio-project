import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';
import { toast } from 'react-hot-toast';

function Hero({ bio = {} }) {
  const { colors } = useContext(ThemeContext);

  const socialLinks = [
    { 
      icon: <Github />, 
      url: bio.social?.find((s) => s?.name?.toLowerCase() === 'github')?.link || 'https://github.com' 
    },
    { 
      icon: <Twitter />, 
      url: bio.social?.find((s) => s?.name?.toLowerCase() === 'twitter')?.link || 'https://twitter.com' 
    },
    { 
      icon: <Mail />, 
      url: `mailto:${bio.email || 'contact@example.com'}` 
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
    <section id="home" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto rounded-xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-8 w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl"
          >
            <img
              src={bio.image || '/placeholder-profile.jpg'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <p className="text-lg opacity-80">Hello, I'm</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.text }}>
            {bio.name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl opacity-80 mb-8" style={{ color: colors.text }}>
            {bio.title || 'Your Title'}
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                style={{ color: colors.text }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="group" 
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              style={{ borderColor: colors.text, color: colors.text }}
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;