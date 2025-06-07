/**
 * API functions for portfolio operations.
 */
import { apiFetch } from './api.js';

export const createPortfolio = async (portfolioData) => {
  const response = await apiFetch('/api/portfolio', {
    method: 'POST',
    body: JSON.stringify(portfolioData),
  });
  return response.portfolio;
};

export const getPortfolios = async () => {
  const response = await apiFetch('/api/portfolio', {
    method: 'GET',
  });
  return response.portfolios;
};

export const updatePortfolio = async (portfolioData) => {
  const response = await apiFetch('/api/portfolio', {
    method: 'PUT',
    body: JSON.stringify(portfolioData),
  });
  return response.portfolio;
};