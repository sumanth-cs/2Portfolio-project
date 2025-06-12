import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Hero from '../components/common/Hero';
import About from '../components/common/About';
import Skills from '../components/common/Skills';
import Experience from '../components/common/Experience';
import Education from '../components/common/Education';
import Projects from '../components/common/Projects';
import Contact from '../components/common/Contact';
import Footer from '../components/common/Footer';
import { usePortfolio } from '../contexts/PortfolioContext.jsx';

function Home() {
  const { portfolioData } = usePortfolio();

  // Show loading state if data is still loading
  if (portfolioData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state if there was an error
  if (portfolioData.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading data: {portfolioData.error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Hero bio={portfolioData.bio || {}} />
      <About bio={portfolioData.bio || {}} />
      <Skills skills={portfolioData.bio?.skills || []} />
      <Experience experiences={portfolioData.bio?.experience || []} />
      <Education educations={portfolioData.bio?.education || []} />
      <Projects projects={portfolioData.projects || []} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;