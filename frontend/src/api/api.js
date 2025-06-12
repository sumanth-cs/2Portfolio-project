/**
 * API client using fetch for backend communication.
 */
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://twoportfolio-project.onrender.com";

// Default data for non-authenticated users
const DEFAULT_BIO = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Experienced developer with a passion for creating web applications.',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  image: '',
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' }
  ],
  education: [
    { degree: 'B.Sc Computer Science', institution: 'Tech University', period: '2014-2018' }
  ],
  experience: [
    { 
      title: 'Senior Developer', 
      company: 'Tech Corp', 
      period: '2019-Present', 
      description: 'Leading development teams' 
    }
  ],
  social: [
    { name: 'GitHub', link: 'https://github.com' },
    { name: 'LinkedIn', link: 'https://linkedin.com' }
  ],
  resume: ''
};

const DEFAULT_PROJECTS = [
  {
    _id: 'default1',
    title: 'Portfolio Website',
    description: 'A personal portfolio website',
    tags: ['React', 'TailwindCSS'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    _id: 'default2',
    title: 'E-commerce App',
    description: 'Online shopping application',
    tags: ['Node.js', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#'
  }
];

const DEFAULT_THEME = {
  text: '#000000',
  background: '#ffffff',
  primary: '#3b82f6',
  buttonText: '#ffffff'
};

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    // Handle unauthorized requests by returning default data
    if (response.status === 401) {
      if (url === '/api/bio') return { bio: DEFAULT_BIO };
      if (url === '/api/projects') return { projects: DEFAULT_PROJECTS };
      if (url === '/api/theme') return { theme: DEFAULT_THEME };
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export const getBio = async () => {
  try {
    const response = await apiFetch('/api/bio', { method: 'GET' });
    return response.bio || DEFAULT_BIO;
  } catch (error) {
    console.error('Failed to fetch bio, using default:', error);
    return DEFAULT_BIO;
  }
};

export const getProjects = async () => {
  try {
    const response = await apiFetch('/api/projects', { method: 'GET' });
    return response.projects || DEFAULT_PROJECTS;
  } catch (error) {
    console.error('Failed to fetch projects, using default:', error);
    return DEFAULT_PROJECTS;
  }
};

export const getTheme = async () => {
  try {
    const response = await apiFetch('/api/theme', { method: 'GET' });
    return response.theme || DEFAULT_THEME;
  } catch (error) {
    console.error('Failed to fetch theme, using default:', error);
    return DEFAULT_THEME;
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