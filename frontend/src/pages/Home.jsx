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
  const { portfolioData, loading, error } = usePortfolio();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
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
      <Skills skills={portfolioData.bio?.skills || []} loading={loading} />
      <Experience experiences={portfolioData.bio?.experience || []} loading={loading} />
      <Education educations={portfolioData.bio?.education || []} loading={loading} />
      <Projects projects={portfolioData.projects || []} loading={loading} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;