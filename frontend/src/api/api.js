/**
 * API client using fetch for backend communication.
 */
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://twoportfolio-project.onrender.com";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  // Determine if the request is for file upload (multipart/form-data)
  const isFormData = options.body instanceof FormData;

  const defaultOptions = {
    ...options,
    headers: {
      // Only set Content-Type for non-FormData requests
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, defaultOptions);

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `HTTP error ${response.status}`);
      }
      return data;
    } else if (response.ok && isFormData) {
      // Handle non-JSON responses for file uploads
      return await response.json(); // Assuming backend returns JSON with fileUrl
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON, received ${contentType || 'unknown content type'}: ${text.slice(0, 50)}...`);
    }
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export const signup = async (name, email, password) => {
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async (email, password) => {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  return apiFetch('/api/auth/logout', {
    method: 'POST',
  });
};

export const getCurrentUser = async () => {
  return apiFetch('/api/auth/current', {
    method: 'GET',
  });
};

export const getPortfolios = async () => {
  return apiFetch('/api/portfolio', {
    method: 'GET',
  });
};

export const createPortfolio = async (portfolioData) => {
  return apiFetch('/api/portfolio', {
    method: 'POST',
    body: JSON.stringify(portfolioData),
  });
};