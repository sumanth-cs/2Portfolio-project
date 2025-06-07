import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiFetch } from '../api/api.js';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import PortfolioSection from '../components/home/PortfolioSection.jsx';

function PortfolioPage() {
  const { userId } = useParams();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await apiFetch(`/api/portfolio/${userId}`);
        setPortfolios(response.portfolios || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <PortfolioSection portfolios={portfolios} loading={loading} error={error} />
      <Footer />
    </motion.div>
  );
}

export default PortfolioPage;