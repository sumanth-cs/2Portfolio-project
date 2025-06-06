// /**
//  * Bio model for MongoDB.
//  */
// import mongoose from 'mongoose';

// const bioSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   profileImage: { type: String },
// }, { timestamps: true });

// export const Bio = mongoose.model('Bio', bioSchema);

/**
 * Bio model for MongoDB.
 */
import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  profileImage: { type: String },
}, { timestamps: true });

const Bio = mongoose.model('Bio', bioSchema);

export const getBio = async (userId) => {
  try {
    const bio = await Bio.findOne({ userId }).lean();
    if (!bio) {
      throw new Error('Bio not found');
    }
    return bio;
  } catch (error) {
    throw new Error(`Failed to get bio: ${error.message}`);
  }
};

export const updateBio = async (userId, content, profileImage) => {
  try {
    const bio = await Bio.findOneAndUpdate(
      { userId },
      { content, profileImage, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return bio;
  } catch (error) {
    throw new Error(`Failed to update bio: ${error.message}`);
  }
};

export default Bio;