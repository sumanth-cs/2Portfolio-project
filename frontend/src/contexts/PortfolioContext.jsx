import { createContext, useContext, useEffect, useState } from "react";
import { getBio, getProjects, getTheme } from "../api/api";
import { useAuth } from "./AuthContext";

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

  const fetchData = async (userId = null) => {
    try {
      setPortfolioData((prev) => ({ ...prev, loading: true, error: null }));

      const targetUserId = userId || user?.id;

      const [bioResponse, projectsResponse, themeResponse] = await Promise.all([
        getBio(targetUserId),
        getProjects(targetUserId),
        getTheme(targetUserId),
      ]);

      setPortfolioData({
        bio: bioResponse,
        projects: projectsResponse || [],
        theme: themeResponse || null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
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
    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  const updatePortfolio = async (updates) => {
    try {
      setPortfolioData((prev) => ({
        ...prev,
        ...updates,
        loading: true,
        error: null,
      }));

      await fetchData(); // Refetch to ensure consistency
    } catch (error) {
      console.error("Error updating portfolio:", error);
      setPortfolioData((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  const getPortfolioByUserId = async (userId) => {
    try {
      await fetchData(userId);
    } catch (error) {
      console.error("Error fetching portfolio by user ID:", error);
      throw error;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updatePortfolio,
        refetch: fetchData,
        getPortfolioByUserId,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
