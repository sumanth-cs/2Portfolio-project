/**
 * API functions for project operations.
 */
import { apiFetch } from './api.js';

export const createProject = async (projectData) => {
  const response = await apiFetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
  return response;
};

export const getProjects = async () => {
  const response = await apiFetch('/api/projects', {
    method: 'GET',
  });
  return response;
};

export const updateProject = async (projectData) => {
  const response = await apiFetch('/api/projects', {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
  return response;
};