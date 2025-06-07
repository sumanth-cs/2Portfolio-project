/**
 * Routes for theme operations.
 */
import express from 'express';
import { getUserTheme, updateUserTheme } from '../controllers/theme.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserTheme);
router.put('/', authenticate, updateUserTheme);

export default router;