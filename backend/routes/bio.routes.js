import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getBio, updateUserBio, getBioByUserId } from '../controllers/bio.controller.js';

const router = express.Router();

// GET bio for current user (authenticated)
router.get('/', authenticate, getBio);

// GET bio by user ID (public)
router.get('/:userId', getBioByUserId);

// Update bio (authenticated)
router.put('/', authenticate, updateUserBio);

export default router;