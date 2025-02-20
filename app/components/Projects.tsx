
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <Image src={image} alt={title} width={500} height={300} className="w-full h-48 object-cover object-center" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </a>
  );
}


export default function Projects() {

    const projects = [
        {
        title: 'Project 1',
        description: 'This is a description for project 1.',
        image: '/project1.jpg',
        link: '#',
        },
        {
        title: 'Project 2',
        description: 'This is a description for project 2.',
        image: '/project2.jpg',
        link: '#',
        },
        {
        title: 'Project 3',
        description: 'This is a description for project 3.',
        image: '/project3.jpg',
        link: '#',
        },
    ];

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}