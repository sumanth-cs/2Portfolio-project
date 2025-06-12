import { createContext, useContext, useEffect, useState } from 'react';
import { getBio, getProjects, getTheme } from '../api/api';
import { useAuth } from './AuthContext.jsx';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [portfolioData, setPortfolioData] = useState({
    bio: null,
    projects: [],
    theme: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    if (authLoading) return; // Wait for auth to resolve

    try {
      setPortfolioData((prev) => ({ ...prev, loading: true }));

      const [bioResponse, projectsResponse, themeResponse] = await Promise.all([
        getBio(),
        getProjects(),
        getTheme(),
      ]);

      console.log('Fetched bio:', bioResponse); // Debug log
      console.log('Fetched projects:', projectsResponse); // Debug log
      console.log('Fetched theme:', themeResponse); // Debug log

      setPortfolioData({
        bio: bioResponse || null,
        projects: projectsResponse || [],
        theme: themeResponse || null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setPortfolioData({
        bio: null,
        projects: [],
        theme: null,
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, authLoading]); // Refetch when user or authLoading changes

  const updatePortfolio = async (updates) => {
    try {
      setPortfolioData((prev) => ({
        ...prev,
        ...updates,
        loading: true,
      }));

      // Refetch data to ensure consistency with backend
      await fetchData();
    } catch (error) {
      console.error('Error updating portfolio:', error);
      setPortfolioData((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updatePortfolio,
        refetch,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);