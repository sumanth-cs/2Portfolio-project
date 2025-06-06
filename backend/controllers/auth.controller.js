import { createUser, loginUser, getUser } from '../models/user.model.js';

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const user = await createUser({ name, email, password, isAdmin: isAdmin || false });
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getUser(req.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await account.deleteSession('current');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};