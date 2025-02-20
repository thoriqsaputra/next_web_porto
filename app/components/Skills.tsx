export default function Skills() {
    const skills = [
      'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS', 'Node.js', 'Git'
    ];
  
    return (
      <section id="skills" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg.blue-500 text-white rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }