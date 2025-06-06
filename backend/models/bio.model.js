import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
}, { timestamps: true });

const Bio = mongoose.model('Bio', bioSchema);

export const updateBio = async (bioData) => {
  try {
    const bio = await Bio.findOneAndUpdate({}, bioData, { new: true, upsert: true });
    return bio;
  } catch (error) {
    throw new Error(`Failed to update bio: ${error.message}`);
  }
};

export const getBio = async () => {
  try {
    const bio = await Bio.findOne({});
    return bio || {};
  } catch (error) {
    throw new Error(`Failed to get bio: ${error.message}`);
  }
};