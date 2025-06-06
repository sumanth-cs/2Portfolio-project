/**
 * JWT authentication middleware.
 */
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      throw new Error('Authentication required');
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or missing token' });
  }
};