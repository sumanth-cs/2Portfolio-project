import { apiFetch } from './api';

export const sendContactMessage = async (messageData) => {
  const response = await apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(messageData),
  });

  if (!response.success) {
    throw new Error(response.message || 'Failed to send message');
  }

  return response;
};