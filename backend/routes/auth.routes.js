/**
 * Authentication routes.
 */
import express from 'express';
import { check } from 'express-validator';
import { signup, login, getCurrentUser, logout } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post(
  '/signup',
  [
    check('name').notEmpty().withMessage('Name is required').trim().escape(),
    check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    check('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  signup
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/current', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

export default router;