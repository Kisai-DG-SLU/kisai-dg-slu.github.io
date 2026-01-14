import { useState } from 'react';
import { Project, ProjectStatus } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    completed: 'border-teal-500 bg-teal-50/30 text-teal-700',
    in_progress: 'border-orange-500 bg-orange-50/30 text-orange-700',
    upcoming: 'border-gray-200 bg-gray-50/30 text-gray-400',
  };

  return (
    <a 
      href={project.link || '#'} 
      target={project.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${statusColors[project.status]}`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="w-8 h-8 flex items-center justify-center bg-[#21808d] text-white rounded-full text-sm font-bold shadow-sm">
          {project.id}
        </span>
        <span className="text-2xl">{project.icon}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 h-14 group-hover:text-[#21808d] transition-colors">
        {project.title}
      </h3>

      {/* Progress Bar for Projects */}
      {project.status !== 'upcoming' && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>Avancement</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
            <div 
              className={`h-full transition-all duration-1000 ${
                project.status === 'completed' ? 'bg-teal-500' : 'bg-orange-500 animate-pulse'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
          project.status === 'completed' ? 'bg-teal-100 text-teal-700' :
          project.status === 'in_progress' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'
        }`}>
          {project.status === 'completed' ? 'Terminé' : project.status === 'in_progress' ? 'En cours' : 'À venir'}
        </span>
        <span className="text-xs font-bold text-gray-400">{project.duration}</span>
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
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#21808d] rounded-full"></span>
        </h2>
        
        <p className="text-center text-gray-500 text-sm mb-12 max-w-2xl mx-auto italic font-medium">
          Découvrez les 15 projets professionnalisants du parcours AI Engineer. 
          Le Dashboard scanne mes dossiers locaux en temps réel pour refléter mon avancement exact.
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                filter === tab.value 
                ? 'bg-[#21808d] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
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