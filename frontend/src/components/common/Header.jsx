import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center space-x-6">
        {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className="text-gray-700 hover:text-blue-600 font-semibold text-lg capitalize"
          >
            {section}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Header;