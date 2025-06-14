import { apiFetch } from './api';

export const updateBio = async (bioData) => {
  const response = await apiFetch('/api/bio', {
    method: 'PUT',
    body: JSON.stringify(bioData)},
  );
  console.log('updateBio API response:', response);
  // Debug log
  if (!response.success) {
    throw new Error(response.message || 'Failed to update bio');
  }
  return response;
};

export const getBio = async () => {
  try {
    const response = await apiFetch('/api/bio', { method: 'GET' });
    console.log('getBio API response:', response);

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch bio');
    }

    if (!response.bio) {
      console.log('No bio found, returning null');
      return null; // Return null if no bio exists
    }

    const bioData = response.bio;
    return {
      name: bioData.name || '',
      title: bioData.title || '',
      bio: bioData.bio || '',
      email: bioData.email || '',
      phone: bioData.phone || '',
      image: bioData.image || '',
      skills: Array.isArray(bioData.skills) ? bioData.skills : [],
      education: Array.isArray(bioData.education) ? bioData.education : [],
      experience: Array.isArray(bioData.experience) ? bioData.experience : [],
      social: Array.isArray(bioData.social) ? bioData.social : [],
      resume: bioData.resume || '',
    };
  } catch (error) {
    console.error('Failed to fetch bio:', error);
    throw error; // Let the caller handle the error
  }
};