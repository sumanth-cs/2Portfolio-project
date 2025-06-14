import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';
import defaultProfilePic from '../../assets/defaultProfilePic.jpg';

function About({ bio = {} }) {
  const { colors } = useContext(ThemeContext);

  const safeBio = {
    name: 'Your Name',
    title: 'Your Title',
    bio: 'A brief description about yourself.',
    aboutImage: bio.aboutImage || defaultProfilePic,
    ...bio
  };

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
              className="w-[300px] h-[300px] overflow-hidden rounded-3xl shadow-lg" 
            >
              <img
                src={safeBio.aboutImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = defaultProfilePic)}
              />
            </motion.div>
            <div className="flex-1 w-[300px] h-[300px] flex items-center">
              <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
                {safeBio.bio}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;