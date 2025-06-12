import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createUserBio, getBio, updateUserBio } from '../controllers/bio.controller.js';

const router = express.Router();

// Public and authenticated bio route
router.get('/', getBio);

// Protected routes
router.put('/', authenticate, updateUserBio);
router.post('/', authenticate, createUserBio);

export default router;