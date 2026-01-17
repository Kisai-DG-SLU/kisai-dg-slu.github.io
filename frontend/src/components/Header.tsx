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
    <header className="header">
        <div className="container">
            <nav className="nav">
                <div className="nav__brand">
                    <img src="/images/logo.png" alt="Logo entreprise" className="nav__logo-icon" />
                    <h1 className="nav__logo">Damien GUESDON</h1>
                </div>
                
                {/* Desktop Menu */}
                <ul className="nav__menu hidden md:flex">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className="nav__link">{link.name}</a>
                      </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button 
                  className={`nav__toggle md:hidden ${isMenuOpen ? 'active' : ''}`} 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </div>

        {/* Mobile Menu */}
        <nav className={`md:hidden absolute top-full left-0 right-0 bg-[var(--color-surface)] border-b border-gray-200/10 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="nav__link block py-3"
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