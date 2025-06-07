// /**
//  * Theme model for MongoDB.
//  */
// import mongoose from 'mongoose';

// const themeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   'text-color': { type: String, default: '#000000' },
//   'bg-color': { type: String, default: '#ffffff' },
// }, { timestamps: true });

// const Theme = mongoose.model('Theme', themeSchema);

// export const getTheme = async (userId) => {
//   return await Theme.findOne({ userId });
// };

// export const updateTheme = async (userId, colors) => {
//   return await Theme.findOneAndUpdate(
//     { userId },
//     { ...colors, userId },
//     { upsert: true, new: true }
//   );
// };

// export default Theme;

// backend/models/theme.model.js
import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  'text-color': { type: String, default: '#000000' },
  'bg-color': { type: String, default: '#ffffff' }
}, { timestamps: true });

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

const Theme = mongoose.model('Theme', themeSchema);
export default Theme;