/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { CookieModal } from './components/CookieModal';
import { PropertyModal } from './components/PropertyModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HousesPage } from './pages/HousesPage';
import { TipsPage } from './pages/TipsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TipArticleModal } from './components/TipArticleModal';
import { PageType, Property, TipArticle } from './types';
import { applySEO } from './utils/seo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<TipArticle | null>(null);

  // Helper to parse route from pathname or hash
  const parseCurrentRoute = (): { page: PageType; shouldScrollContact?: boolean } => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();

    // Priority 1: Check clean path
    if (path === 'sobre' || path === 'sobre-mim') return { page: 'sobre', shouldScrollContact: hash === 'contatos' || hash === 'contacto' };
    if (path === 'casas') return { page: 'casas', shouldScrollContact: hash === 'contatos' || hash === 'contacto' };
    if (path === 'dicas' || path === 'blog') return { page: 'dicas', shouldScrollContact: hash === 'contatos' || hash === 'contacto' };
    if (path === 'contacto' || path === 'contatos') return { page: 'home', shouldScrollContact: true };
    if (path === '404') return { page: '404' };

    // Priority 2: Check hash for deep links
    if (hash === 'casas') return { page: 'casas' };
    if (hash === 'sobre' || hash === 'sobre-mim') return { page: 'sobre' };
    if (hash === 'dicas' || hash === 'blog') return { page: 'dicas' };
    if (hash === 'contatos' || hash === 'contacto') return { page: 'home', shouldScrollContact: true };
    if (hash === '404') return { page: '404' };

    // Root path
    if (path === '' || path === 'home') return { page: 'home', shouldScrollContact: hash === 'contatos' || hash === 'contacto' };

    // Unrecognized URL -> 404
    return { page: '404' };
  };

  // Disable browser automatic scroll restoration to ensure every page loads at the top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Sync route on mount and browser popstate (Back/Forward buttons)
  useEffect(() => {
    const syncRoute = () => {
      const { page, shouldScrollContact } = parseCurrentRoute();
      setCurrentPage(page);
      applySEO(page);

      if (shouldScrollContact) {
        setTimeout(() => {
          const el = document.getElementById('contatos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        window.scrollTo(0, 0);
      }
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Ensure scroll is at the absolute top whenever currentPage changes (including AnimatePresence transitions)
  useEffect(() => {
    if (currentPage === 'contacto') return;

    const resetScroll = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // Instant reset immediately
    resetScroll();

    // Reset again on next frame
    const rafId = requestAnimationFrame(resetScroll);

    // Reset after transition finishes
    const t1 = setTimeout(resetScroll, 100);
    const t2 = setTimeout(resetScroll, 420);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPage]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    applySEO(page);

    // Update browser URL cleanly without reloading
    const newPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page }, '', newPath);
    }

    // Always load immediately at the top of the page
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  const handleScrollToContact = () => {
    // Desliza suavemente para a secção de contactos da página que estiver aberta
    const scrollToContactSection = () => {
      const el = document.getElementById('contatos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    scrollToContactSection();
    // Executa também após um pequeno intervalo para garantir aterragem perfeita caso o menu esteja a recolher
    setTimeout(scrollToContactSection, 60);
    setTimeout(scrollToContactSection, 180);
  };

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleInquireProperty = () => {
    setSelectedProperty(null);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 font-sans selection:bg-[#36210f] selection:text-white">
      {/* Brand Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onScrollToContact={handleScrollToContact}
      />

      {/* Main Content with subtle page transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {(currentPage === 'home' || currentPage === 'contacto') && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HomePage
                onScrollToContact={handleScrollToContact}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {(currentPage === 'sobre' || currentPage === 'sobre-mim') && (
            <motion.div
              key="sobre"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AboutPage
                onScrollToContact={handleScrollToContact}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'casas' && (
            <motion.div
              key="casas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HousesPage
                onSelectProperty={handleSelectProperty}
                onOpenContact={handleOpenContact}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'dicas' && (
            <motion.div
              key="dicas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TipsPage
                onSelectArticle={(article) => setSelectedArticle(article)}
                onScrollToContact={handleScrollToContact}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === '404' && (
            <motion.div
              key="404"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <NotFoundPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimalist Studio Footer with Contatos Destination */}
      <Footer
        onOpenCookies={() => setIsCookiesOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CookieModal
        isOpen={isCookiesOpen}
        onClose={() => setIsCookiesOpen(false)}
      />

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onInquire={handleInquireProperty}
      />

      <TipArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}

