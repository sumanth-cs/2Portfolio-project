import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const updateBio = async (bioData) => {
  const response = await axios.put(`${API_URL}/api/bio`, bioData, { withCredentials: true });
  return response.data.bio;
};

export const getBio = async () => {
  const response = await axios.get(`${API_URL}/api/bio`);
  return response.data.bio;
};