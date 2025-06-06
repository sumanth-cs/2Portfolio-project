import axios from 'axios';

// const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signup = async (name, email, password) => {
  const response = await axios.post(`/api/auth/signup`, { name, email, password });
  return response.data.user;
};

export const login = async (email, password) => {
  const response = await axios.post(`/api/auth/login`, { email, password });
  return response.data.user;
};

export const logout = async () => {
  await axios.post(`/api/auth/logout`, {}, { withCredentials: true });
};