import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';

function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Experience & Education</h2>
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Senior Developer at Tech Corp</CardTitle>
              <p className="text-gray-600">2020 - Present</p>
            </CardHeader>
            <CardContent>
              <p>Led a team of developers to build scalable web applications using React and Node.js.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>B.Sc. Computer Science, XYZ University</CardTitle>
              <p className="text-gray-600">2016 - 2020</p>
            </CardHeader>
            <CardContent>
              <p>Graduated with honors, specializing in software engineering and web development.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Experience;