import { Card, CardContent } from '../ui/card.jsx';

function Skills() {
  const skills = ['JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Python'];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card key={skill} className="shadow-lg">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold">{skill}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;