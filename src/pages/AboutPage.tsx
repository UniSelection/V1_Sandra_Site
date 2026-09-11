import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { Compass } from 'lucide-react';

interface AboutPageProps {
  onScrollToContact: () => void;
  onNavigate?: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onScrollToContact, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <article id="about-page" className="w-full bg-[#faf8f5] text-stone-900 pb-20 sm:pb-28">
      {/* 1. MAIN HERO PORTRAIT - Starts with the exact same distance from the logo as the top of the page */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 pt-[58px] sm:pt-[70px] md:pt-[74px]" aria-label="Retrato da Consultora">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <div className="relative w-full max-w-2xl aspect-[3/4] sm:aspect-[4/5] overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85"
              alt="Sandra Carlos - Consultora imobiliária e fundadora em ambiente de design de interiores e luz natural"
              className="w-full h-full object-cover object-center"
              loading="eager"
              width="1400"
              height="1750"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. TWO-COLUMN EDITORIAL PHILOSOPHY SECTION */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24" aria-label="Biografia e Filosofia">
        {/* Header Block with Unique H1 */}
        <div className="mb-12 border-b border-stone-200/70 pb-6">
          <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#b87d1d] font-semibold block mb-2">
            PERFIL & TRAJETÓRIA
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.12em] text-stone-900 uppercase">
            SOBRE SANDRA CARLOS &bull; CONSULTORIA & VISÃO ARQUITETÓNICA
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 lg:gap-20">
          {/* Left Column: 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="md:col-span-5 flex flex-col justify-start"
          >
            <h2 className="font-sans text-stone-900 text-lg sm:text-xl md:text-[21px] leading-[1.65] font-normal mb-6">
              Uma abordagem autoral ao mercado imobiliário: onde a arquitetura, a discrição e a valorização patrimonial convergem.
            </h2>

            <p className="font-sans text-stone-700 text-xs sm:text-[13px] leading-[1.8] font-light mb-8">
              Sandra Carlos atua na intersecção entre a consultoria imobiliária de alto padrão e o apreço profundo pela pureza formal escandinava e a nobreza dos materiais mediterrânicos.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button
                id="about-contact-button"
                onClick={onScrollToContact}
                className="inline-flex items-center text-stone-900 font-sans text-xs sm:text-sm uppercase tracking-[0.22em] font-medium border-b-2 border-stone-900 pb-1 cursor-pointer transition-all duration-200 hover:text-[#b87d1d] hover:border-[#b87d1d]"
              >
                CONTACTAR CONSULTORIA
              </button>

              {onNavigate && (
                <button
                  id="about-view-houses-button"
                  onClick={() => {
                    onNavigate('casas');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-stone-600 font-sans text-xs uppercase tracking-[0.2em] font-medium hover:text-stone-900 transition-colors cursor-pointer py-1"
                >
                  <Compass size={13} className="text-[#b87d1d]" />
                  VER PORTFÓLIO
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="md:col-span-7 flex flex-col space-y-6 text-stone-700 text-xs sm:text-[13px] md:text-sm font-light leading-[1.8]"
          >
            <h2 className="font-sans text-base sm:text-lg font-medium tracking-[0.08em] text-stone-900 uppercase">
              PRINCÍPIOS DE CURADORIA & RIGOR
            </h2>

            <p>
              Desde a sua génese, a filosofia de trabalho de Sandra Carlos assenta na sustentabilidade e na perenidade estética: assessorar compradores e proprietários na escolha de espaços que resistem à passagem do tempo, enraizados na luz natural, na qualidade construtiva e no respeito pelo contexto histórico e paisagístico.
            </p>

            <p>
              Cada transação ou mandato é tratado como uma obra singular. Recusamos a intermediação massificada; privilegiamos a relação pessoal, a análise rigorosa de mercado e a proteção rigorosa da privacidade dos nossos clientes nacionais e internacionais.
            </p>

            <p>
              Seja na aquisição de uma quinta histórica em Sintra, de um apartamento reabilitado com tetos trabalhados no Chiado ou de uma moradia bioclimática na Comporta, garantimos um acompanhamento transparente desde o diagnóstico inicial até à escritura pública.
            </p>
          </motion.div>
        </div>
      </section>
    </article>
  );
};

