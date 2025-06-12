import { createContext, useContext, useEffect, useState } from 'react';
import { getBio } from '../api/bio';
import { getProjects } from '../api/projects';

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState({ bio: {}, projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bioResponse = await getBio();
        const projectsResponse = await getProjects();
        setPortfolioData({
          bio: bioResponse || {},
          projects: projectsResponse?.projects || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);