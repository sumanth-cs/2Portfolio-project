// frontend/src/pages/Home.jsx
import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getBio } from '../api/bio';
import { getProjects } from '../api/projects';
import Header from '../components/common/Header.jsx';
import Hero from '../components/common/Hero.jsx';
import About from '../components/common/About.jsx';
import Skills from '../components/common/Skills.jsx';
import Experience from '../components/common/Experience.jsx';
import Education from '../components/common/Education.jsx';
import Projects from '../components/common/Projects.jsx';
import Contact from '../components/common/Contact.jsx';
import Footer from '../components/common/Footer.jsx';

function Home() {
  const { user } = useContext(AuthContext);
  const [bio, setBio] = useState({});
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionColors, setSectionColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bioData, projectData] = await Promise.all([
          getBio(),
          getProjects(),
        ]);
        
        setBio({
          name: bioData.name || 'Your Name',
          title: bioData.title || 'Your Title',
          description: bioData.bio || 'Add your bio in the admin panel',
          image: bioData.image || '/src/assets/profile.jpg',
        });
        
        setSkills(bioData.skills || []);
        setExperiences(bioData.experience || []);
        setEducations(bioData.education || []);
        setProjects(projectData || []);
        
        // Set section colors from backend or default
        setSectionColors(bioData.sectionColors || [
          'bg-white dark:bg-gray-950',
          'bg-gray-50 dark:bg-gray-900',
          'bg-white dark:bg-gray-950',
          'bg-gray-50 dark:bg-gray-900',
          'bg-white dark:bg-gray-950',
          'bg-gray-50 dark:bg-gray-900',
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  return (
    <div className="relative">
      <Header />
      
      <div className="pt-16">
        <Hero bio={bio} />
        
        <About bio={bio} className={sectionColors[0] || 'bg-white dark:bg-gray-950'} />
        
        <Skills 
          skills={skills} 
          loading={loading} 
          className={sectionColors[1] || 'bg-gray-50 dark:bg-gray-900'} 
        />
        
        <Experience 
          experiences={experiences} 
          loading={loading} 
          className={sectionColors[2] || 'bg-white dark:bg-gray-950'} 
        />
        
        <Education 
          educations={educations} 
          loading={loading} 
          className={sectionColors[3] || 'bg-gray-50 dark:bg-gray-900'} 
        />
        
        <Projects 
          projects={projects} 
          loading={loading} 
          className={sectionColors[4] || 'bg-white dark:bg-gray-950'} 
        />
        
        <Contact className={sectionColors[5] || 'bg-gray-50 dark:bg-gray-900'} />
        
        <Footer />
      </div>
    </div>
  );
}

export default Home;