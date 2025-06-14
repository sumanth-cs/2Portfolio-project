import mongoose from 'mongoose';
import { getBioByUserId as getBioFromModel, updateBio, createBio } from '../models/bio.model.js';

export const getBio = async (req, res, next) => {
  try {
    // For public access (no auth required)
    if (!req.user?.id) {
      return res.status(200).json({
        success: true,
        bio: null,
        message: 'No user authenticated, returning empty bio'
      });
    }

    const bio = await getBioFromModel(req.user.id);
    if (!bio) {
      return res.status(200).json({
        success: true,
        bio: null,
        message: 'No bio found for this user'
      });
    }

    res.status(200).json({
      success: true,
      bio
    });
  } catch (error) {
    console.error('Error fetching bio:', error);
    next(error);
  }
};

export const updateUserBio = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { name, title, bio, email, phone, image, skills, education, experience, social, resume } = req.body;

    // Validate required fields
    if (!name || !title || !bio || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, title, bio and email are required'
      });
    }

    const updatedBio = await updateBio(req.user.id, {
      name,
      title,
      bio,
      email,
      phone: phone || '',
      image: image || '',
      skills: skills || [],
      education: education || [],
      experience: experience || [],
      social: social || [],
      resume: resume || ''
    });

    res.status(200).json({
      success: true,
      bio: updatedBio
    });
  } catch (error) {
    console.error('Error updating bio:', error);
    next(error);
  }
};

export const createUserBio = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { name, title, bio, email } = req.body;

    // Check if bio already exists
    const existingBio = await getBioFromModel(req.user.id);
    if (existingBio) {
      return res.status(400).json({
        success: false,
        message: 'Bio already exists for this user'
      });
    }

    // Create new bio with minimal required fields
    const newBio = await createBio(req.user.id, {
      name,
      title,
      bio,
      email,
      phone: '',
      image: '',
      skills: [],
      education: [],
      experience: [],
      social: [],
      resume: ''
    });

    res.status(201).json({
      success: true,
      bio: newBio
    });
  } catch (error) {
    console.error('Error creating bio:', error);
    next(error);
  }
};

// Add this new function to your existing controller
export const getBioByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    const bio = await getBioFromModel(userId);
    
    if (!bio) {
      return res.status(404).json({
        success: false,
        message: 'Bio not found for this user'
      });
    }

    res.status(200).json({
      success: true,
      bio
    });
  } catch (error) {
    console.error('Error fetching bio by user ID:', error);
    next(error);
  }
};