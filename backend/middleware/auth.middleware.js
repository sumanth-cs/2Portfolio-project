import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
      console.log('No token provided in request');
      return res.status(401).json({ success: false, message: 'Authentication required: No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('Token expired');
        return res.status(401).json({ success: false, message: 'jwt expired' });
      }
      console.log('Invalid token:', error.message);
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    if (!decoded.id) {
      console.log('Invalid token payload: no id');
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('User not found for id:', decoded.id);
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = { id: user._id.toString(), isAdmin: user.isAdmin || false };
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};
