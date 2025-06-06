import express from 'express';
import { updateBioController, getBioController } from '../controllers/bio.controller.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/bio', authenticate, isAdmin, updateBioController);
router.get('/bio', getBioController);

export default router;