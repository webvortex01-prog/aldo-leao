import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'symbol' | 'horizontal';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const { siteConfig } = useSite();
  const logoTitle = siteConfig?.navbar?.logoTitle || 'Aldo Leão';
  const logoSubtitle = siteConfig?.navbar?.logoSubtitle || 'Advocacia Estratégica';

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { 
          shield: 28, 
          imgHeight: 'h-7 sm:h-8', 
          title: 'text-sm sm:text-base', 
          sub: 'text-[8px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.2em]' 
        };
      case 'lg':
        return { 
          shield: 56, 
          imgHeight: 'h-12 sm:h-16', 
          title: 'text-xl sm:text-2xl', 
          sub: 'text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.24em]' 
        };
      case 'md':
      default:
        return { 
          shield: 38, 
          imgHeight: 'h-8 sm:h-11', 
          title: 'text-sm sm:text-lg md:text-xl', 
          sub: 'text-[8px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.24em]' 
        };
    }
  };

  const { shield, imgHeight, title, sub } = getDimensions();
  const logoImageSrc = siteConfig?.navbar?.logoImageUrl || '/img/logo-symbol.png';

  // Official Lion Emblem (from Dr. Aldo Leão logo without background) or SVG Fallback
  const ShieldEmblem = (
    <div className="relative shrink-0 flex items-center justify-center">
      {!imgFailed ? (
        <img
          src={logoImageSrc}
          alt="Aldo Leão Advocacia Estratégica"
          className={`${imgHeight} w-auto max-h-full object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)] transition-transform duration-300 group-hover:scale-105`}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            if (!el.src.includes('logo.png')) {
              el.src = '/img/logo.png';
            } else {
              setImgFailed(true);
            }
          }}
        />
      ) : (
        <svg
          width={shield}
          height={Math.round(shield * 1.15)}
          viewBox="0 0 60 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_10px_rgba(212,175,55,0.35)] shrink-0"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="40%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
            <linearGradient id="shieldDarkBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E1B33" />
              <stop offset="100%" stopColor="#050B14" />
            </linearGradient>
          </defs>

          {/* Outer Shield Outline */}
          <path
            d="M30 3L53 11.5C53 38 43 57.5 30 67C17 57.5 7 38 7 11.5L30 3Z"
            fill="url(#shieldDarkBg)"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
          />

          {/* Inner Shield Hairline */}
          <path
            d="M30 7.5L49 14.5C49 37 40 53.5 30 61.5C20 53.5 11 37 11 14.5L30 7.5Z"
            stroke="url(#goldGradient)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Laurel Wreath Left */}
          <path
            d="M16 28C14 34 16 42 22 48M14 35C12 37 12 40 15 42M16 28C14 26 13 29 15 32"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          {/* Laurel Wreath Right */}
          <path
            d="M44 28C46 34 44 42 38 48M46 35C48 37 48 40 45 42M44 28C46 26 47 29 45 32"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Scales Balance Beam at Top */}
          <path
            d="M24 19H36M30 16V22M24 19L22 25M36 19L38 25"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />

          {/* Intertwined Monogram A & L */}
          <path
            d="M25 46L30 25L35 46M26.5 40H33.5"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 29V47H39.5"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crown/Star Accent at Top */}
          <polygon
            points="30,8 31.5,11 34.5,11.5 32,13.5 32.8,16.5 30,14.8 27.2,16.5 28,13.5 25.5,11.5 28.5,11"
            fill="url(#goldGradient)"
          />
        </svg>
      )}
    </div>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex shrink-0 ${className}`}>{ShieldEmblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 group min-w-0 max-w-full ${className}`}>
      {ShieldEmblem}
      <div className="flex flex-col text-left min-w-0 overflow-hidden">
        <span
          className={`font-cinzel font-bold tracking-[0.06em] sm:tracking-[0.08em] gold-text-gradient leading-tight truncate ${title}`}
        >
          {logoTitle}
        </span>
        <span
          className={`font-cinzel font-semibold text-[#D4AF37]/80 uppercase leading-none mt-0.5 sm:mt-1 truncate ${sub}`}
        >
          {logoSubtitle}
        </span>
      </div>
    </div>
  );
};
