import { ExpertiseMatrix as ExpertiseMatrixType } from '../types/project';

interface ExpertiseMatrixProps {
  matrix: ExpertiseMatrixType;
}

const columnTitleColors = [
  'text-blue-400',
  'text-blue-300',
  'text-purple-400',
  'text-green-400',
];

const ExpertiseMatrix = ({ matrix }: ExpertiseMatrixProps) => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Matrice d'Expertise Détaillée</h2>
        <p className="text-gray-400">Synthèse technique et comportementale issue des projets déployés.</p>
      </div>

      <div className="w-full bg-gray-900 text-gray-200 p-10 rounded-xl shadow-2xl border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-gray-700 pb-5">
          {matrix.columns.map((col, i) => (
            <h3 key={col.title} className={`font-bold text-lg ${columnTitleColors[i] || 'text-white'}`}>
              {col.title}{col.subtitle ? ` (${col.subtitle})` : ''}
            </h3>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-sm">
          {matrix.columns.map((col) => (
            <div key={col.title} className="space-y-5">
              {col.items.map((item) => (
                <div key={item.name}>
                  <span className="block font-semibold text-white mb-1.5 text-base">{item.name}</span>
                  <span className="text-gray-400 leading-relaxed">{item.tags}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseMatrix;
