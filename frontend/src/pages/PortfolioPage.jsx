import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext.jsx';
import Header from '../components/common/Header.jsx';
import Projects from '../components/common/Projects.jsx';
import Footer from '../components/common/Footer.jsx';
import { apiFetch } from '../api/api.js';

function PortfolioPage() {
  const { userId } = useParams();
  const { portfolioData } = usePortfolio();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Projects projects={portfolioData.projects || []} loading={portfolioData.loading} />
      <Footer />
    </motion.div>
  );
}

export default PortfolioPage;