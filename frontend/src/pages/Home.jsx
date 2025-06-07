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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <Header />
      <div className="pt-16">
        <Hero bio={bio} />
        <About bio={bio} />
        <Skills skills={skills} loading={loading} />
        <Experience experiences={experiences} loading={loading} />
        <Education educations={educations} loading={loading} />
        <Projects projects={projects} loading={loading} />
        <Contact />
        <Footer />
      </div>
    </motion.div>
  );
}

export default Home;