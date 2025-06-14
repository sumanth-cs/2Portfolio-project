// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://twoportfolio-project.onrender.com'|| "http://localhost:5000";

// Helper function for API requests
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
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        throw new Error('Session expired. Please log in again.');
      }

      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

// Auth API
export const signup = async (name, email, password) => {
  return apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async (email, password) => {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.token) {
    localStorage.setItem('token', response.token);
  }
  
  return response;
};

export const logout = async () => {
  try {
    const response = await apiFetch('/api/auth/logout', {
      method: 'POST',
    });
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await apiFetch('/api/auth/current', {
      method: 'GET',
    });
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

// Bio API
export const getBio = async (userId = null) => {
  try {
    const url = userId ? `/api/bio/${userId}` : '/api/bio';
    const response = await apiFetch(url, { method: 'GET' });
    
    if (!response.success) {
      return null;
    }

    return response.bio ? {
      name: response.bio.name || '',
      title: response.bio.title || '',
      bio: response.bio.bio || '',
      email: response.bio.email || '',
      phone: response.bio.phone || '',
      image: response.bio.image || '',
      aboutImage: response.bio.aboutImage || '',
      skills: Array.isArray(response.bio.skills) ? response.bio.skills : [],
      education: Array.isArray(response.bio.education) ? response.bio.education : [],
      experience: Array.isArray(response.bio.experience) ? response.bio.experience : [],
      social: Array.isArray(response.bio.social) ? response.bio.social : [],
      resume: response.bio.resume || '',
    } : null;
  } catch (error) {
    console.error('Failed to fetch bio:', error);
    return null;
  }
};

export const updateBio = async (bioData) => {
  return apiFetch('/api/bio', {
    method: 'PUT',
    body: JSON.stringify(bioData),
  });
};

// Projects API
export const getProjects = async (userId = null) => {
  try {
    const url = userId ? `/api/projects/${userId}` : '/api/projects';
    const response = await apiFetch(url, { method: 'GET' });
    return response.projects || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

export const createProject = async (projectData) => {
  return apiFetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

export const updateProject = async (projectData) => {
  return apiFetch('/api/projects', {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
};

export const deleteProject = async (id) => {
  return apiFetch(`/api/projects/${id}`, {
    method: 'DELETE',
  });
};

// Theme API
export const getTheme = async (userId = null) => {
  try {
    const url = userId ? `/api/theme/${userId}` : '/api/theme';
    const response = await apiFetch(url, { method: 'GET' });
    
    return response.theme || {
      text: '#000000',
      background: '#ffffff',
      primary: '#0B1D51',
      secondary: '#6b7280',
      accent: '#10b981',
      buttonText: '#ffffff'
    };
  } catch (error) {
    console.error('Failed to fetch theme:', error);
    return {
      text: '#000000',
      background: '#ffffff',
      primary: '#0B1D51',
      secondary: '#6b7280',
      accent: '#10b981',
      buttonText: '#ffffff'
    };
  }
};

export const updateTheme = async (themeData) => {
  return apiFetch('/api/theme', {
    method: 'PUT',
    body: JSON.stringify(themeData),
  });
};

// Default data for non-authenticated users
export const DEFAULT_BIO = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Experienced developer with a passion for creating web applications.',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  image: '',
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' },
  ],
  education: [
    { degree: 'B.Sc Computer Science', institution: 'Tech University', period: '2014-2018' },
  ],
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Corp',
      period: '2019-Present',
      description: 'Leading development teams',
    },
  ],
  social: [
    { name: 'GitHub', link: 'https://github.com' },
    { name: 'LinkedIn', link: 'https://linkedin.com' },
  ],
  resume: '',
};

export const DEFAULT_PROJECTS = [
  {
    _id: 'default1',
    title: 'Portfolio Website',
    description: 'A personal portfolio website',
    tags: ['React', 'TailwindCSS'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    _id: 'default2',
    title: 'E-commerce App',
    description: 'Online shopping application',
    tags: ['Node.js', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#',
  },
];

export const DEFAULT_THEME = {
  text: '#000000',
  background: '#ffffff',
  primary: '#0B1D51',
  secondary: '#6b7280',
  accent: '#10b981',
  buttonText: '#ffffff'
};