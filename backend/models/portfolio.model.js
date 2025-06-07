/**
 * Portfolio model for MongoDB.
 */
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export const createPortfolio = async (userId, title, description, image, tags) => {
  const portfolio = new Portfolio({ userId, title, description, image, tags });
  return await portfolio.save();
};

export const getPortfolios = async (userId) => {
  return await Portfolio.find({ userId });
};

export const getPortfolioByUserId = async (userId) => {
  return await Portfolio.find({ userId });
};

export const updatePortfolio = async (id, userId, title, description, image, tags) => {
  return await Portfolio.findOneAndUpdate(
    { _id: id, userId },
    { title, description, image, tags },
    { new: true }
  );
};