import express from 'express';
import { getUserTheme, updateUserTheme, getThemeByUserId } from '../controllers/theme.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// GET theme for current user (authenticated)
router.get('/', authenticate, getUserTheme);

// GET theme by user ID (public)
router.get('/:userId', getThemeByUserId);

// Update theme (authenticated)
router.put('/', authenticate, updateUserTheme);

export default router;