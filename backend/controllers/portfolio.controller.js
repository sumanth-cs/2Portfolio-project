import { createPortfolio, getPortfolios } from '../models/portfolio.model.js';

export const createPortfolioController = async (req, res, next) => {
  try {
    const portfolio = await createPortfolio({ ...req.body, userId: req.userId });
    res.status(201).json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

export const getPortfoliosController = async (req, res, next) => {
  try {
    const portfolios = await getPortfolios(req.userId);
    res.status(200).json({ success: true, portfolios });
  } catch (error) {
    next(error);
  }
};