import { Skill } from '../types/project';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h4>
    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{skill.description}</p>
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--color-primary)] transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span className="text-xs font-bold text-[var(--color-primary)] w-8">{skill.level}%</span>
    </div>
  </div>
);

interface SkillsProps {
  skills: {
    cto: Skill[];
    ai: Skill[];
  };
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative pb-4">
          Compétences
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-primary)] rounded-full"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* CTO Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center md:text-left text-gray-800">CTO</h3>
            <div className="flex flex-col gap-4">
              {skills.cto.map((skill) => (
                <SkillCard key={skill.title} skill={skill} />
              ))}
            </div>
          </div>

          {/* AI Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center md:text-left text-gray-800">
              Spécialisation IA en cours
            </h3>
            <div className="flex flex-col gap-4">
              {skills.ai.map((skill) => (
                <SkillCard key={skill.title} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
