import { apiFetch } from './api.js';

export const getTheme = async () => {
  const res = await apiFetch('/api/theme', {
    method: 'GET',
  });
  return res;
};

export const updateTheme = async (colors) => {
  const res = await apiFetch('/api/theme', {
    method: 'PUT',
    body: JSON.stringify(colors),
  });
  return res.theme;
};