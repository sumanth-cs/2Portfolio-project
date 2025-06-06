/**
 * Portfolio routes.
 */
import express from 'express';
import { createUserPortfolio, getUserPortfolios, getUserPortfolio, updateUserPortfolio } from '../controllers/portfolio.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, createUserPortfolio);
router.get('/', authenticate, getUserPortfolios);
router.get('/:id', authenticate, getUserPortfolio);
router.put('/:id', authenticate, updateUserPortfolio);

export default router;