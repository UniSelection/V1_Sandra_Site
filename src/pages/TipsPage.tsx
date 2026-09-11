import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TipArticle, PageType } from '../types';
import { TIPS_ARTICLES } from '../data/tipsData';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface TipsPageProps {
  onSelectArticle: (article: TipArticle) => void;
  onScrollToContact: () => void;
  onNavigate: (page: PageType) => void;
}

export const TipsPage: React.FC<TipsPageProps> = ({
  onSelectArticle,
  onScrollToContact,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [sortOrder, setSortOrder] = useState<'recent' | 'popular'>('recent');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['TODAS', 'COMPRAR', 'VENDER', 'FINANCIAMENTO', 'MERCADO'];

  const featuredArticle = TIPS_ARTICLES.find((a) => a.featured) || TIPS_ARTICLES[0];
  const otherArticles = TIPS_ARTICLES.filter((a) => a.id !== featuredArticle.id);

  const filteredArticles = useMemo(() => {
    let list = otherArticles;
    if (selectedCategory !== 'TODAS') {
      list = list.filter((item) =>
        item.categories.some((c) => c.toUpperCase() === selectedCategory.toUpperCase())
      );
    }
    return list;
  }, [selectedCategory, otherArticles]);

  return (
    <article id="tips-page" className="w-full bg-[#faf8f5] text-stone-900 pb-24 sm:pb-32 select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-[58px] sm:pt-[70px] md:pt-[76px]">
        {/* ========================================================================= */}
        {/* 1. TOP FEATURED HERO POST (Aesthetic identical to image.png header block) */}
        {/* ========================================================================= */}
        <section
          aria-label="Artigo em Destaque"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center cursor-pointer group"
          onClick={() => onSelectArticle(featuredArticle)}
        >
          {/* Left Column: Meta, Giant Title, Excerpt */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Meta Line with Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-stone-700 tracking-wider mb-4 sm:mb-5 font-sans">
              <span className="font-semibold text-stone-800">{featuredArticle.date}</span>
              <span className="text-stone-400">/</span>
              <span className="font-medium text-stone-700">BY {featuredArticle.author}</span>
              <span className="text-stone-400">/</span>
              <div className="flex items-center gap-1.5">
                {featuredArticle.categories.map((cat) => (
                  <span
                    key={cat}
                    className="border border-stone-800 text-stone-900 text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-medium tracking-widest uppercase transition-colors group-hover:border-[#36210f]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Giant Editorial Title (matching bold uppercase visual in image.png) */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-stone-950 uppercase leading-[1.08] mb-5 sm:mb-6 group-hover:text-[#9d5906] transition-colors">
              {featuredArticle.title}
            </h1>

            {/* Editorial Excerpt */}
            <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl font-normal mb-6">
              {featuredArticle.excerpt}
            </p>

            {/* Read action indicator */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#36210f] font-semibold group-hover:text-[#9d5906] transition-colors">
              <span>Ler artigo completo</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Right Column: Hero Portrait / Architectural Image */}
          <div className="md:col-span-5 flex justify-end">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-200 shadow-sm border border-stone-200/80">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Horizontal Divider Line */}
        <hr className="border-t border-stone-300/80 my-12 sm:my-16" />

        {/* ========================================================================= */}
        {/* 2. SUBHEADER: LATEST POSTS & CATEGORY FILTERS (Aesthetic of image.png)    */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          {/* Left: Section Title & Pill Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950 inline-block" />
              <h2 className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.25em] text-stone-950 font-bold">
                ÚLTIMAS DICAS
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 mr-1 hidden lg:inline">
                FILTRAR POR:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] sm:text-[11px] px-3 py-1 rounded-full font-medium tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-950 text-white border border-stone-950'
                        : 'bg-transparent text-stone-800 border border-stone-400 hover:border-stone-900 hover:text-stone-950'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Sort or View All */}
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-stone-600">
            <div className="relative inline-flex items-center gap-1 text-stone-800 font-medium">
              <span>ORDENAR: RECENTES</span>
              <ChevronDown size={13} />
            </div>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500 font-sans">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'ARTIGO' : 'ARTIGOS'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. ASYMMETRICAL EDITORIAL GRID (Inspired by image.png layout)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Card 1: Dominant Left Column (takes 7 columns in desktop, like pink books card) */}
          {filteredArticles[0] && (
            <div
              className="md:col-span-7 flex flex-col cursor-pointer group"
              onClick={() => onSelectArticle(filteredArticles[0])}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-200 border border-stone-200/80 mb-4">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-600 tracking-wider mb-2 font-sans">
                <span>{filteredArticles[0].date}</span>
                <span>/</span>
                <span className="border border-stone-800 text-stone-900 text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                  {filteredArticles[0].categories[0]}
                </span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                {filteredArticles[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                {filteredArticles[0].excerpt}
              </p>
            </div>
          )}

          {/* Right Stack: Card 2 & Card 3 (takes 5 columns in desktop) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-8">
            {filteredArticles[1] && (
              <div
                className="flex flex-col cursor-pointer group"
                onClick={() => onSelectArticle(filteredArticles[1])}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 border border-stone-200/80 mb-3">
                  <img
                    src={filteredArticles[1].image}
                    alt={filteredArticles[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-600 tracking-wider mb-1.5 font-sans">
                  <span>{filteredArticles[1].date}</span>
                  <span>/</span>
                  <span className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                    {filteredArticles[1].categories[0]}
                  </span>
                </div>
                <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                  {filteredArticles[1].title}
                </h3>
              </div>
            )}

            {filteredArticles[2] && (
              <div
                className="flex flex-col cursor-pointer group"
                onClick={() => onSelectArticle(filteredArticles[2])}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 border border-stone-200/80 mb-3">
                  <img
                    src={filteredArticles[2].image}
                    alt={filteredArticles[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-600 tracking-wider mb-1.5 font-sans">
                  <span>{filteredArticles[2].date}</span>
                  <span>/</span>
                  <span className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                    {filteredArticles[2].categories[0]}
                  </span>
                </div>
                <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                  {filteredArticles[2].title}
                </h3>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM ROW CARDS (Tri-column matching lower part of image.png)         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 mt-12 sm:mt-16 pt-10 border-t border-stone-200/70">
          {filteredArticles[3] && (
            <div
              className="flex flex-col cursor-pointer group"
              onClick={() => onSelectArticle(filteredArticles[3])}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 border border-stone-200/80 mb-3">
                <img
                  src={filteredArticles[3].image}
                  alt={filteredArticles[3].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-600 tracking-wider mb-1.5 font-sans">
                <span>{filteredArticles[3].date}</span>
                <span>/</span>
                <span className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                  {filteredArticles[3].categories[0]}
                </span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                {filteredArticles[3].title}
              </h3>
            </div>
          )}

          {filteredArticles[4] && (
            <div
              className="flex flex-col cursor-pointer group"
              onClick={() => onSelectArticle(filteredArticles[4])}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 border border-stone-200/80 mb-3">
                <img
                  src={filteredArticles[4].image}
                  alt={filteredArticles[4].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-600 tracking-wider mb-1.5 font-sans">
                <span>{filteredArticles[4].date}</span>
                <span>/</span>
                <span className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                  {filteredArticles[4].categories[0]}
                </span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                {filteredArticles[4].title}
              </h3>
            </div>
          )}

          {filteredArticles[5] && (
            <div
              className="flex flex-col cursor-pointer group"
              onClick={() => onSelectArticle(filteredArticles[5])}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 border border-stone-200/80 mb-3">
                <img
                  src={filteredArticles[5].image}
                  alt={filteredArticles[5].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-600 tracking-wider mb-1.5 font-sans">
                <span>{filteredArticles[5].date}</span>
                <span>/</span>
                <span className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                  {filteredArticles[5].categories[0]}
                </span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold tracking-tight text-stone-950 uppercase leading-snug group-hover:text-[#9d5906] transition-colors">
                {filteredArticles[5].title}
              </h3>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. EDITORIAL BOTTOM BANNER: CONSULTORIA COM SANDRA CARLOS                */}
        {/* ========================================================================= */}
        <div className="mt-20 p-8 sm:p-12 bg-[#efe7dc] border border-[#d8be9e] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#9d5906] font-bold block mb-2">
              CURADORIA PATRIMONIAL & CONSULTORIA
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-light text-[#36210f] uppercase leading-tight">
              PRECISA DE UMA ESTRATÉGIA À MEDIDA PARA O SEU IMÓVEL?
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed">
              Descubra o valor real de mercado da sua casa ou aceda a propriedades off-market com a consultora Sandra Carlos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onScrollToContact}
              className="bg-[#36210f] hover:bg-[#9d5906] text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Falar com a Sandra
            </button>
            <button
              onClick={() => onNavigate('casas')}
              className="border border-[#36210f] text-[#36210f] hover:bg-[#36210f] hover:text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
            >
              Ver Casas
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
