/**
 * Bio model for MongoDB.
 */
import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  skills: [{ name: String, level: { type: String, enum: ['Basic', 'Intermediate', 'Expert'] } }],
  education: [{ degree: String, institution: String, period: String }],
  experience: [{ title: String, company: String, period: String, description: String }],
  social: [{ name: String, link: String }],
  resume: { type: String },
}, { timestamps: true });

const Bio = mongoose.model('Bio', bioSchema);

export const createBio = async (userId, bioData) => {
  const bio = new Bio({ userId, ...bioData });
  return await bio.save();
};

export const getBioByUserId = async (userId) => {
  return await Bio.findOne({ userId });
};

export const updateBio = async (userId, bioData) => {
  return await Bio.findOneAndUpdate({ userId }, bioData, { new: true, upsert: true });
};