import { motion } from 'framer-motion';

function About() {
  return (
    <motion.section
      id="about"
      className="py-20 bg-gray-100 parallax"
      style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-red-700 mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/src/assets/profile.jpg"
              alt="About"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-700">
              I'm a passionate developer with over 5 years of experience in building web applications. I specialize in JavaScript, React, and Node.js, with a keen interest in creating seamless user experiences and scalable backend systems. My goal is to craft innovative solutions that make a difference.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default About;