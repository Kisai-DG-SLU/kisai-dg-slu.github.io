import { useState } from 'react';
import { Project, ProjectStatus } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusClass = project.status === ProjectStatus.COMPLETED ? 'project-card--completed' :
                     project.status === ProjectStatus.IN_PROGRESS ? 'project-card--current' : '';

  const statusTagClass = project.status === ProjectStatus.COMPLETED ? 'status--success' :
                        project.status === ProjectStatus.IN_PROGRESS ? 'status--warning' : 'status--info';

  return (
    <a
      href={project.link || '#'}
      target={project.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`project-card ${statusClass}`}
    >
        <div className="project-card__header">
            <span className="project-card__number">{project.id}</span>
            <span className="project-card__icon">{project.icon}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__status">
            <span className={`status ${statusTagClass}`}>
                {project.status === ProjectStatus.COMPLETED ? 'Terminé' : project.status === ProjectStatus.IN_PROGRESS ? 'En cours' : 'À venir'}
            </span>
        </div>
        <span className="project-card__duration">{project.duration}</span>
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
    { label: 'Terminés', value: ProjectStatus.COMPLETED },
    { label: 'En cours', value: ProjectStatus.IN_PROGRESS },
    { label: 'À venir', value: ProjectStatus.UPCOMING },
  ];

  return (
    <section id="projects" className="projects">
        <div className="container">
            <h2 className="section__title">
                <a href="https://github.com/Kisai-DG-SLU" target="_blank" rel="noopener noreferrer" className="projects__title-link">Projets</a>
            </h2>

            {/* Filter Tabs - (Optional for UI, keeping them as they add value but styling them with old classes) */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`btn btn--sm ${filter === tab.value ? 'btn--primary' : 'btn--outline'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="projects__grid">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    </section>
  );
};


export default Projects;
