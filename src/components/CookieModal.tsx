import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-[#faf8f5] border border-stone-200 p-8 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b87d1d] font-semibold block mb-2 font-sans">
              PRIVACIDADE & CONSENTIMENTO
            </span>
            <h3 className="font-sans text-xl sm:text-2xl text-stone-900 mb-2 font-semibold uppercase tracking-[0.16em]">
              DEFINIÇÕES DE COOKIES
            </h3>
            <p className="text-stone-600 font-sans text-xs leading-relaxed mb-6">
              Utilizamos cookies essenciais para garantir o funcionamento do nosso site e cookies analíticos para compreender como interage com as nossas páginas de arquitetura e consultoria.
            </p>

            <div className="space-y-4 border-y border-stone-200/80 py-5 my-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">Cookies Estritamente Necessários</h4>
                  <p className="text-xs text-stone-500 font-light">Indispensáveis para a navegação e segurança.</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Sempre Ativo</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">Cookies de Desempenho & Análise</h4>
                  <p className="text-xs text-stone-500 font-light">Métricas agregadas para melhorar a experiência do utilizador.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 accent-[#36210f] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">Cookies de Preferência & Conteúdo</h4>
                  <p className="text-xs text-stone-500 font-light">Memorização de filtros e projetos favoritos.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 accent-[#36210f] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
              >
                Rejeitar Opcionais
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#36210f] text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-900 cursor-pointer"
              >
                {saved ? <Check size={14} /> : null}
                {saved ? 'Guardado' : 'Guardar Preferências'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
