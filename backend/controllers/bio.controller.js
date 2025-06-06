/**
 * Bio controller for handling bio-related operations.
 */
import { getBio, updateBio } from '../models/bio.model.js';

export const getUserBio = async (req, res, next) => {
  try {
    const bio = await getBio(req.userId);
    res.status(200).json({ success: true, bio });
  } catch (error) {
    next(error);
  }
};

export const updateUserBio = async (req, res, next) => {
  try {
    const { content, profileImage } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Content is required' });
    }
    const bio = await updateBio(req.userId, content, profileImage);
    res.status(200).json({ success: true, bio });
  } catch (error) {
    next(error);
  }
};