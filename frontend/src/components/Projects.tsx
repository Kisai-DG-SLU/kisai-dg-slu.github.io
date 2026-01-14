import { useState } from 'react';
import { Project, ProjectStatus } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    completed: 'border-teal-500 bg-teal-50/30 text-teal-700',
    in_progress: 'border-orange-500 bg-orange-50/30 text-orange-700',
    upcoming: 'border-gray-300 bg-gray-50/30 text-gray-500',
  };

  return (
    <a 
      href={project.link || '#'} 
      target={project.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${statusColors[project.status]}`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full text-sm font-bold shadow-sm">
          {project.id}
        </span>
        <span className="text-2xl">{project.icon}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 h-14 group-hover:text-[var(--color-primary)] transition-colors">
        {project.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
          project.status === 'completed' ? 'bg-teal-100' :
          project.status === 'in_progress' ? 'bg-orange-100' : 'bg-gray-100'
        }`}>
          {project.status === 'completed' ? 'Terminé' : project.status === 'in_progress' ? 'En cours' : 'À venir'}
        </span>
        <span className="text-sm font-semibold text-gray-500">{project.duration}</span>
      </div>
    </a>
  );
};

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = projects.filter(p => filter === 'all' || p.status === filter);

  const tabs: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Terminés', value: 'completed' },
    { label: 'En cours', value: 'in_progress' },
    { label: 'À venir', value: 'upcoming' },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 relative pb-4">
          Projets
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-primary)] rounded-full"></span>
        </h2>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez les 15 projets professionnalisants du parcours AI Engineer, 
          reflétant une progression technique allant de l'automatisation simple au Deep Learning avancé.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === tab.value 
                ? 'bg-[var(--color-primary)] text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
