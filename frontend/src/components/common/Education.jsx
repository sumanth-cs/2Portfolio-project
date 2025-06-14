import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

function Education({ educations, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
      </div>
      <div className="max-w-4xl mx-auto p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">My Academic Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-500"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {educations.map((edu, index) => (
            <motion.div
              key={`edu-${index}`}
              className="mb-8 w-full"
              initial={{
                opacity: 0,
                x:
                  index % 2 === 0
                    ? window.innerWidth < 768
                      ? 0
                      : 50
                    : window.innerWidth < 768
                    ? 0
                    : -50,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                type: "spring",
              }}
              viewport={{ margin: "-100px" }}
            >
              {/* Content card - full width */}
              <div className="w-full p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-primary-500" />
                  <p className="text-sm opacity-80">{edu.period}</p>
                </div>
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="opacity-80">{edu.institution}</p>
              </div>

              {/* Dot - position differently on mobile */}
              <motion.div
                className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.2 + 0.5,
                  duration: 0.3,
                  type: "spring",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
