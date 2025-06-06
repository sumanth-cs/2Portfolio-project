import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getPortfolios } from '../api/portfolio.js';
import Hero from '../components/common/Hero.jsx';
import About from '../components/common/About.jsx';
import Skills from '../components/common/Skills.jsx';
import Projects from '../components/common/Projects.jsx';
import Experience from '../components/common/Experience.jsx';
import Education from '../components/common/Education.jsx';
import Contact from '../components/common/Contact.jsx';
import PortfolioSection from '../components/home/PortfolioSection.jsx';
import Header from '@/components/common/Header.jsx';
import Footer from '@/components/common/Footer.jsx';

function Home() {
  const { user } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await getPortfolios();
        setPortfolios(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      {user && (
        <PortfolioSection 
          portfolios={portfolios} 
          loading={loading} 
          error={error} 
        />
      )}
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;