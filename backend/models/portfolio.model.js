import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  photoId: { type: String }, // Appwrite file ID for the photo
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export const createPortfolio = async (portfolioData) => {
  try {
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();
    return portfolio;
  } catch (error) {
    throw new Error(`Failed to create portfolio: ${error.message}`);
  }
};

export const getPortfolios = async (userId) => {
  try {
    const portfolios = await Portfolio.find({ userId });
    return portfolios;
  } catch (error) {
    throw new Error(`Failed to get portfolios: ${error.message}`);
  }
};