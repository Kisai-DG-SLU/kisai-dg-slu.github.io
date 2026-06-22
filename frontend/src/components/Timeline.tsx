import { Project } from '../types/project';

interface TimelineProps {
  projects: Project[];
}

const borderColorForId = (id: number): string => {
  if (id <= 4) return 'border-blue-500/40';
  if (id <= 10) return 'border-purple-500/40';
  return 'border-green-500/40';
};

const badgeColorForId = (id: number): string => {
  if (id <= 4) return 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
  if (id <= 10) return 'border-purple-500 shadow-[0_0_10px_rgba(167,139,250,0.3)]';
  return 'border-green-500 shadow-[0_0_10px_rgba(22,163,74,0.3)]';
};

const labelColorForId = (id: number): string => {
  if (id <= 4) return 'text-blue-400';
  if (id <= 10) return 'text-purple-400';
  return 'text-green-400';
};

const gradientForId = (id: number): string => {
  if (id === 15) return 'border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]';
  return '';
};

const Timeline = ({ projects }: TimelineProps) => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">📈 Ligne du Temps : Chronologie des 15 Projets</h2>
      </div>

      <div className="w-full bg-gray-900 pt-8 pb-4 rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
        <div className="flex space-x-8 w-max px-8 pb-4 relative">
          <div className="absolute top-[2.25rem] left-16 right-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded hidden md:block z-0"></div>

          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-[240px] flex-shrink-0 flex flex-col items-center text-center bg-gray-950/80 p-4 rounded-xl border ${borderColorForId(project.id)} ${gradientForId(project.id)} hover:scale-[1.02] transition-all relative z-10 no-underline`}
            >
              <div className={`w-10 h-10 bg-gray-900 border-4 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 ${badgeColorForId(project.id)}`}>
                P{project.id}
              </div>
              <span className={`text-xs font-semibold ${labelColorForId(project.id)} uppercase tracking-wider mb-1`}>
                {project.category}
              </span>
              <h4 className="font-bold text-sm text-white mb-2 h-10 flex items-center justify-center leading-tight">
                {project.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.short_description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
