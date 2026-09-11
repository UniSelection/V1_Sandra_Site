import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'aquisição',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'aquisição',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#faf8f5] rounded-none border border-stone-200 shadow-2xl p-8 sm:p-12 overflow-y-auto max-h-[90vh] z-10"
          >
            {/* Close Button */}
            <button
              id="close-contact-modal"
              onClick={onClose}
              className="absolute top-6 right-6 text-stone-500 hover:text-stone-950 p-2 cursor-pointer transition-colors"
              aria-label="Fechar"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-[#b87d1d] mb-6 stroke-[1.5]" />
                <h3 className="font-sans text-2xl sm:text-3xl text-stone-900 mb-3 font-semibold uppercase tracking-[0.16em]">
                  MENSAGEM ENVIADA
                </h3>
                <p className="text-stone-600 font-sans text-sm max-w-md leading-relaxed mb-8">
                  Agradecemos o seu contacto. Sandra Carlos e a equipa de consultoria entrarão em contacto consigo com o máximo de discrição e brevidade.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#321f12] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  CONCLUIR
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#b87d1d] font-semibold block mb-2 font-sans">
                    CONSULTORIA PRIVADA
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl text-stone-900 font-semibold uppercase tracking-[0.16em]">
                    CONTACTAR O NOSSO STUDIO
                  </h2>
                  <p className="text-stone-600 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
                    Estamos disponíveis para consultas sobre arquitetura de interiores, aquisição de imóveis de autor e gestão patrimonial.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex.: Carolina Mendonça"
                        className="w-full bg-white/70 border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Endereço de E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@dominio.pt"
                        className="w-full bg-white/70 border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Telefone / Telemóvel
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+351 912 345 678"
                        className="w-full bg-white/70 border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                        Âmbito de Interesse
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-white/70 border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-800 transition-colors"
                      >
                        <option value="aquisição">Aquisição de Propriedade</option>
                        <option value="venda">Venda & Mediação Exclusiva</option>
                        <option value="arquitetura">Arquitetura de Interiores</option>
                        <option value="consultoria">Consultoria Sustentável</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                      A sua Mensagem *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Partilhe os detalhes do seu projeto ou os critérios do imóvel procurado..."
                      className="w-full bg-white/70 border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-stone-500 font-light">
                      <a
                        href="https://wa.me/351965881547"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#b87d1d] hover:underline underline-offset-2 transition-colors"
                        title="Contactar via WhatsApp (+351 965881547)"
                        aria-label="Contactar via WhatsApp (+351 965881547)"
                      >
                        +351 965881547
                      </a>{' '}
                      &bull;{' '}
                      <a
                        href="mailto:sandra.carlos@expertimo.eu"
                        className="hover:text-[#b87d1d] hover:underline underline-offset-2 transition-colors"
                      >
                        sandra.carlos@expertimo.eu
                      </a>{' '}
                      &bull; AMI 15766
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#36210f] hover:bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                    >
                      {loading ? 'A Enviar...' : 'Enviar Pedido'}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
