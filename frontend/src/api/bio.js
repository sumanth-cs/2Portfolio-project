/**
 * API functions for bio operations.
 */
import { apiFetch } from './api.js';

export const updateBio = async (bioData) => {
  const response = await apiFetch('/api/bio', {
    method: 'PUT',
    body: JSON.stringify(bioData),
  });
  console.log('updateBio API response:', response); // Debug log
  return response.bio || response;
};

export const getBio = async () => {
  const response = await apiFetch('/api/bio', {
    method: 'GET',
  });
  console.log('getBio API response:', response); // Debug log
  return response.bio || {}; // Return bio object or empty object
};