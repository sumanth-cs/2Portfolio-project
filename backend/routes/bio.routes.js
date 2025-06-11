import express from 'express';
import { getBio, updateUserBio, createUserBio } from '../controllers/bio.controller.js';
import {authenticate} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getBio);
router.post('/', authenticate, createUserBio);
router.put('/', authenticate, updateUserBio);

export default router;