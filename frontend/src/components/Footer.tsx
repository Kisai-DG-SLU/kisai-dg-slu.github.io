const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 mb-2">
          &copy; {new Date().getFullYear()} Damien Guesdon. Tous droits réservés.
        </p>
        <p className="text-gray-500 text-sm">
          CTO en spécialisation IA - La Plaine-sur-Mer, Pays de la Loire
        </p>
        <div className="mt-8 flex justify-center gap-6">
           <a href="https://github.com/Kisai-DG-SLU" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">
             GitHub
           </a>
           <a href="https://www.linkedin.com/in/damienguesdon/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">
             LinkedIn
           </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
