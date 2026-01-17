import { Skill } from '../types/project';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => (
  <div className="skill-card">
    <h4 className="skill-card__title">{skill.title}</h4>
    <p className="skill-card__description">{skill.description}</p>
    <div className="skill-card__progress">
      <div className="progress-bar" style={{ 
          background: `linear-gradient(to right, var(--color-primary) ${skill.level}%, var(--color-secondary) ${skill.level}%)`,
          width: '100%' 
      }}></div>
      <span className="skill-card__percentage">{skill.level}%</span>
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
    <section id="skills" className="skills">
        <div className="container">
            <h2 className="section__title">Compétences</h2>
            
            <div className="skills__container">
                {/* CTO Skills Column */}
                <div className="skills__section">
                    <h3 className="skills__section-title">CTO</h3>
                    <div className="skills__grid">
                        {skills.cto.map((skill) => (
                            <SkillCard key={skill.title} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* AI Skills Column */}
                <div className="skills__section">
                    <h3 className="skills__section-title">Spécialisation IA en cours d'acquisition</h3>
                    <div className="skills__grid">
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
