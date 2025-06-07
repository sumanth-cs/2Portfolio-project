/**
 * Portfolio controller for handling portfolio-related operations.
 */
import { createPortfolio, getPortfolios, getPortfolioByUserId, updatePortfolio } from '../models/portfolio.model.js';

export const createUserPortfolio = async (req, res, next) => {
  try {
    const { title, description, image, tags } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const portfolio = await createPortfolio(req.userId, title, description, image, tags);
    res.status(201).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

export const getUserPortfolios = async (req, res, next) => {
  try {
    const portfolios = await getPortfolios(req.userId);
    res.status(200).json({ success: true, portfolios: portfolios || [] });
  } catch (error) {
    next(error);
  }
};

export const getPortfoliosByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const portfolios = await getPortfolioByUserId(userId);
    res.status(200).json({ success: true, portfolios: portfolios || [] });
  } catch (error) {
    next(error);
  }
};

export const updateUserPortfolio = async (req, res, next) => {
  try {
    const { id, title, description, image, tags } = req.body;
    if (!id || !title) {
      return res.status(400).json({ success: false, message: 'ID and title are required' });
    }
    const portfolio = await updatePortfolio(id, req.userId, title, description, image, tags);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }
    res.status(200).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};