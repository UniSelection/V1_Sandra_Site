import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { Testimonials } from '../../components/ui/testimonials-columns-1';
import { ArrowRight, Compass, UserCheck } from 'lucide-react';

interface HomePageProps {
  onScrollToContact: () => void;
  onNavigate: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onScrollToContact, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <article id="home-page" className="w-full bg-[#faf8f5] text-stone-900">
      {/* 1. HERO SECTION (Curated Nordic Living Room with Bookshelves & Natural Light) */}
      <section id="hero-section" className="relative w-full overflow-hidden" aria-label="Apresentação Visual">
        <div className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[88vh] max-h-[960px]">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85"
            alt="Sandra Carlos Consultoria Imobiliária - Sala contemporânea com estantes em madeira e luz natural nórdica"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width="2200"
            height="1400"
          />
          {/* Atmospheric subtle vignette */}
          <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
        </div>
      </section>

      {/* 2. SPLIT INTRODUCTION SECTION (Editorial H1 & Slogan on warm cream, Framed Portrait on Tobacco Brown) */}
      <section id="intro-section" className="w-full" aria-label="Apresentação do Estúdio">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Overall warm cream ground (#faf8f5) with Noble Editorial Spacing */}
          <div className="bg-[#faf8f5] flex flex-col justify-center px-8 sm:px-14 md:px-16 lg:px-24 py-20 sm:py-28 md:py-36">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-[#b87d1d] font-semibold block mb-3">
                CONSULTORIA & CURADORIA PATRIMONIAL
              </span>

              {/* Single semantic H1 for the Homepage */}
              <h1 className="font-sans text-2xl sm:text-3xl md:text-[34px] font-medium leading-[1.3] text-stone-900 uppercase tracking-[0.14em] mb-6">
                SANDRA CARLOS &bull; CONSULTORIA IMOBILIÁRIA E ARQUITETURA
              </h1>

              <p className="font-sans text-stone-800 text-base sm:text-lg md:text-[19px] font-light leading-[1.75] tracking-[-0.01em]">
                Com atuação distintiva em Lisboa, Sintra, Cascais e Comporta, Sandra Carlos proporciona consultoria imobiliária personalizada, especializada na seleção rigorosa de imóveis de autor, arquitetura intemporal e investimentos patrimoniais de excelência.
              </p>

              {/* Internal Navigation Links for SEO */}
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-stone-200/70">
                <button
                  id="home-explore-casas-btn"
                  onClick={() => {
                    onNavigate('casas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 text-stone-900 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-medium border-b-2 border-stone-900 pb-1 cursor-pointer transition-all duration-200 hover:text-[#b87d1d] hover:border-[#b87d1d]"
                >
                  <Compass size={14} className="text-[#b87d1d]" />
                  EXPLORAR CASAS
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="home-about-btn"
                  onClick={() => {
                    onNavigate('sobre');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 text-stone-700 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-medium border-b-2 border-transparent pb-1 cursor-pointer transition-all duration-200 hover:text-stone-950 hover:border-stone-400"
                >
                  <UserCheck size={14} className="text-stone-500" />
                  SOBRE MIM
                </button>

                <button
                  id="home-contact-btn"
                  onClick={onScrollToContact}
                  className="group inline-flex items-center text-stone-700 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-medium border-b-2 border-transparent pb-1 cursor-pointer transition-all duration-200 hover:text-[#b87d1d] hover:border-[#b87d1d]"
                >
                  CONTATOS
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Deep Tobacco Brown Box (#36210f) with Inset Framed Portrait */}
          <div className="bg-[#36210f] flex items-center justify-center p-8 sm:p-14 md:p-16 lg:p-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="bg-[#faf8f5] p-6 sm:p-8 md:p-10 shadow-2xl w-full max-w-md mx-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
                  alt="Sandra Carlos - Consultora Imobiliária e curadora de projetos arquitetónicos de luxo"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                  loading="lazy"
                  width="1000"
                  height="1250"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS SECTION (With semantic H2) */}
      <Testimonials />
    </article>
  );
};

