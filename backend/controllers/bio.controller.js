import { getBioByUserId, updateBio, createBio } from '../models/bio.model.js';

export const getBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      // Return default bio for unauthenticated users
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
      return res.status(200).json({ success: true, bio: defaultBio });
    }

    const userId = req.user.id;
    const bio = await getBioByUserId(userId);

    // Ensure consistent response format
    const responseData = {
      name: bio?.name || '',
      title: bio?.title || '',
      bio: bio?.bio || '',
      email: bio?.email || '',
      phone: bio?.phone || '',
      image: bio?.image || '',
      skills: Array.isArray(bio?.skills) ? bio.skills : [],
      education: Array.isArray(bio?.education) ? bio.education : [],
      experience: Array.isArray(bio?.experience) ? bio.experience : [],
      social: Array.isArray(bio?.social) ? bio.social : [],
      resume: bio?.resume || '',
    };

    res.status(200).json({ success: true, bio: responseData });
  } catch (error) {
    console.error('Error fetching bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUserBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const bioData = req.body;
    console.log('Updating bio for userId:', userId, 'Data:', bioData); // Debug log

    // Validate required fields
    if (!bioData.name || !bioData.title || !bioData.bio || !bioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const updatedBio = await updateBio(userId, bioData);
    res.status(200).json({ success: true, bio: updatedBio });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createUserBio = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const bioData = req.body;
    console.log('Creating bio for userId:', userId, 'Data:', bioData); // Debug log
    if (!bioData.name || !bioData.title || !bioData.bio || !bioData.email) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const newBio = await createBio(userId, bioData);
    res.status(201).json({ success: true, bio: newBio });
  } catch (error) {
    console.error('Error creating bio:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};