import express from 'express';
import { createPortfolioController, getPortfoliosController } from '../controllers/portfolio.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/portfolio', authenticate, createPortfolioController);
router.get('/portfolios', authenticate, getPortfoliosController);

export default router;