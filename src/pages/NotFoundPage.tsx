import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import { ArrowLeft, Home, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageType) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      id="not-found-page"
      className="min-h-[75vh] w-full bg-[#faf8f5] text-stone-900 flex items-center justify-center px-6 sm:px-12 py-28 sm:py-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto text-center flex flex-col items-center"
      >
        <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#b87d1d] font-semibold mb-4">
          ERRO DE NAVEGAÇÃO
        </span>

        {/* Unique H1 for 404 page */}
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.14em] text-stone-900 mb-6">
          404 &bull; PÁGINA NÃO ENCONTRADA
        </h1>

        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed mb-10 max-w-md font-light">
          A página ou endereço que procura não foi encontrada ou foi reorganizada. Convidamo-lo a regressar ao portfólio de propriedades ou à página principal do estúdio.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#321f12] text-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-900 transition-colors cursor-pointer"
          >
            <Home size={14} />
            PÁGINA INICIAL
          </button>

          <button
            onClick={() => {
              onNavigate('casas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-800 text-stone-900 px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Compass size={14} />
            VER PORTFÓLIO
          </button>
        </div>
      </motion.div>
    </div>
  );
};
