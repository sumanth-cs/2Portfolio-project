// /**
//  * JWT authentication middleware.
//  */
// import jwt from 'jsonwebtoken';
// import { config } from '../config/env.js';

// export const authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.header('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new Error('Authentication required: No token provided.');
//     }
//     const token = authHeader.replace('Bearer ', '');
//     if (!token) {
//       throw new Error('Authentication required: Invalid token format.');
//     }
//     const decoded = jwt.verify(token, config.jwtSecret);
//     if (!decoded.id) {
//       throw new Error('Authentication required: Invalid token payload.');
//     }
//     req.user = { id: decoded.id, isAdmin: decoded.isAdmin || false };
//     next();
//   } catch (error) {
//     console.error('Authentication error:', error.message);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ success: false, message: 'jwt expired' });
//     }
//     res.status(401).json({ success: false, message: error.message });
//   }
// };

/**
 * Authentication middleware.
 */
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid or missing token' });
    }
    req.user = user;
    req.userId = user._id.toString(); // Explicitly set userId
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Invalid or missing token' });
  }
};