import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageType } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onScrollToContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onScrollToContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect scroll to activate header background styling
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const hasBackground = isScrolled || isMenuOpen;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 select-none transition-colors duration-300 ${
        hasBackground
          ? 'bg-white/85 backdrop-blur-md border-b border-stone-200/50 pointer-events-auto shadow-xs'
          : 'bg-transparent border-b border-transparent pointer-events-none'
      }`}
    >
      <div className="w-full px-3 sm:px-3.5 pointer-events-auto flex items-start justify-between relative">
        {/* Left spacer for visual optical balance */}
        <div className="w-auto sm:w-1/4 hidden sm:block pointer-events-none" />

        {/* Center Brand Identity: Official SANDRA CARLOS Logo with balanced top and bottom height */}
        <div className="flex-1 text-center flex flex-col items-center py-2.5 sm:py-3">
          <button
            id="brand-logo-button"
            onClick={() => {
              onNavigate('home');
              window.scrollTo(0, 0);
            }}
            className="group cursor-pointer focus:outline-none inline-flex flex-col items-center text-center transition-opacity duration-300 hover:opacity-85"
            aria-label="Ir para a página inicial"
          >
            <Logo size="md" />
          </button>
        </div>

        {/* Right side: Instagram icon at far right with equal top/lateral margin, menu links in exact open position */}
        <div
          ref={menuRef}
          className="w-auto sm:w-1/4 pt-3 sm:pt-3.5 pb-2.5 sm:pb-3 flex justify-end items-start transition-all duration-300"
        >
          <div className="flex items-start gap-2.5 sm:gap-3.5">
            {/* Menu Column: top row for MENU trigger (when scrolled), and stacked links in the exact same position */}
            <div className="flex flex-col items-end min-w-[85px] sm:min-w-[100px]">
              {/* Top slot for MENU trigger: aligned with Instagram icon height */}
              <div className="h-7 sm:h-8 flex items-center justify-end">
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.button
                      id="header-menu-button"
                      key="btn-menu"
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => setIsMenuOpen(true)}
                      className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-stone-900 hover:text-[#b87d1d] py-1 px-1 cursor-pointer transition-colors flex items-center gap-1.5 focus:outline-none"
                      aria-label="Abrir Menu"
                      aria-expanded={false}
                    >
                      <span>MENU</span>
                      <Menu size={14} strokeWidth={1.8} />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="btn-menu-open"
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-stone-900 py-1"
                    >
                      <span className="text-stone-900 px-0.5 sm:px-1">MENU</span>
                      <span className="text-stone-400 mx-1">|</span>
                      <button
                        id="header-close-button"
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-[#b87d1d] text-stone-900 px-0.5 sm:px-1 cursor-pointer transition-colors flex items-center gap-1 focus:outline-none"
                        aria-label="Fechar Menu"
                        aria-expanded={true}
                      >
                        <span>CLOSE</span>
                        <X size={13} strokeWidth={2} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stacked links: CASAS, SOBRE MIM, CONTATOS displayed only when menu is opened */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.nav
                    id="header-nav-menu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    aria-label="Menu principal"
                    className="pt-1.5 pb-1 flex flex-col items-end space-y-1 sm:space-y-1.5 text-right w-full overflow-hidden"
                  >
                    <button
                      id="nav-link-casas"
                      onClick={() => {
                        onNavigate('casas');
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] transition-colors cursor-pointer py-0.5 ${
                        currentPage === 'casas'
                          ? 'text-[#36210f] font-bold border-b border-[#36210f]'
                          : 'text-stone-800 hover:text-[#b87d1d] font-medium'
                      }`}
                    >
                      CASAS
                    </button>

                    <button
                      id="nav-link-sobre"
                      onClick={() => {
                        onNavigate('sobre');
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] transition-colors cursor-pointer py-0.5 ${
                        currentPage === 'sobre'
                          ? 'text-[#36210f] font-bold border-b border-[#36210f]'
                          : 'text-stone-800 hover:text-[#b87d1d] font-medium'
                      }`}
                    >
                      SOBRE MIM
                    </button>

                    <button
                      id="nav-link-contatos"
                      onClick={() => {
                        onScrollToContact();
                        setIsMenuOpen(false);
                      }}
                      className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-stone-800 hover:text-[#b87d1d] font-medium transition-colors cursor-pointer py-0.5"
                    >
                      CONTATOS
                    </button>

                    <button
                      id="nav-link-dicas"
                      onClick={() => {
                        onNavigate('dicas');
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] transition-colors cursor-pointer py-0.5 ${
                        currentPage === 'dicas'
                          ? 'text-[#36210f] font-bold border-b border-[#36210f]'
                          : 'text-stone-800 hover:text-[#b87d1d] font-medium'
                      }`}
                    >
                      DICAS
                    </button>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>

            {/* Instagram icon placed at the far top-right corner with matching top and lateral spacing */}
            <div className="h-7 sm:h-8 flex items-center justify-center">
              <a
                id="header-instagram-link"
                href="https://instagram.com/sandracarlosimobiliaria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @sandracarlosimobiliaria"
                title="Instagram @sandracarlosimobiliaria"
                className="text-stone-800 hover:text-[#b87d1d] transition-colors p-1 cursor-pointer flex items-center justify-center shrink-0"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
