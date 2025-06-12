import { createContext, useContext, useEffect, useState } from 'react';
import { getBio, getProjects, getTheme } from '../api/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    bio: null,
    projects: [],
    theme: null,
    loading: true,
    error: null
  });

  const fetchData = async () => {
    try {
      setPortfolioData(prev => ({ ...prev, loading: true }));
      
      const [bioResponse, projectsResponse, themeResponse] = await Promise.all([
        getBio(),
        getProjects(),
        getTheme()
      ]);

      setPortfolioData({
        bio: bioResponse?.bio || null,
        projects: projectsResponse?.projects || [],
        theme: themeResponse?.theme || null,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setPortfolioData({
        bio: null,
        projects: [],
        theme: null,
        loading: false,
        error: error.message
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updatePortfolio = (updates) => {
    setPortfolioData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const refetch = () => {
    fetchData();
  };

  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolioData, 
        updatePortfolio,
        refetch
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);