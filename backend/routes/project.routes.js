/**
 * Routes for project operations.
 */
import express from 'express';
import { createUserProject, getUserProjects, getProjectsByUserId, updateUserProject, deleteUserProject } from '../controllers/project.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, createUserProject);
router.get('/', authenticate, getUserProjects);
router.get('/:userId', getProjectsByUserId);
router.put('/', authenticate, updateUserProject);
router.delete('/:id', authenticate, deleteUserProject);

export default router;