import { createContext, useContext, useState, useEffect } from 'react';
import { getBio } from '../api/bio';
import { getProjects } from '../api/projects';
import { toast } from 'react-hot-toast';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({ bio: null, projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const [bioData, projectsData] = await Promise.all([
        getBio(),
        getProjects(),
      ]);
      setPortfolioData({
        bio: bioData || {},
        projects: projectsData.projects || [],
      });
      setError(null);
    } catch (err) {
      setError('Failed to load portfolio data.');
      toast.error('Failed to load portfolio data.');
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolio = async (newData) => {
    try {
      // Assuming newData contains bio or projects
      if (newData.bio) {
        await import('../api/bio.js').then(({ updateBio }) => updateBio(newData.bio));
      }
      if (newData.projects) {
        // Handle project updates if needed
      }
      await fetchPortfolioData();
      toast.success('Portfolio updated successfully!');
    } catch (err) {
      toast.error(`Failed to update portfolio: ${err.message}`);
      throw err;
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        loading,
        error,
        updatePortfolio,
        refetch: fetchPortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);