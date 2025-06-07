// frontend/src/context/PortfolioContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../api/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    try {
      const data = await apiFetch('/api/portfolio');
      setPortfolioData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolio = async (newData) => {
    try {
      const updated = await apiFetch('/api/portfolio', {
        method: 'PUT',
        body: JSON.stringify(newData)
      });
      setPortfolioData(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      loading, 
      error,
      updatePortfolio,
      refetch: fetchPortfolioData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);