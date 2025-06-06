import express from 'express';
import { signup, login, getCurrentUser, logout } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/current', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);

export default router;