const Hero = () => {
  return (
    <section id="accueil" className="min-h-[calc(100vh-80px)] flex items-center bg-linear-to-br from-white to-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              CTO en spécialisation IA
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">
              Directeur technique expérimenté spécialisé en IA pour les entreprises innovantes
            </p>
            
            <div className="flex items-center gap-2 text-gray-500 mb-8">
              <span className="text-xl">📍</span>
              <span>La Plaine-sur-Mer, Pays de la Loire</span>
            </div>

            <hr className="w-16 border-t-2 border-[var(--color-primary)] opacity-20 mb-8" />

            <div className="max-w-2xl">
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                Fort de plus de 20 ans d'expérience dans la direction technique, l'architecture d'infrastructures complexes et la gestion de projets stratégiques, j'ai piloté des équipes pluridisciplinaires et mené des transformations technologiques majeures. Aujourd'hui, j'ajoute une spécialisation en Intelligence Artificielle à mon arc pour répondre aux nouveaux enjeux des entreprises innovantes.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="https://damienguesdon.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                >
                  Découvrir mon parcours
                </a>
                
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/damienguesdon/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/Kisai-DG-SLU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image / Profile Photo */}
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-[var(--color-primary)] to-cyan-500 rounded-full blur-md opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[var(--color-primary)] bg-gray-200 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              >
                <img 
                  src="/images/photo.jpg" 
                  alt="Damien Guesdon" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
