/**
 * API functions for bio operations.
 */
import { apiFetch } from './api.js';

export const updateBio = async (bioData) => {
  const response = await apiFetch('/api/bio', {
    method: 'PUT',
    body: JSON.stringify(bioData),
  });
  return response.bio;
};

export const getBio = async () => {
  const response = await apiFetch('/api/bio', {
    method: 'GET',
  });
  return response.bio;
};