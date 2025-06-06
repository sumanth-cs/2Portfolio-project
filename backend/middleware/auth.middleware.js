import { account } from '../config/appwrite.js';

export const authenticate = async (req, res, next) => {
  try {
    const user = await account.get();
    req.userId = user.$id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await account.get();
    if (!user.labels.includes('admin')) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};