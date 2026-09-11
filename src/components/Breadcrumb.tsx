import React from 'react';
import { PageType } from '../types';

interface BreadcrumbItem {
  name: string;
  page?: PageType;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (page: PageType) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav
      aria-label="Caminho de navegação"
      className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4 text-[11px] uppercase tracking-[0.2em] font-sans text-stone-500"
    >
      <ol
        className="flex items-center flex-wrap gap-2"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-stone-900 transition-colors cursor-pointer text-stone-500"
            itemProp="item"
          >
            <span itemProp="name">Início</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.name}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              <span className="mx-2 text-stone-400 font-light select-none">/</span>
              {isLast || !item.page ? (
                <span
                  itemProp="name"
                  className="text-stone-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.page) {
                      onNavigate(item.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-stone-900 transition-colors cursor-pointer text-stone-500"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </button>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
