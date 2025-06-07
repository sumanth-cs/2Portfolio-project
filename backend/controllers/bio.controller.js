/**
 * Bio controller for handling bio-related operations.
 */
import { createBio, getBioByUserId, updateBio } from '../models/bio.model.js';

export const createUserBio = async (req, res, next) => {
  try {
    const { name, title, bio, email, phone, skills, education, experience, social } = req.body;
    if (!name || !title || !bio || !email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const newBio = await createBio(req.userId, { name, title, bio, email, phone, skills, education, experience, social });
    res.status(201).json({ success: true, bio: newBio });
  } catch (error) {
    next(error);
  }
};

export const getUserBio = async (req, res, next) => {
  try {
    const bio = await getBioByUserId(req.userId);
    res.status(200).json({ success: true, bio: bio || {} });
  } catch (error) {
    next(error);
  }
};

export const updateUserBio = async (req, res, next) => {
  try {
    const { name, title, bio, email, phone, skills, education, experience, social } = req.body;
    if (!name || !title || !bio || !email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const updatedBio = await updateBio(req.userId, { name, title, bio, email, phone, skills, education, experience, social });
    res.status(200).json({ success: true, bio: updatedBio });
  } catch (error) {
    next(error);
  }
};