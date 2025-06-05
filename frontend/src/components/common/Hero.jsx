import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/src/assets/background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative text-center text-white z-10">
        <img
          src="/src/assets/profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-5xl font-bold mb-4">John Doe</h1>
        <p className="text-xl mb-6 max-w-md mx-auto">
          Full-Stack Developer | Passionate about building user-friendly and scalable web applications.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;