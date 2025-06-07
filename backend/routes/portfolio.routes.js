/**
 * Routes for portfolio operations.
 */
import express from 'express';
import { createUserPortfolio, getUserPortfolios, getPortfoliosByUserId, updateUserPortfolio } from '../controllers/portfolio.controller.js';
import {authenticate} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, createUserPortfolio);
router.get('/', authenticate, getUserPortfolios);
router.get('/:userId', getPortfoliosByUserId);
router.put('/', authenticate, updateUserPortfolio);

export default router;