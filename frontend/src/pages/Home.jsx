import Header from '../components/common/Header.jsx';
import Hero from '../components/common/Hero.jsx';
import About from '../components/common/About.jsx';
import Skills from '../components/common/Skills.jsx';
import Projects from '../components/common/Projects.jsx';
import Experience from '../components/common/Experience.jsx';
import Education from '../components/common/Education.jsx';
import Contact from '../components/common/Contact.jsx';
import Footer from '../components/common/Footer.jsx';

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;