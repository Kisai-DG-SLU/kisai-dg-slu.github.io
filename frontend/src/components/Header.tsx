import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'A propos', href: '#accueil' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Formation', href: '#formation' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 shadow-lg py-2' : 'bg-white/95 py-4'
    } backdrop-blur-md border-b border-gray-200`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
          <h1 className="text-xl font-bold bg-linear-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] bg-clip-text text-transparent">
            Damien GUESDON
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-black font-medium hover:text-[var(--color-primary)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom--1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <ul className="p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="block py-2 text-black hover:text-[var(--color-primary)] border-b border-gray-100 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
