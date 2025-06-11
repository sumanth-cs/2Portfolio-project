import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';
import defaultProfilePic from '../../assets/defaultProfilePic.jpg';

function About({ bio = {} }) {
  const { colors } = useContext(ThemeContext);

  if (!bio.name) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-center" style={{ color: colors.primary }}>
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-48 h-48 rounded-full overflow-hidden shadow-lg"
            >
              <img
                src={bio.image || defaultProfilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex-1">
              <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
                {bio.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;