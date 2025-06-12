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
    
    // Ensure consistent response format
    const responseData = {
      name: bio?.name || '',
      title: bio?.title || '',
      bio: bio?.bio || '',
      email: bio?.email || '',
      phone: bio?.phone || '',
      image: bio?.image || '',
      skills: Array.isArray(bio?.skills) ? bio.skills : [],
      education: Array.isArray(bio?.education) ? bio.education : [],
      experience: Array.isArray(bio?.experience) ? bio.experience : [],
      social: Array.isArray(bio?.social) ? bio.social : [],
      resume: bio?.resume || '',
    };

    res.status(200).json({ 
      success: true, 
      bio: responseData
    });
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
    console.log('Updating bio for userId:', userId, 'Data:', bioData); // Debug log

    // Fetch existing bio
    const existingBio = await getBioByUserId(userId);
    if (!existingBio && (!bioData.name || !bioData.title || !bioData.bio || !bioData.email)) {
      return res.status(400).json({ success: false, message: 'Required fields missing for new bio' });
    }
    
    // Merge new data with existing bio
    const updatedBioData = {
      name: bioData.name || existingBio?.name || '',
      title: bioData.title || existingBio?.title || '',
      bio: bioData.bio || existingBio?.bio || '',
      email: bioData.email || existingBio?.email || '',
      phone: bioData.phone || existingBio?.phone || '',
      image: bioData.image || existingBio?.image || '',
      skills: Array.isArray(bioData.skills) ? bioData.skills : existingBio?.skills || [],
      education: Array.isArray(bioData.education) ? bioData.education : existingBio?.education || [],
      experience: Array.isArray(bioData.experience) ? bioData.experience : existingBio?.experience || [],
      social: Array.isArray(bioData.social) ? bioData.social : existingBio?.social || [],
      resume: bioData.resume || existingBio?.resume || '',
    };

    // Validate required fields
    if (!updatedBioData.name || !updatedBioData.title || !updatedBioData.bio || !updatedBioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const updatedBio = await updateBio(userId, updatedBioData);
    res.status(200).json({ success: true, bio: updatedBio });
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
    console.log('Creating bio for userId:', userId, 'Data:', bioData); // Debug log
    if (!bioData.name || !bioData.title || !bioData.bio || !bioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const newBio = await createBio(userId, bioData);
    res.status(201).json({ success: true, bio: newBio });
  } catch (error) {
    console.error('Error creating bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};