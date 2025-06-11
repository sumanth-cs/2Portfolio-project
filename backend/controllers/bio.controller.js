/**
 * Bio controller for handling bio-related operations.
 */
import { getBioByUserId, updateBio, createBio } from '../models/bio.model.js';

export const getBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const bio = await getBioByUserId(userId);
    if (!bio) {
      return res.status(200).json({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        skills: [],
        education: [],
        experience: [],
        social: [],
        resume: '',
      });
    }
    res.status(200).json(bio);
  } catch (error) {
    console.error('Error fetching bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUserBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const bioData = req.body;
    if (!bioData.name || !bioData.title || !bioData.bio || !bioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const updatedBio = await updateBio(userId, bioData);
    res.status(200).json(updatedBio);
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createUserBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const bioData = req.body;
    if (!bioData.name || !bioData.title || !bioData.bio || !bioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const newBio = await createBio(userId, bioData);
    res.status(201).json(newBio);
  } catch (error) {
    console.error('Error creating bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};