import { Formation as FormationType, Project, ProjectStatus } from '../types/project';

interface FormationProps {
  formation: FormationType;
  projects: Project[];
}

const EllipsisItem = () => (
  <div className="timeline__item timeline__item--ellipsis">
    <div className="timeline__marker"></div>
    <div className="timeline__content">
      <h4>...</h4>
    </div>
  </div>
);

const Formation = ({ formation, projects }: FormationProps) => {
  const progressPercentage = (formation.completed_hours / formation.total_hours) * 100;
  
  const completedProjects = projects.filter(p => p.status === ProjectStatus.COMPLETED);
  const inProgressProjects = projects.filter(p => p.status === ProjectStatus.IN_PROGRESS);

  const firstCompletedProject = completedProjects.length > 0 ? completedProjects[0] : null;
  const lastCompletedProject = completedProjects.length > 0 ? completedProjects[completedProjects.length - 1] : null;
  const firstInProgressProject = inProgressProjects.length > 0 ? inProgressProjects[0] : null;

  const displayedTimelineProjects: (Project | null)[] = [];
  const hasSkippedCompleted = completedProjects.length > 2;

  if (firstCompletedProject) {
    displayedTimelineProjects.push(firstCompletedProject);
  }

  if (hasSkippedCompleted) {
    // Add ellipsis if there's a gap between first and last completed and more than 2 completed projects
    if (firstCompletedProject?.id !== lastCompletedProject?.id) {
        displayedTimelineProjects.push(null); // Use null as a placeholder for ellipsis
    }
  }

  if (lastCompletedProject && (lastCompletedProject.id !== firstCompletedProject?.id || !firstCompletedProject)) {
    displayedTimelineProjects.push(lastCompletedProject);
  }

  if (firstInProgressProject) {
    // Ensure first in-progress is not already the last completed if they are the same project
    if (!lastCompletedProject || firstInProgressProject.id !== lastCompletedProject.id) {
        displayedTimelineProjects.push(firstInProgressProject);
    }
  }

  return (
    <section id="formation" className="formation">
        <div className="container">
            <h2 className="section__title">Suivi de la formation IA (OpenClassrooms)</h2>
            <div className="formation__content">
                <div className="formation__header">
                    <h3 className="formation__title">{formation.title}</h3>
                    <div className="formation__progress">
                        <div className="formation__progress-bar">
                            <div className="progress-bar" style={{ 
                                background: `linear-gradient(to right, var(--color-primary) ${progressPercentage}%, var(--color-secondary) ${progressPercentage}%)`,
                                width: '100%',
                                height: '100%'
                            }}></div>
                        </div>
                        <span className="formation__progress-text">
                            {Math.round(progressPercentage)}% ({formation.completed_hours}h terminées sur {formation.total_hours}h totales)
                        </span>
                    </div>
                </div>
                
                <div className="formation__details">
                    <div className="formation__info">
                        <div className="formation__info-item">
                            <span className="formation__info-label">Durée :</span>
                            <span>12 mois ({formation.projects_total} projets professionnalisants)</span>
                        </div>
                        <div className="formation__info-item">
                            <span className="formation__info-label">Avancement :</span>
                            <span>{Math.round(progressPercentage)}% ({formation.completed_hours}h terminées sur {formation.total_hours}h totales)</span>
                        </div>
                        <div className="formation__info-item">
                            <span className="formation__info-label">Statut :</span>
                            <span>Projet {formation.completed_projects_count} terminé ✅, Projet {formation.current_project} en cours 🔄</span>
                        </div>
                    </div>
                </div>

                <div className="formation__timeline">
                    <div className="timeline">
                        {displayedTimelineProjects.map((project, index) => (
                            project === null ? (
                                <EllipsisItem key={`ellipsis-${index}`} />
                            ) : (
                                <div key={project.id} className={`timeline__item ${
                                    project.status === ProjectStatus.COMPLETED ? 'timeline__item--completed' : 
                                    project.status === ProjectStatus.IN_PROGRESS ? 'timeline__item--current' : ''
                                }`}>
                                    <div className="timeline__marker"></div>
                                    <div className="timeline__content">
                                        <h4>Projet {project.id} : {project.title}</h4>
                                        {project.status === ProjectStatus.COMPLETED ? (
                                            <span className="status status--success">Terminé</span>
                                        ) : project.status === ProjectStatus.IN_PROGRESS ? (
                                            <span className="status status--warning">En cours ({project.progress}%)</span>
                                        ) : (
                                            <span className="timeline__date">{project.duration}</span>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Formation;
