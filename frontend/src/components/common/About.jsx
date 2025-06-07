import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';

function About({ bio }) {
  return (
    <motion.section
      id="about"
      className="py-16 bg-surface"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-primary mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={bio.image || '/src/assets/profile.jpg'}
                  alt="About"
                  className="w-full h-64 object-cover rounded-md"
                />
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-text-primary-on-background">{bio.description}</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}

export default About;