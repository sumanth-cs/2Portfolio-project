/**
 * JWT authentication middleware.
 */
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authentication required: No token provided.');
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('Authentication required: Invalid token format.');
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded.id) {
      throw new Error('Authentication required: Invalid token payload.');
    }
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin || false };
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'jwt expired' });
    }
    res.status(401).json({ success: false, message: error.message });
  }
};