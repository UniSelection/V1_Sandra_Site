import React from 'react';
import { X, Calendar, Clock, User, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TipArticle } from '../types';

interface TipArticleModalProps {
  article: TipArticle | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const TipArticleModal: React.FC<TipArticleModalProps> = ({
  article,
  onClose,
  onOpenContact,
}) => {
  if (!article) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá Sandra! Li o artigo "${article.title}" no seu site e gostaria de pedir aconselhamento imobiliário.`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#faf8f5] border border-stone-300 shadow-2xl max-h-[92vh] overflow-y-auto z-10 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tip-modal-title"
        >
          {/* Close button */}
          <button
            id="close-tip-modal-btn"
            onClick={onClose}
            className="sticky top-4 right-4 self-end z-30 mr-4 mt-4 bg-white/90 hover:bg-white text-stone-900 p-2.5 backdrop-blur-sm transition-colors cursor-pointer border border-stone-300 shadow-sm rounded-full"
            aria-label="Fechar artigo"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <article className="px-6 sm:px-12 md:px-16 pt-2 pb-16">
            {/* Header Meta */}
            <div className="flex flex-wrap items-center gap-3 text-stone-600 text-[11px] uppercase tracking-wider mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#b87d1d]" />
                {article.date}
              </span>
              <span>/</span>
              <span className="flex items-center gap-1">
                <User size={13} className="text-[#b87d1d]" />
                POR {article.author}
              </span>
              <span>/</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[#b87d1d]" />
                {article.readTime} LEITURA
              </span>
              <div className="flex items-center gap-1.5 ml-auto">
                {article.categories.map((cat) => (
                  <span
                    key={cat}
                    className="border border-stone-800 text-stone-900 text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1
              id="tip-modal-title"
              className="font-sans text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-stone-900 uppercase leading-[1.2] mb-6"
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed mb-8 border-l-2 border-[#b87d1d] pl-4 font-light">
              {article.excerpt}
            </p>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-stone-200 mb-10 shadow-sm">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-6 text-stone-800 font-sans text-base leading-[1.8] font-normal">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-stone-800">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Practical Checklist / Key Highlights if available */}
            {article.checklist && article.checklist.length > 0 && (
              <div className="mt-10 p-6 sm:p-8 bg-stone-100/80 border border-stone-300">
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#b87d1d] font-bold mb-4">
                  CHECKLIST & PONTOS-CHAVE &bull; RECOMENDAÇÃO SANDRA CARLOS
                </h3>
                <ul className="space-y-3">
                  {article.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-800">
                      <CheckCircle2 size={16} className="text-[#36210f] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Call to Action Box */}
            <div className="mt-12 pt-8 border-t border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white p-6 border shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#b87d1d] font-bold block mb-1">
                  CONSULTORIA PERSONALIZADA
                </span>
                <h4 className="font-sans text-base font-semibold text-stone-900">
                  Quer comprar ou vender o seu imóvel com total segurança?
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-md">
                  A Sandra Carlos presta acompanhamento técnico e comercial exclusivo em todas as etapas da sua operação patrimonial.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/351965881547?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#36210f] hover:bg-[#b87d1d] text-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 border border-stone-800 hover:bg-stone-900 hover:text-white text-stone-900 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  <span>Mensagem</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
