import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Hero from '../components/common/Hero';
import About from '../components/common/About';
import Skills from '../components/common/Skills';
import Experience from '../components/common/Experience';
import Education from '../components/common/Education';
import Projects from '../components/common/Projects';
import Contact from '../components/common/Contact';
import Footer from '../components/common/Footer';
import { getBio } from '../api/bio.js';

const DEFAULT_BIO = {
  name: 'John Doe',
  title: 'Professional Title',
  bio: 'A brief bio about yourself goes here. Tell visitors who you are and what you do.',
  email: 'email@example.com',
  phone: '+1 (555) 123-4567',
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' }
  ],
  education: [
    {
      degree: 'Computer Science',
      institution: 'University of Example',
      period: '2015-2019'
    }
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Tech Company Inc.',
      period: '2020-Present',
      description: 'Developed web applications using modern technologies.'
    }
  ],
  social: [
    { name: 'GitHub', link: 'https://github.com' },
    { name: 'LinkedIn', link: 'https://linkedin.com' }
  ],
  resume: '',
  image: '/placeholder-profile.jpg'
};

function Home() {
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bioData = await getBio();
        if (bioData) {
          // Merge with defaults to ensure all fields exist
          setBio({ ...DEFAULT_BIO, ...bioData });
        } else {
          setBio(DEFAULT_BIO);
        }
      } catch (error) {
        console.error('Failed to fetch bio:', error);
        setError('Failed to load profile data. Using default values.');
        setBio(DEFAULT_BIO);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBio();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Hero bio={bio} />
      <About bio={bio} />
      <Skills skills={bio.skills} loading={loading} />
      <Experience experiences={bio.experience} loading={loading} />
      <Education educations={bio.education} loading={loading} />
      <Projects projects={bio.projects || []} loading={loading} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;