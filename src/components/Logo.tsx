import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'original';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official Logo for Sandra Carlos Consultoria Imobiliária
 * Matches the uploaded brand mark without altering composition:
 * - Line 1: "SANDRA CARLOS" in Roman Serif Capitals (#36210f or white on dark)
 * - Line 2: "CONSULTORIA   IMOBILIÁRIA" in golden amber sans-serif (#b87d1d) with wide tracking
 * Supports direct PNG rendering if placed in public/, with instant vector SVG fallback.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'original',
  size = 'md',
}) => {
  const [useVector, setUseVector] = useState(false);
  const isLight = variant === 'light';

  // Responsive image height for perfect symmetry in the header
  const imgHeightClass = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-8 sm:h-9 md:h-10 w-auto',
    lg: 'h-10 sm:h-11 md:h-12 w-auto',
  }[size];

  // Font sizing configurations for the vector representation
  const titleSizeClasses = {
    sm: 'text-base sm:text-lg tracking-[0.22em]',
    md: 'text-lg sm:text-xl md:text-[22px] tracking-[0.24em]',
    lg: 'text-xl sm:text-2xl md:text-3xl tracking-[0.26em]',
  }[size];

  const subSizeClasses = {
    sm: 'text-[6.5px] sm:text-[7.5px] tracking-[0.38em] mt-1',
    md: 'text-[7.5px] sm:text-[8.5px] md:text-[9.5px] tracking-[0.40em] mt-1 sm:mt-1.5',
    lg: 'text-[9.5px] sm:text-[10.5px] md:text-[12px] tracking-[0.44em] mt-1.5 sm:mt-2',
  }[size];

  const titleColor = isLight ? 'text-white' : 'text-[#36210f]';
  const subtitleColor = isLight ? 'text-[#e5b364]' : 'text-[#b87d1d]';

  // If the PNG file is uploaded to /public, render the real file directly
  if (!useVector && !isLight) {
    return (
      <img
        src="/SandraCarlos_transparente-removebg-preview.png"
        alt="Sandra Carlos Consultoria Imobiliária"
        className={`object-contain select-none transition-opacity duration-200 ${imgHeightClass} ${className}`}
        onError={() => setUseVector(true)}
      />
    );
  }

  // Exact 1:1 vector composition matching the uploaded logo without splitting or altering
  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      <span
        className={`font-serif uppercase font-medium leading-tight transition-colors duration-200 ${titleColor} ${titleSizeClasses}`}
        style={{
          fontFamily: "'Bodoni Moda', 'Cinzel', 'Cormorant Garamond', 'Didot', Georgia, serif",
        }}
      >
        SANDRA CARLOS
      </span>
      <span
        className={`font-sans uppercase font-semibold leading-none transition-colors duration-200 ${subtitleColor} ${subSizeClasses}`}
        style={{
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        CONSULTORIA&nbsp;&nbsp;&nbsp;IMOBILIÁRIA
      </span>
    </div>
  );
};
