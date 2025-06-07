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

const staticData = {
  bio: {
    name: 'John Doe',
    title: 'Full-Stack Developer',
    bio: 'Passionate about building user-friendly and scalable web applications.',
    image: 'https://picsum.photos/200',
  },
  skills: [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
  ],
  experiences: [
    {
      title: 'Senior Developer',
      company: 'Tech Corp',
      period: '2020 - Present',
      description: 'Led a team to build scalable web applications.',
    },
  ],
  educations: [
    {
      degree: 'B.Sc. Computer Science',
      institution: 'XYZ University',
      period: '2016 - 2020',
    },
  ],
  projects: [
    {
      _id: 'static1',
      title: 'Sample Project',
      description: 'A showcase of modern web development techniques.',
      image: 'https://picsum.photos/300/200',
      tags: ['React', 'Node.js'],
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com/example',
    },
  ],
};

function Home() {
  const { user } = useContext(AuthContext);
  const [bio, setBio] = useState(staticData.bio);
  const [skills, setSkills] = useState(staticData.skills);
  const [experiences, setExperiences] = useState(staticData.experiences);
  const [educations, setEducations] = useState(staticData.educations);
  const [projects, setProjects] = useState(staticData.projects);
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
          name: bioData.name || staticData.bio.name,
          title: bioData.title || staticData.bio.title,
          description: bioData.bio || staticData.bio.bio,
          image: bioData.image || staticData.bio.image,
        });
        setSkills(bioData.skills?.length > 0 ? bioData.skills : staticData.skills);
        setExperiences(bioData.experience?.length > 0 ? bioData.experience : staticData.experiences);
        setEducations(bioData.education?.length > 0 ? bioData.education : staticData.educations);
        setProjects(projectData?.length > 0 ? projectData : staticData.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Hero bio={bio} />
      <About bio={bio} />
      <Skills skills={skills} loading={loading} />
      <Experience experiences={experiences} loading={loading} />
      <Education educations={educations} loading={loading} />
      <Projects projects={projects} loading={loading} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default Home;