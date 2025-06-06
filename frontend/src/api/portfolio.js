import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createPortfolio = async (portfolioData) => {
  const response = await axios.post(`${API_URL}/api/portfolio`, portfolioData, { withCredentials: true });
  return response.data.portfolio;
};

export const getPortfolios = async () => {
  const response = await axios.get(`${API_URL}/api/portfolios`, { withCredentials: true });
  return response.data.portfolios;
};