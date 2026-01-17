const Hero = () => {
  return (
    <section id="accueil" className="hero">
        <div className="container">
            <div className="hero__content">
                <div className="hero__text">
                    <h1 className="hero__title">CTO en spécialisation IA</h1>
                    <p className="hero__subtitle">Directeur technique expérimenté spécialisé en IA pour les entreprises innovantes</p>
                    <div className="hero__location">
                        <span className="hero__location-icon">📍</span>
                        <span>La Plaine-sur-Mer, Pays de la Loire</span>
                    </div>
                    <hr className="hero__separator" />
                    <div className="about__content">
                        <p className="about__text">Fort de plus de 20 ans d'expérience dans la direction technique, l'architecture d'infrastructures complexes et la gestion de projets stratégiques, j'ai piloté des équipes pluridisciplinaires et mené des transformations technologiques majeures. Aujourd'hui, j'ajoute une spécialisation en Intelligence Artificielle à mon arc pour répondre aux nouveaux enjeux des entreprises innovantes.</p>
                        <div className="about__links">
                            <a href="https://damienguesdon.github.io/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Découvrir mon parcours</a>
                            <div className="about__social">
                                <a href="https://www.linkedin.com/in/damienguesdon/" target="_blank" rel="noopener noreferrer" className="about__social-link">LinkedIn</a>
                                <a href="https://github.com/Kisai-DG-SLU" target="_blank" rel="noopener noreferrer" className="about__social-link">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero__image">
                    <div className="photo-profil"></div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;