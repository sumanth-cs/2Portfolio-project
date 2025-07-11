/**
 * Project controller for handling project-related operations.
 */
import { createProject, getProjects, getProjectByUserId, updateProject, Project } from '../models/project.model.js';

export const createUserProject = async (req, res, next) => {
  try {
    const { title, description, image, tags, liveUrl, codeUrl } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const project = await createProject(
      req.user.id, // Use req.user.id
      title,
      description,
      image,
      tags,
      liveUrl,
      codeUrl
    );
    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

export const getUserProjects = async (req, res, next) => {
  try {
    const projects = await getProjects(req.user.id);
    res.status(200).json({ success: true, projects: projects || [] });
  } catch (error) {
    next(error);
  }
};

export const getProjectsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const projects = await getProjectByUserId(userId);
    res.status(200).json({ success: true, projects: projects || [] });
  } catch (error) {
    next(error);
  }
};

export const updateUserProject = async (req, res, next) => {
  try {
    const { id, title, description, image, tags, liveUrl, codeUrl } = req.body;
    if (!id || !title) {
      return res.status(400).json({ success: false, message: 'ID and title are required' });
    }
    const project = await updateProject(
      id,
      req.user.id,
      title,
      description,
      image,
      tags,
      liveUrl,
      codeUrl
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

export const deleteUserProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};