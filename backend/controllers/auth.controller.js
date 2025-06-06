/**
 * Authentication controller.
 */
import { validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { name, email, password, isAdmin } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    user = new User({ name, email, password, isAdmin: isAdmin || false });
    await user.save();
    const token = user.generateToken();
    res.status(201).json({ token, user: { id: user._id, name: user.name, email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: `Failed to create user: ${error.message}` });
    next(error);
  }
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = user.generateToken();
    res.status(200).json({ token, user: { id: user._id, name: user.name, email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: `Failed to login: ${error.message}` });
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ success: false, message: `Failed to fetch user: ${error.message}` });
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: `Failed to logout: ${error.message}` });
    next(error);
  }
};