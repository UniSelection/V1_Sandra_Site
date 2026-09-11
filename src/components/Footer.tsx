import React from 'react';
import { Instagram } from 'lucide-react';

interface FooterProps {
  onOpenCookies: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCookies }) => {
  return (
    <footer
      id="contatos"
      className="bg-[#d8be9e] text-stone-900 border-t border-[#d8be9e] scroll-mt-16 sm:scroll-mt-20 select-none transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-6 sm:pt-8 md:pt-10 pb-40 sm:pb-52 md:pb-64 flex flex-col justify-start min-h-[380px] sm:min-h-[460px]">
        {/* Top Row: Brand Name & Instagram Link right at the start of the background */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.24em] text-[#36210f] font-bold">
            SANDRA CARLOS CONSULTORIA IMOBILIÁRIA
          </span>

          <a
            id="footer-instagram-link"
            href="https://instagram.com/sandracarlosimobiliaria"
            target="_blank"
            rel="noopener noreferrer"
            title="@sandracarlosimobiliaria"
            aria-label="Instagram @sandracarlosimobiliaria"
            className="text-[#36210f] hover:text-black transition-colors p-1 cursor-pointer"
          >
            <Instagram size={20} strokeWidth={1.5} />
          </a>
        </div>

        {/* Second Row: Contact Info & Rights / Cookie Settings */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs text-stone-800 font-sans tracking-wide">
          {/* Left Column: Direct Phone, Email & AMI License */}
          <div className="flex flex-col space-y-1.5">
            <a
              href="https://wa.me/351965881547"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors hover:underline underline-offset-4 font-semibold text-[#36210f]"
              title="Contactar via WhatsApp (+351 965881547)"
              aria-label="Contactar via WhatsApp (+351 965881547)"
            >
              +351 965881547
            </a>
            <a
              href="mailto:sandra.carlos@expertimo.eu"
              className="hover:text-black transition-colors hover:underline underline-offset-4 font-semibold text-[#36210f]"
            >
              sandra.carlos@expertimo.eu
            </a>
            <span className="text-[11px] text-stone-700 tracking-widest pt-1 font-medium">
              AMI 15766
            </span>
          </div>

          {/* Right Column: Cookie Settings & Copyright */}
          <div className="flex flex-col sm:items-end space-y-1.5 text-left sm:text-right">
            <button
              id="cookie-settings-button"
              onClick={onOpenCookies}
              className="hover:text-black transition-colors hover:underline underline-offset-4 cursor-pointer focus:outline-none text-left sm:text-right text-stone-800 font-medium"
            >
              Cookie settings
            </button>
            <p className="text-stone-700 font-medium">
              ⓒ 2026 Sandra Carlos Consultoria Imobiliária. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

