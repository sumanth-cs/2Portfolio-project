import { updateBio, getBio } from '../models/bio.model.js';

export const updateBioController = async (req, res, next) => {
  try {
    const bio = await updateBio(req.body);
    res.status(200).json({ success: true, bio });
  } catch (error) {
    next(error);
  }
};

export const getBioController = async (req, res, next) => {
  try {
    const bio = await getBio();
    res.status(200).json({ success: true, bio });
  } catch (error) {
    next(error);
  }
};