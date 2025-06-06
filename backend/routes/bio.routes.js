/**
 * Bio routes.
 */
import express from 'express';
import { getUserBio, updateUserBio } from '../controllers/bio.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserBio);
router.put('/', authenticate, updateUserBio);

export default router;