const StrategicProject = () => {
  return (
    <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6">🚀 Projet Stratégique : Écosystème SophIA</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
          <h4 className="font-bold text-green-400 mb-3 text-base">1. Besoins & 2. Audit</h4>
          <p className="text-gray-400 mb-2"><strong className="text-gray-300">Contexte métier :</strong> Besoin vital d'indépendance technologique face aux régulations tierces (Cloud Act).</p>
          <p className="text-gray-400"><strong className="text-gray-300">Audit data :</strong> Nécessité d'une infrastructure locale souveraine ("bunkerisée"), capable de traiter des données sensibles hors du cloud public.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
          <h4 className="font-bold text-blue-400 mb-3 text-base">3. Solution Technique</h4>
          <p className="text-gray-400">Architecture OKD bare-metal avec routage interne complexe. Déploiement de modèles locaux (vLLM) sur GPU NVIDIA. Orchestration via LiteLLM et mise en place d'un RAG à 5 dimensions.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
          <h4 className="font-bold text-purple-400 mb-3 text-base">4. Stratégie & 5. Contrôle</h4>
          <p className="text-gray-400 mb-2"><strong className="text-gray-300">Appui méthodologique :</strong> Structuration des standards de conteneurisation pour l'équipe technique.</p>
          <p className="text-gray-400"><strong className="text-gray-300">Analyse perf :</strong> Contrôle proactif des temps de latence et évaluation fine de la charge GPU.</p>
        </div>
      </div>
    </section>
  );
};

export default StrategicProject;
