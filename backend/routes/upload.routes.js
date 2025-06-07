/**
 * Routes for file uploads.
 */
import express from 'express';
import { uploadFile } from '../controllers/upload.controller.js';
import multer from 'multer';
import {authenticate} from '../middleware/auth.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticate, upload.single('file'), uploadFile);

export default router;