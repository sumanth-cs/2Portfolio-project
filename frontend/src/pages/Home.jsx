import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Hero from '../components/common/Hero';
import About from '../components/common/About';
import Skills from '../components/common/Skills';
import Experience from '../components/common/Experience';
import Education from '../components/common/Education';
import Projects from '../components/common/Projects';
import Contact from '../components/common/Contact';
import Footer from '../components/common/Footer';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { DEFAULT_BIO, DEFAULT_PROJECTS } from '@/api/api';

function Home() {
  const { userId } = useParams();
  const { user } = useAuth();
  const { portfolioData, getPortfolioByUserId } = usePortfolio();

  useEffect(() => {
    if (userId) {
      getPortfolioByUserId(userId);
    }
  }, [userId, getPortfolioByUserId]);

  if (portfolioData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Determine if we're viewing someone else's portfolio
  const isViewingOtherPortfolio = userId && userId !== user?.id;
  const displayBio = portfolioData.bio || DEFAULT_BIO;
  const displayProjects = portfolioData.projects.length > 0 ? portfolioData.projects : DEFAULT_PROJECTS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      {isViewingOtherPortfolio && (
        <div className="bg-blue-50 text-blue-800 p-4 text-center">
          <p>You're viewing {displayBio.name}'s portfolio</p>
          {user ? (
            <Link to="/">
              <Button className="mt-2">Back to my portfolio</Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button className="mt-2">Create your own portfolio</Button>
            </Link>
          )}
        </div>
      )}

      <Hero bio={displayBio} />
      <About bio={displayBio} />
      <Skills skills={displayBio.skills} />
      <Experience experiences={displayBio.experience} />
      <Education educations={displayBio.education} />
      <Projects projects={displayProjects} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;