import React, { useState } from 'react';
import { X, MapPin, Maximize2, Calendar, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onInquire: (propertyTitle: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onInquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const allImages = [property.image, ...(property.secondaryImages || [])];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#faf8f5] border border-stone-200/80 shadow-2xl max-h-[92vh] overflow-y-auto z-10 flex flex-col"
        >
          {/* Close button */}
          <button
            id="close-property-modal"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 bg-white/80 hover:bg-white text-stone-900 p-2.5 backdrop-blur-sm transition-colors cursor-pointer border border-stone-200"
            aria-label="Fechar detalhe da propriedade"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Gallery Column */}
            <div className="lg:col-span-7 bg-stone-900 flex flex-col justify-between">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={allImages[activeImageIndex]}
                  alt={`Sandra Carlos Consultoria - ${property.title} em ${property.location} - Fotografia arquitetónica ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  width="1200"
                  height="800"
                />
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 p-4 bg-stone-950/90 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 shrink-0 overflow-hidden cursor-pointer border transition-all ${
                        activeImageIndex === idx
                          ? 'border-white opacity-100 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Sandra Carlos - Miniatura ${idx + 1} de ${property.title}`}
                        className="w-full h-full object-cover"
                        width="80"
                        height="56"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#faf8f5]">
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-xs tracking-wider uppercase mb-2">
                  <MapPin size={13} className="text-[#9c7a4b]" />
                  <span>{property.location}</span>
                </div>

                <h2 className="font-sans text-2xl sm:text-3xl text-stone-900 font-semibold uppercase tracking-[0.16em] mb-3">
                  {property.title}
                </h2>

                <p className="font-sans text-stone-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {property.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 border-y border-stone-200/80 py-4 mb-6">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-stone-500 block font-medium">ÁREA</span>
                    <span className="font-sans text-sm font-semibold text-stone-900">{property.area}</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-stone-500 block font-medium">TIPOLOGIA</span>
                    <span className="font-sans text-sm font-semibold text-stone-900">{property.typology}</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-stone-500 block font-medium">ANO</span>
                    <span className="font-sans text-sm font-semibold text-stone-900">{property.year}</span>
                  </div>
                </div>

                {/* Architectural Highlights */}
                <div className="mb-8">
                  <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-[#b87d1d] font-semibold mb-3">
                    PRINCÍPIOS ARQUITETÓNICOS
                  </h4>
                  <ul className="space-y-2">
                    {property.architecturalHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans leading-relaxed">
                        <Check size={14} className="text-[#b87d1d] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-200/60">
                <button
                  id="inquire-property-button"
                  onClick={() => {
                    onClose();
                    onInquire(property.title);
                  }}
                  className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#36210f] hover:bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                >
                  <span>Solicitar Dossiê Privado</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
