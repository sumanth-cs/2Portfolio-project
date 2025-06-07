import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getPortfolios } from '../api/portfolio.js';
import { Link } from 'react-router-dom';
import Hero from '../components/common/Hero.jsx';
import About from '../components/common/About.jsx';
import Skills from '../components/common/Skills.jsx';
import Projects from '../components/common/Projects.jsx';
import Experience from '../components/common/Experience.jsx';
import Education from '../components/common/Education.jsx';
import Contact from '../components/common/Contact.jsx';
import PortfolioSection from '../components/home/PortfolioSection.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import { Button } from '../components/ui/button.jsx';

const dummyData = {
  portfolios: [
    {
      _id: 'dummy1',
      title: 'Sample Project',
      description: 'A showcase of modern web development techniques.',
      image: 'https://picsum.photos/300/200',
      tags: ['React', 'Node.js'],
    },
  ],
};

function Home() {
  const { user } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState(user ? [] : dummyData.portfolios);
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
      <PortfolioSection portfolios={portfolios} loading={loading} error={error} />
      <section className="text-center py-8">
        {user ? (
          <Link to="/dashboard">
            <Button>{portfolios.length > 0 ? 'Edit Your Portfolio' : 'Create Your Portfolio'}</Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button>Create Your Portfolio</Button>
          </Link>
        )}
      </section>
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;