const Hero = () => {
  return (
    <section id="accueil" className="min-h-[calc(100vh-80px)] flex items-center bg-[#fcfcf9] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h1 className="text-[30px] md:text-[40px] font-bold text-[#13343b] mb-4 leading-tight">
              CTO en spécialisation IA
            </h1>
            <p className="text-lg md:text-xl text-[#626c71] mb-6 font-medium">
              Directeur technique expérimenté spécialisé en IA pour les entreprises innovantes
            </p>
            
            <div className="flex items-center gap-2 text-[#626c71] mb-8 text-sm">
              <span className="text-lg">📍</span>
              <span>La Plaine-sur-Mer, Pays de la Loire</span>
            </div>

            <hr className="w-[60px] border-t-[1.5px] border-[#21808d] opacity-20 mb-8" />

            <div className="max-w-2xl">
              <p className="text-[16px] text-[#13343b] leading-relaxed mb-10 opacity-90">
                Fort de plus de 20 ans d'expérience dans la direction technique, l'architecture d'infrastructures complexes et la gestion de projets stratégiques, j'ai piloté des équipes pluridisciplinaires et mené des transformations technologiques majeures. Aujourd'hui, j'ajoute une spécialisation en Intelligence Artificielle à mon arc pour répondre aux nouveaux enjeux des entreprises innovantes.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="https://damienguesdon.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 border border-[#21808d] text-[#13343b] font-medium rounded hover:bg-[#5e52401f] transition-all duration-300"
                >
                  Découvrir mon parcours
                </a>
                
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/damienguesdon/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#13343b] hover:text-[#21808d] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/Kisai-DG-SLU" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#13343b] hover:text-[#21808d] transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image / Profile Photo - STRICTLY 200px as per style.css */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div 
              className="w-[200px] h-[200px] rounded-full border-[3px] border-[#21808d] bg-gray-200 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
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
    </section>
  );
};

export default Hero;