/**
 * Theme model for MongoDB.
 */
import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  primary: { type: String, default: '#2563eb' }, // Blue
  'text-color': { type: String, default: '#000000' }, // Black
  'bg-color': { type: String, default: '#ffffff' }, // White
}, { timestamps: true });

const Theme = mongoose.model('Theme', themeSchema);

export const getTheme = async (userId) => {
  return await Theme.findOne({ userId });
};

export const updateTheme = async (userId, colors) => {
  return await Theme.findOneAndUpdate(
    { userId },
    { ...colors, userId },
    { upsert: true, new: true }
  );
};

export default Theme;