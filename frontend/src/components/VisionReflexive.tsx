const VisionReflexive = () => {
  return (
    <section className="bg-gray-900 border border-blue-900/50 p-8 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-3">🧠 Vision & Capacité Réflexive</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-300 text-sm leading-relaxed">
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Évolution de la perception du métier</h3>
          <p className="mb-4">
            L'intégration de l'intelligence artificielle au cœur des systèmes d'information représente l'un des virages technologiques les plus stimulants de ces dernières années. L'ambition de ce cursus était pour moi d'acquérir une compréhension fine de ces nouveaux paradigmes, afin d'adosser à mon parcours de Directeur Technique la maîtrise des architectures IA émergentes.
            Ma perception jusqu'alors se limitait au succès commercial des IA génératives. Ce parcours m'a permis d'appréhender les choses en profondeur.
          </p>
          <p className="mb-4">
            J'ai ainsi pu concrétiser ma vision à travers la réalisation du projet personnel attendu en fin de cursus, qui m'a permis d'adresser de front les défis structurels identifiés lors de la formation. Cette immersion au cœur de la complexité des modèles et des infrastructures offre le recul stratégique nécessaire pour maîtriser les véritables enjeux de l'entreprise : l'optimisation des coûts d'inférence, la sécurité des flux, la gouvernance des données et l'indépendance technologique. C'est cette double culture qui permet aujourd'hui de concevoir des architectures cibles viables et d'orienter sereinement les équipes d'experts vers des solutions souveraines (une démarche s'inscrivant pleinement dans la trajectoire d'un Head of AI Platform).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Axes d'amélioration & Défis</h3>
          <p className="mb-4">
            Avec le recul sur les 15 projets du cursus, mon principal axe d'amélioration réside dans l'optimisation continue des coûts d'inférence (FinOps) sur des infrastructures locales. Le défi actuel consiste à maintenir une veille technologique agressive sur les frameworks multi-agents tout en garantissant des déploiements robustes et prédictibles pour les équipes.
          </p>
          <p>
            Sur le plan technique, le déploiement d'un cluster sous OKD m'a permis de valider une exigence de sécurité élevée, bien au-delà des standards habituels. La gestion de ressources GPU contraintes (16Go non-fractionnables) a constitué un moteur d'optimisation : elle a imposé une segmentation intelligente des pipelines. Ma stratégie d'évolution repose désormais sur une architecture distribuée, permettant de cloisonner les traitements selon leur criticité et leur nature (ingestion RAG, inférence LLM en temps réel, et tâches asynchrones d'orchestration), garantissant ainsi la pérennité et la fluidité de la plateforme.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionReflexive;
