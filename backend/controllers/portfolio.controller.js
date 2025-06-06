/**
 * Portfolio controller for handling portfolio-related operations.
 */
import { createPortfolio, getPortfolios, getPortfolio, updatePortfolio } from '../models/portfolio.model.js';

export const createUserPortfolio = async (req, res, next) => {
  try {
    const { title, description, images } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const portfolio = await createPortfolio(req.userId, title, description, images);
    res.status(201).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

export const getUserPortfolios = async (req, res, next) => {
  try {
    const portfolios = await getPortfolios(req.userId);
    res.status(200).json({ success: true, portfolios: portfolios || [] }); // Ensure array
  } catch (error) {
    next(error);
  }
};

export const getUserPortfolio = async (req, res, next) => {
  try {
    const portfolio = await getPortfolio(req.userId);
    res.status(200).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

export const updateUserPortfolio = async (req, res, next) => {
  try {
    const { title, description, images } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const portfolio = await updatePortfolio(req.userId, title, description, images);
    res.status(200).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};