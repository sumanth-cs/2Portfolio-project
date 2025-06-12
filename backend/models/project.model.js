/**
 * Project model for MongoDB.
 */
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  tags: [{ type: String }],
  liveUrl: { type: String },
  codeUrl: { type: String },
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);

export const createProject = async (userId, title, description, image, tags, liveUrl, codeUrl) => {
  const project = new Project({ userId, title, description, image, tags, liveUrl, codeUrl });
  return await project.save();
};

export const getProjects = async (userId) => {
  return await Project.find({ userId });
};

export const getProjectByUserId = async (userId) => {
  return await Project.find({ userId });
};

export const updateProject = async (id, userId, title, description, image, tags, liveUrl, codeUrl) => {
  return await Project.findOneAndUpdate(
    { _id: id, userId },
    { title, description, image, tags, liveUrl, codeUrl },
    { new: true }
  );
};

export default Project;