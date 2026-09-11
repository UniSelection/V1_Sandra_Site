import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data/properties';
import { Property, PageType } from '../types';
import { Eye, MapPin, ChevronDown, Check } from 'lucide-react';

interface HousesPageProps {
  onSelectProperty: (property: Property) => void;
  onOpenContact?: () => void;
  onNavigate?: (page: PageType) => void;
}

export const HousesPage: React.FC<HousesPageProps> = ({ onSelectProperty }) => {
  const [showExtendedText, setShowExtendedText] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fechar o menu vertical LOCAL ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationMenuRef.current && !locationMenuRef.current.contains(event.target as Node)) {
        setIsLocationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ajustado automaticamente consoante os sítios das casas no site
  const availableLocations = useMemo(() => {
    const map = new Map<string, { count: number; displayName: string }>();
    properties.forEach((p) => {
      const loc = p.location.trim();
      const existing = map.get(loc);
      if (existing) {
        existing.count += 1;
      } else {
        // Exibição amigável da localização
        const displayName = loc.replace(', Portugal', '');
        map.set(loc, { count: 1, displayName });
      }
    });
    return Array.from(map.entries()).map(([raw, data]) => ({
      raw,
      displayName: data.displayName,
      count: data.count,
    }));
  }, []);

  const isAllSelected = selectedLocations.length === 0;

  // Quando está selecionado "todos", mudar exclusivamente para a escolhida;
  // depois, permite alternar/adicionar mais que uma ao mesmo tempo.
  const handleToggleLocation = (locRaw: string) => {
    if (isAllSelected) {
      setSelectedLocations([locRaw]);
    } else {
      if (selectedLocations.includes(locRaw)) {
        const next = selectedLocations.filter((item) => item !== locRaw);
        setSelectedLocations(next);
      } else {
        setSelectedLocations([...selectedLocations, locRaw]);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectedLocations([]);
  };

  // Filtragem de casas de acordo com as localizações selecionadas
  const filteredProperties = useMemo(() => {
    if (selectedLocations.length === 0) return properties;
    return properties.filter((p) => selectedLocations.includes(p.location.trim()));
  }, [selectedLocations]);

  // Rótulo dinâmico do botão LOCAL
  const locationButtonLabel = useMemo(() => {
    if (isAllSelected) return 'LOCAL';
    if (selectedLocations.length === 1) {
      const item = availableLocations.find((l) => l.raw === selectedLocations[0]);
      return `LOCAL: ${item ? item.displayName : '1'}`;
    }
    if (selectedLocations.length === 2) {
      const names = selectedLocations
        .map((raw) => availableLocations.find((l) => l.raw === raw)?.displayName)
        .filter(Boolean);
      return `LOCAL: ${names.join(', ')}`;
    }
    return `LOCAL: ${selectedLocations.length} SELECIONADOS`;
  }, [isAllSelected, selectedLocations, availableLocations]);

  return (
    <article id="casas-page" className="w-full bg-[#faf8f5] text-stone-900 pb-28 sm:pb-36">
      {/* 1. HERO BANNER */}
      <section className="w-full relative" aria-label="Imagem de Destaque">
        <div className="w-full h-[45vh] sm:h-[55vh] lg:h-[65vh] max-h-[720px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=85"
            alt="Sandra Carlos Consultoria - Arquitetura de interiores e habitação contemporânea de autor"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width="2200"
            height="1400"
          />
          <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
        </div>
      </section>

      {/* 2. EDITORIAL PRINCIPLES SECTION */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-12 sm:pb-16" aria-label="Princípios de Curadoria">
        {/* Unique H1 for Casas Page */}
        <div className="mb-8 border-b border-stone-200/70 pb-6">
          <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#b87d1d] font-semibold block mb-2">
            CURADORIA IMOBILIÁRIA
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.12em] text-stone-900 uppercase">
            CASAS & PROPRIEDADES DE AUTOR &bull; PORTFÓLIO SELECIONADO
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="font-sans text-stone-800 text-sm sm:text-base md:text-[17px] leading-[1.75] font-light">
            Funcionalidade, pureza geométrica e valorização perene da luz natural. Estes são os três pilares que definem cada imóvel no portfólio de Sandra Carlos. Selecionamos exclusivamente residências singulares que conciliam arquitetura de autor, autenticidade material e respeito pela paisagem em Lisboa, Sintra e Comporta.
          </p>

          <div className="mt-4">
            <button
              id="casas-read-more"
              onClick={() => setShowExtendedText(!showExtendedText)}
              className="font-sans text-stone-900 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] border-b-2 border-stone-900 pb-0.5 cursor-pointer hover:text-[#b87d1d] hover:border-[#b87d1d] transition-colors"
            >
              {showExtendedText ? 'RECOLHER TEXTO' : 'LER MANIFESTO'}
            </button>
          </div>

          <AnimatePresence>
            {showExtendedText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-6 space-y-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed border-l-2 border-[#9c7a4b]/40 pl-5"
              >
                <p>
                  No âmbito imobiliário, selecionamos e curamos exclusivamente propriedades que refletem esta simbiose de artesanato intemporal, orientação solar irrepreensível e harmonia com a paisagem envolvente.
                </p>
                <p>
                  Cada casa no nosso portfólio é um estudo de volume, ventilação cruzada e materialidade nobre, garantindo que o investimento perpetua valor patrimonial e qualidade de vida inquestionável.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Header Controls: Portfolio Counter + Fotografia Label + Dynamic LOCAL Menu */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-12 pt-6 border-t border-stone-200/60 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
              PORTFÓLIO SELECIONADO
            </span>
            {!isAllSelected && (
              <button
                onClick={handleSelectAll}
                className="text-[11px] uppercase tracking-wider text-[#b87d1d] hover:underline font-medium cursor-pointer ml-1"
                title="Mostrar todas as casas"
              >
                (Mostrar Todas)
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs self-start sm:self-auto">
            {/* Menu vertical LOCAL: com suporte a seleção múltipla */}
            <div className="relative" ref={locationMenuRef}>
              <button
                id="menu-local-button"
                onClick={() => setIsLocationMenuOpen((prev) => !prev)}
                aria-expanded={isLocationMenuOpen}
                aria-haspopup="listbox"
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                  isLocationMenuOpen || !isAllSelected
                    ? 'bg-[#36210f] text-white border-[#36210f]'
                    : 'bg-stone-100/90 text-stone-700 border-stone-200/80 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                <MapPin size={12} className={!isAllSelected ? 'text-[#d4a86a]' : 'text-stone-500'} />
                <span className="font-medium">{locationButtonLabel}</span>
                {!isAllSelected && selectedLocations.length > 1 && (
                  <span className="bg-[#b87d1d] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                    {selectedLocations.length}
                  </span>
                )}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${isLocationMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Menu suspenso vertical com seleção múltipla */}
              <AnimatePresence>
                {isLocationMenuOpen && (
                  <motion.div
                    id="menu-local-dropdown"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    role="listbox"
                    aria-multiselectable="true"
                    className="absolute right-0 top-full mt-1.5 w-60 sm:w-68 bg-[#faf8f5] border border-stone-300/90 shadow-2xl z-30 py-2 rounded-none"
                  >
                    <div className="px-3 pb-2 border-b border-stone-200/70 mb-1 flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-[0.2em]">
                      <span>Filtrar por Local</span>
                      {!isAllSelected && (
                        <button
                          onClick={handleSelectAll}
                          className="text-[#b87d1d] hover:underline cursor-pointer font-semibold"
                        >
                          Limpar
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col max-h-72 overflow-y-auto divide-y divide-stone-100">
                      {/* Opção para ver todas as localizações */}
                      <button
                        onClick={handleSelectAll}
                        role="option"
                        aria-selected={isAllSelected}
                        className={`w-full text-left px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors flex items-center justify-between cursor-pointer ${
                          isAllSelected
                            ? 'bg-[#36210f] text-white font-medium'
                            : 'text-stone-700 hover:bg-stone-200/60 hover:text-stone-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              isAllSelected
                                ? 'border-white bg-white/20 text-white'
                                : 'border-stone-400 bg-white'
                            }`}
                          >
                            {isAllSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                          <span>TODOS OS LOCAIS</span>
                        </div>
                        <span className={`text-[10px] ${isAllSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                          ({properties.length})
                        </span>
                      </button>

                      {/* Itens dinâmicos das casas presentes no site */}
                      {availableLocations.map((loc) => {
                        const isSelected = selectedLocations.includes(loc.raw);
                        return (
                          <button
                            key={loc.raw}
                            onClick={() => handleToggleLocation(loc.raw)}
                            role="option"
                            aria-selected={isSelected}
                            className={`w-full text-left px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-stone-200/80 text-[#36210f] font-semibold'
                                : 'text-stone-700 hover:bg-stone-200/60 hover:text-[#b87d1d]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <div
                                className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-[#36210f] bg-[#36210f] text-white'
                                    : 'border-stone-400 bg-white'
                                }`}
                              >
                                {isSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                              <span className="truncate">{loc.displayName}</span>
                            </div>
                            <span className={`text-[10px] shrink-0 ${isSelected ? 'text-[#36210f] font-bold' : 'text-stone-400'}`}>
                              ({loc.count})
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Botão de fechar menu */}
                    <div className="mt-2 pt-2 px-3 border-t border-stone-200/70 flex justify-end">
                      <button
                        onClick={() => setIsLocationMenuOpen(false)}
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-600 hover:text-[#36210f] cursor-pointer py-1 px-2 hover:bg-stone-200/50 rounded"
                      >
                        FECHAR
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID OF PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" aria-label="Lista de Imóveis">
        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-stone-500 font-sans text-sm uppercase tracking-widest mb-4">
              Nenhuma propriedade encontrada para os locais selecionados.
            </p>
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-[#36210f] text-white text-xs uppercase tracking-widest hover:bg-[#b87d1d] transition-colors cursor-pointer"
            >
              Ver Todos os Locais
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectProperty(property)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Card Aspect Ratio ~ 3:4 com fotografia em destaque */}
                <div className="relative w-full aspect-[3/4.2] overflow-hidden bg-[#36210f] transition-transform duration-500 group-hover:-translate-y-1">
                  <img
                    src={property.image}
                    alt={`Sandra Carlos Consultoria - ${property.title}, ${property.typology} em ${property.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    loading="lazy"
                    width="600"
                    height="840"
                  />
                  <div className="absolute inset-0 bg-[#36210f]/15 group-hover:bg-[#36210f]/35 transition-colors duration-300" />

                  {/* Hover Details Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#d4a86a] font-medium mb-1">
                      {property.location}
                    </span>
                    <h2 className="font-sans text-xl sm:text-2xl font-medium uppercase tracking-[0.16em] text-white">
                      {property.title}
                    </h2>
                    <p className="font-sans text-xs text-stone-300 font-normal mt-1 uppercase tracking-wider">
                      {property.typology} &bull; {property.area}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#d4a86a] uppercase tracking-[0.2em] font-medium font-sans">
                      <Eye size={14} />
                      VER DOSSIÊ ARQUITETÓNICO
                    </span>
                  </div>
                </div>

                {/* Caption below card */}
                <div className="mt-4 flex items-baseline justify-between text-xs text-stone-700">
                  <span className="font-sans font-semibold text-stone-900 uppercase tracking-wider group-hover:text-[#b87d1d] transition-colors">
                    {property.title}
                  </span>
                  <span className="font-sans text-stone-500 font-normal uppercase tracking-wider text-[11px]">
                    {property.location.split(',')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
};

