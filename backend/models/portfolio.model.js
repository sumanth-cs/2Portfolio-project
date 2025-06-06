/**
 * Portfolio model for MongoDB.
 */
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export const createPortfolio = async (userId, title, description, images) => {
  try {
    const portfolio = new Portfolio({ userId, title, description, images });
    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(`Failed to create portfolio: ${error.message}`);
  }
};

export const getPortfolios = async (userId) => {
  try {
    const portfolios = await Portfolio.find({ userId }).lean();
    return portfolios;
  } catch (error) {
    throw new Error(`Failed to get portfolios: ${error.message}`);
  }
};

export const getPortfolio = async (userId) => {
  try {
    const portfolio = await Portfolio.findOne({ userId }).lean();
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    return portfolio;
  } catch (error) {
    throw new Error(`Failed to get portfolio: ${error.message}`);
  }
};

export const updatePortfolio = async (userId, title, description, images) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { title, description, images, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return portfolio;
  } catch (error) {
    throw new Error(`Failed to update portfolio: ${error.message}`);
  }
};

export default Portfolio;