import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce app built with React and Node.js.',
      link: 'https://example.com',
    },
    {
      title: 'Task Manager',
      description: 'A task management tool with real-time updates using WebSockets.',
      link: 'https://example.com',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and Tailwind CSS.',
      link: 'https://example.com',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="shadow-lg">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button>View Project</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;