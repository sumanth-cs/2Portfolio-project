import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createUserBio, getBio, updateUserBio } from '../controllers/bio.controller.js';

const router = express.Router();

// Public route for getting bio (modified)
router.get('/', async (req, res, next) => {
  try {
    // Try to get authenticated user's bio first
    if (req.headers.authorization) {
      try {
        const authRes = await authenticate(req, res, () => {});
        if (authRes && authRes.userId) {
          const bio = await getBioByUserId(authRes.userId);
          return res.status(200).json({ success: true, bio });
        }
      } catch (authError) {
        // If auth fails, continue to default bio
      }
    }
    
    // Return default bio for non-authenticated users
    const defaultBio = {
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
    
    res.status(200).json({ success: true, bio: defaultBio });
  } catch (error) {
    next(error);
  }
});

// Protected routes
router.put('/', authenticate, updateUserBio);
router.post('/', authenticate, createUserBio);

export default router;