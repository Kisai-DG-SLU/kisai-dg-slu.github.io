import { Formation as FormationType, Project } from '../types/project';

interface FormationProps {
  formation: FormationType;
  projects: Project[];
}

const Formation = ({ formation, projects }: FormationProps) => {
  const progressPercentage = (formation.completed_hours / formation.total_hours) * 100;
  
  // On récupère quelques jalons clés pour la timeline (ex: terminés, en cours, et les gros jalons à venir)
  const timelineProjects = projects.filter(p => 
    p.status === 'completed' || 
    p.status === 'in_progress' || 
    [7, 11, 15].includes(p.id)
  ).slice(0, 5);

  return (
    <section id="formation" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative pb-4">
          Suivi de la formation IA
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-primary)] rounded-full"></span>
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* Header Progress */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center md:text-left">
              {formation.title}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-gray-600 font-medium">Progression globale</span>
                <span className="text-[var(--color-primary)] font-bold text-lg">
                  {Math.round(progressPercentage)}% ({formation.completed_hours}h / {formation.total_hours}h)
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-[var(--color-primary)] to-cyan-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <span className="block text-sm text-gray-500 mb-1">Durée</span>
              <span className="text-lg font-bold text-gray-900">12 mois</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <span className="block text-sm text-gray-500 mb-1">Projets</span>
              <span className="text-lg font-bold text-gray-900">{formation.completed_projects_count} / {formation.projects_total}</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <span className="block text-sm text-gray-500 mb-1">Statut actuel</span>
              <span className="text-lg font-bold text-[var(--color-primary)]">Projet {formation.current_project}</span>
            </div>
          </div>

          {/* Timeline Simplified */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {timelineProjects.map((project) => (
              <div key={project.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
                project.status === 'completed' ? 'is-completed' : ''
              }`}>
                {/* Icon Marker */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 ${
                  project.status === 'completed' ? 'bg-[var(--color-primary)] text-white' : 
                  project.status === 'in_progress' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {project.status === 'completed' ? '✓' : project.id}
                </div>
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm group-hover:shadow-md transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 line-clamp-1">{project.title}</h4>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    project.status === 'completed' ? 'bg-teal-50 text-teal-600' :
                    project.status === 'in_progress' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'
                  }`}>
                    {project.status === 'completed' ? 'Terminé' : project.status === 'in_progress' ? 'En cours' : 'À venir'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formation;
